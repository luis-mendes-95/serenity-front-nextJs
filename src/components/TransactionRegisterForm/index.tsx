"use client";
import React from "react";
import api from "../../services/api";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "@/src/contexts/authContext";
import { useTransaction } from "@/src/contexts/transactionContext";

export interface RegisterTransaction {
  description: string;
  category: string;
  bowl_id: string;
  user_id: string;
  amount: string;
  type: string;
  image: string;
}

export const RegisterTransactionSchema = z.object({
  description: z.string().nonempty("Este campo é obrigatório"),
  category: z.string().nonempty("Nome é obrigatório"),
  bowl_id: z.string().nonempty("Este campo é obrigatório"),
  user_id: z.string().nonempty("Nome é obrigatório"),
  amount: z.string().nonempty("Nome é obrigatório"),
  type: z.string().nonempty("Nome é obrigatório"),
  image: z.string()
});

export default function RegisterTransactionForm() {

  const { registerTransaction } = useTransaction();
  const { user_data } = useAuth();

  const bowls = user_data?.Bowl;

  const { register, handleSubmit, formState: {errors} } = useForm<RegisterTransaction>({
    resolver: zodResolver(RegisterTransactionSchema),
  });

  const onFormSubmit = (formData: RegisterTransaction) => {
    formData.user_id = user_data?.id
    console.log(formData);
    registerTransaction(formData);
  };




  return (
    <>
      <h2>Cadastrar nova transação:</h2>

      <form onSubmit={handleSubmit(onFormSubmit)}>

        <div>
          <label htmlFor="description">Pote de origem:</label>
          <div>
            <select {...register("bowl_id")}>
              <option value="">...</option>
              {bowls?.map((bowl: any) => {
                return <option key={bowl.id} value={bowl.id}>{bowl.name}</option>;
              })}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="category">Descrição:</label>
          <div>
            <input type="text" placeholder="Descrição" {...register("description")} />
          </div>
        </div>

        <div>
          <label htmlFor="category">Categoria:</label>
          <div>
            <input type="text" placeholder="Categoria" {...register("category")} />
          </div>
        </div>

        <div>
          <label htmlFor="amount">Quantia:</label>
          <div>
            <input placeholder="Quantia" {...register("amount")} />
          </div>
        </div>

        <div>
          <label htmlFor="type">Tipo de transação:</label>
          <div>
            <select {...register("type")}>
              <option value="">...</option>
              <option value="">Despesa</option>
              <option value="">Receita</option>
            </select>
          </div>
        </div>

        <input style={{display: "none"}} {...register("user_id")}/>
        <input style={{display: "none"}} value=" " {...register("image")}/>

        <div>
          <button>Cadastrar</button>
        </div>
      </form>
    </>
  );
}
