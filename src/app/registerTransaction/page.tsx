"use client";
import Header from "@/src/components/Header";
import RegisterTransactionForm from "@/src/components/TransactionRegisterForm";
import { NextPage } from "next";

export default function RegisterTransaction<NextPage>() {



  return (
    <>
      <Header />
      <RegisterTransactionForm />
    </>
  );
}
