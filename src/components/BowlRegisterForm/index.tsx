'use client'

import api from "../../services/api"
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "@/src/contexts/authContext";


export interface RegisterBowl {
    name: string;
    amount: string;
    user_id: string;
    bowl_id: string;
}

export const RegisterBowlSchema = z.object({
    name: z.string().nonempty("Nome é obrigatório"),
    amount: z.string(),
    user_id: z.string(),
    bowl_id: z.string(),
});

export default function RegisterBowlForm() {

    const { registerBowl } = useBowl()

    const { register, handleSubmit } = useForm<RegisterBowl>({
        resolver: zodResolver(RegisterBowlSchema)
    })

    const onFormSubmit = (formData: RegisterBowl) => {
        registerBowl(formData)
    }

  return (
        <>
            <h2>Cadastrar um novo pote</h2>
            
            <form onSubmit={handleSubmit(onFormSubmit)}>

                <div>
                    <label htmlFor="name">Nome:</label>
                    <div>
                        <input type="text" placeholder="Seu Nome" {...register("name")}/>
                    </div>
                </div>

                <div>
                    <label htmlFor="amount">Amount</label>
                    <div>
                        <input type="text" placeholder="Valor inicial" {...register("amount")}/>
                    </div>
                </div>

                <div>
                    <button>Criar</button>
                </div>

                <div>
                    <Link href={`/`}>
                    <button>Voltar</button>
                    </Link>
                </div>

            </form>
        </>
  );
}
