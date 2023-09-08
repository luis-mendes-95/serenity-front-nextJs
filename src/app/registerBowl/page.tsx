"use client";
import RegisterBowlForm from "@/src/components/BowlRegisterForm";
import Header from "@/src/components/Header";
import { NextPage } from "next";

export default function Signup<NextPage>() {



  return (
    <>
      <Header />
      <RegisterBowlForm />
    </>
  );
}
