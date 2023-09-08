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
import { RegisterBowl } from "../components/BowlRegisterForm";
import api from "../services/api";
import { useAuth } from "./authContext";

interface Props {
  children: ReactNode;
}

export interface Bowl {
  id: string;
  name: string;
  amount: string;
  user_id: string;
  bowl_id: string;
}

interface bowlProviderData {
  registerBowl: (registerData: RegisterBowl) => void;
  editBowl: (editData: RegisterBowl) => void;
  deleteBowl: (id: string) => void;
}

const BowlContext = createContext<bowlProviderData>({} as bowlProviderData);

export const BowlProvider = ({ children }: Props) => {
  const { getUser, user_id } = useAuth();

  const router = useRouter();

  const registerBowl = (registerData: RegisterBowl) => {
    api
      .post("/bowls", registerData)
      .then(() => {
        toast.success("Pote criado com sucesso!");
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Erro ao cadastrar pote");
      });
      getUser(user_id);
  };

  const editBowl = (editData: RegisterBowl) => {
    api
      .patch("/bowls", editData)
      .then(() => {
        toast.success("Pote editado com sucesso!");
        getUser(user_id);
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Erro ao editar pote");
      });

  };

  const deleteBowl = (id: string) => {
    api
      .delete(`/bowls/${id}`)
      .then(() => {
        toast.success("Pote deletado com sucesso!");
        getUser(user_id);
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Erro ao deletar pote");
      });

  };

  return (
    <BowlContext.Provider value={{ registerBowl, editBowl, deleteBowl }}>
      {children}
    </BowlContext.Provider>
  );
};

export const useBowl = () => useContext(BowlContext);
