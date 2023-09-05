'use client'

import api from "../../services/api"
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "@/src/contexts/authContext";


export interface LoginUser {
    email: string;
    password: string;
}

export const LoginUserSchema = z.object({
    email: z.string().email("Deve ser um e-mail válido"),
    password: z.string().nonempty("Senha é obrigatória")
});


export default function LoginForm() {

    const { login } = useAuth()

    const { register, handleSubmit } = useForm<LoginUser>({
        resolver: zodResolver(LoginUserSchema)
    })

    const onFormSubmit = (formData: LoginUser) => {
        login(formData);
    }



  return (
        <>
            <h2>Continue sua jornada</h2>

            <form onSubmit={handleSubmit(onFormSubmit)}>

                <div>
                    <label htmlFor="email">E-mail:</label>
                    <div>
                        <input type="text" placeholder="Seu E-mail" {...register("email")}/>
                    </div>
                </div>

                <div>
                    <label htmlFor="password">Senha:</label>
                    <div>
                        <input type="password" placeholder="Sua senha" {...register("password")}/>
                    </div>
                </div>

                <div>
                    <button>Entrar</button>
                </div>

                <div>
                    <Link href={`/signup`}>
                    <button>Ainda não é cadastrado?</button>
                    </Link>
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
