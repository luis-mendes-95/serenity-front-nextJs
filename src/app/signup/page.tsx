
import Header from "@/src/components/Header"
import RegisterForm from "@/src/components/RegisterForm"
import { NextPage } from "next"

export default function Signup<NextPage>() {
    return (
        <>
            <Header/>
            <RegisterForm/>
        </>
    )
}