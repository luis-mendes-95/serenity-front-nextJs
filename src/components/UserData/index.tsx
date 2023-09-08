"use client";
import { useAuth } from "@/src/contexts/authContext";
import api from "../../services/api";
import Link from "next/link";
import { parseCookies } from "nookies";

const cookies = parseCookies();

interface User {
  id: string;
  name: string;
  email: string;
}

export default function UserData() {
  const { user_data } = useAuth();

  return (
    <div
      style={{
        backgroundColor: "gray",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <section className="BowlSection">
        <ul
          style={{
            listStyle: "none",
          }}
        >
          <h2>Potes</h2>
          {user_data?.Bowl.map((bowl: any) => {
            if(!bowl.bowl_id){
              return (
                <li
                  style={{
                    backgroundColor: "lightgreen",
                    padding: "1px",
                    minWidth: "200px",
                    maxWidth: "400px",
                    minHeight: "120px",
                    maxHeight: "100px",
                  }}
                >
                  <h3>{bowl.name}</h3>
                  <p>$ {bowl.amount}</p>
                </li>
              );
            }
          })}
        </ul>
      </section>

      <section className="TransactionSection">
        <ul
          style={{
            listStyle: "none",
          }}
        >
          <h2>Transações</h2>
          {user_data?.Transaction.map((transaction: any) => {
            return (
              <li
                style={{
                  backgroundColor: "lightcoral",
                  padding: "1px",
                  minWidth: "200px",
                  maxWidth: "400px",
                  minHeight: "120px",
                  maxHeight: "100px",
                }}
              >
                <h3>{transaction.description}</h3>
                <p>$ {transaction.amount}</p>
                <p>{transaction.type}</p>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
