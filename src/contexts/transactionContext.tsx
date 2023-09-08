"use client";

import { useRouter } from "next/navigation";
import { parseCookies, setCookie } from "nookies";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { RegisterTransaction } from "../components/TransactionRegisterForm";
import api from "../services/api";
import { useAuth } from "./authContext";

interface Props {
  children: ReactNode;
}

export interface Transaction {
  description: string;
  category: string;
  amount: string;
  type: string;
  user_id: string;
  bowl_id: string;
  image: string;
}

interface transactionProviderData {
  registerTransaction: (registerData: RegisterTransaction) => void;
  editTransaction: (editData: RegisterTransaction) => void;
  deleteTransaction: (id: string) => void;
}

const TransactionContext = createContext<transactionProviderData>({} as transactionProviderData);

export const TransactionProvider = ({ children }: Props) => {
  const { getUser, user_id } = useAuth();

  const router = useRouter();

  const registerTransaction = (registerData: RegisterTransaction) => {
    api
      .post("/transactions", registerData)
      .then(() => {
        toast.success("Transação criada com sucesso!");
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Erro ao cadastrar transação");
      });
      getUser(user_id);
  };

  const editTransaction = (editData: RegisterTransaction) => {
    api
      .patch("/transactions", editData)
      .then(() => {
        toast.success("Transação editada com sucesso!");
        getUser(user_id);
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Erro ao editar transação");
      });

  };

  const deleteTransaction = (id: string) => {
    api
      .delete(`/transactions/${id}`)
      .then(() => {
        toast.success("Transação deletada com sucesso!");
        getUser(user_id);
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Erro ao deletar transação");
      });

  };

  return (
    <TransactionContext.Provider value={{ registerTransaction, editTransaction, deleteTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => useContext(TransactionContext);
