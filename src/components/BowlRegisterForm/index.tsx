"use client";
import React from "react";
import api from "../../services/api";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "@/src/contexts/authContext";
import { useBowl } from "@/src/contexts/bowlContext";

export interface RegisterBowl {
  bowl_id: string;
  name: string;
  amount: string;
  user_id: string;
}

export const RegisterBowlSchema = z.object({
  bowl_id: z.string().nonempty("Este campo é obrigatório"),
  name: z.string().nonempty("Nome é obrigatório"),
  amount: z.string().nonempty("Este campo é obrigatório"),
  user_id: z.string()
});

export default function RegisterBowlForm() {
  const { registerBowl } = useBowl();
  const { user_data } = useAuth();

  const bowls = user_data?.Bowl;

  const { register, handleSubmit } = useForm<RegisterBowl>({
    resolver: zodResolver(RegisterBowlSchema),
  });

  const onFormSubmit = (formData: RegisterBowl) => {
    formData.user_id = user_data?.id
    console.log(formData);
    registerBowl(formData);
  };

  return (
    <>
      <h2>Cadastrar novo pote:</h2>

      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div>
          <label htmlFor="bowl_id">Pote pai:</label>
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
          <label htmlFor="name">Nome do pote:</label>
          <div>
            <input type="text" placeholder="Nome do pote" {...register("name")} />
          </div>
        </div>

        <div>
          <label htmlFor="amount">Valor inicial:</label>
          <div>
            <input placeholder="Quantia inicial" {...register("amount")} />
          </div>
        </div>

        <input style={{display: "none"}} {...register("user_id")}/>

        <div>
          <button type="submit">Cadastrar</button>
        </div>
      </form>
    </>
  );
}
