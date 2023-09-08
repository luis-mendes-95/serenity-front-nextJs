'use client'

import { useRouter } from "next/navigation";
import { parseCookies, setCookie } from "nookies";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { RegisterBowl } from "../components/BowlRegisterForm";
import { EditBowl } from "../components/BowlEditForm";
import api from "../services/api";

interface Props {
    children: ReactNode;
}

interface bowlProviderData {
    user_id: string;
    register: (registerData: RegisterUser) => void;
    login: (loginData: LoginUser) => void;
}

const AuthContext = createContext<bowlProviderData>({} as bowlProviderData)

export const AuthProvider = ({children}: Props) => {

    const [user_id, setUserId] = useState("")

    useEffect(() => {
        const cookies = parseCookies();
        const id: string | undefined = cookies["serenity.app.user_id"];
        setUserId(id)
    }, [])
    

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
            setUserId(response.data.user_id)
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
        <AuthContext.Provider value={{ register, login, user_id }}>
            {children}
        </AuthContext.Provider>
    )

};

export const useAuth = () => useContext(AuthContext)