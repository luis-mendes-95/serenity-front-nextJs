'use client'

import api from "../../services/api"
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "@/src/contexts/authContext";


export interface RegisterUser {
    name: string;
    email: string;
    password: string;
}

export const RegisterUserSchema = z.object({
    name: z.string().nonempty("Nome é obrigatório"),
    email: z.string().email("Deve ser um e-mail válido"),
    password: z.string().nonempty("Senha é obrigatória")
});

export default function RegisterForm() {

    const { register: registerUser } = useAuth()

    const { register, handleSubmit } = useForm<RegisterUser>({
        resolver: zodResolver(RegisterUserSchema)
    })

    const onFormSubmit = (formData: RegisterUser) => {
        registerUser(formData)
    }

  return (
        <>
            <h2>Inicie sua jornada</h2>
            
            <form onSubmit={handleSubmit(onFormSubmit)}>

                <div>
                    <label htmlFor="name">Nome:</label>
                    <div>
                        <input type="text" placeholder="Seu Nome" {...register("name")}/>
                    </div>
                </div>

                <div>
                    <label htmlFor="email">E-mail:</label>
                    <div>
                        <input type="text" placeholder="Seu E-mail" {...register("email")}/>
                    </div>
                </div>

                <div>
                    <label htmlFor="password">Crie uma senha:</label>
                    <div>
                        <input type="password" placeholder="Seja criativo" {...register("password")}/>
                    </div>
                </div>

                <div>
                    <label htmlFor="confirmPassword">Confirme sua senha:</label>
                    <div>
                        <input type="password" placeholder="Confirmar senha"/>
                    </div>
                </div>

                <div>
                    <button>Cadastrar</button>
                </div>

                <div>
                    <Link href={`/`}>
                    <button>Voltar ao início</button>
                    </Link>
                </div>

            </form>
        </>
  );
}
