'use client'

import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import { ReactNode, createContext, useContext } from "react";
import { toast } from "react-toastify";
import { RegisterUser } from "../components/RegisterForm";
import { LoginUser } from "../components/LoginForm";
import api from "../services/api";

interface Props {
    children: ReactNode;
}

interface authProviderData {
    register: (registerData: RegisterUser) => void;
    login: (loginData: LoginUser) => void;
}

const AuthContext = createContext<authProviderData>({} as authProviderData)

export const AuthProvider = ({children}: Props) => {
 
    const router = useRouter()


    const register = (registerData: RegisterUser) => {
        api.post("/users", registerData)
        .then(() => {
            toast.success("Usuário cadastrado com sucesso!")
            router.push("/login")
        })
        .catch((err) => {
            console.log(err)
            toast.error("Erro ao cadastrar usuário")
        })
    }

    const login = (loginData: LoginUser) => {
        api.post("/login", loginData)
        .then((response) => {
            console.log(response)
            setCookie(null, "serenity.app.token", response.data.token), {
                maxAge: 31536 * 1000,
                path: "/"
            };
            setCookie(null, "serenity.app.user_id", response.data.user_id), {
                maxAge: 31536 * 1000,
                path: "/"
            };
            toast.success("Login efetuado com sucesso!")
            router.push("/")
        })
        .catch((err) => {
            console.log(err)
            toast.error("Erro ao efetuar login")
        })
    };
    return(
        <AuthContext.Provider value={{ register, login }}>
            {children}
        </AuthContext.Provider>
    )

};

export const useAuth = () => useContext(AuthContext)