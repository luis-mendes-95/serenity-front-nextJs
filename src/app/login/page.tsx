
import Header from "@/src/components/Header"
import LoginForm from "@/src/components/LoginForm"
import { NextPage } from "next"

export default function Login<NextPage>() {
    return (
        <>
            <Header/>
            <LoginForm/>
        </>
    )
}