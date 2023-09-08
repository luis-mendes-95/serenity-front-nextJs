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

export default function Header() {

  const { user_id, logout } = useAuth();

  const handleLogout = () => {
    logout(); 
  };


  return (
    <>
      {/*HEADER DO USUÁRIO LOGADO ---INICIO//*/}
      {user_id && (
        <div>
          <header
            style={{
              backgroundColor: "black",
              color: "white",
              display: "flex",
              flexDirection: "column",
              padding: "15px",
              gap: "15px",
            }}
          >
            <p>Olá Usuário!</p>
            <button
             style={{
             width: "100px",
             backgroundColor: "orange",
             border: "none",
             cursor:"pointer"}}
             onClick={handleLogout}>
              Logout
            </button>
            <nav>
              <button>Nova Transação +</button>
            </nav>
            <nav>
              <button>Necessidades Básicas 50%</button>
              <button>Diversão 10%</button>
              <button>Educação Financeira 10%</button>
              <button>Longo Prazo 10%</button>
              <button>Liberdade Financeira 10%</button>
              <button>Doações 10%</button>
            </nav>
            <div>
              <div>
                <p>Patrimônio:</p>
                <p style={{ color: "green", fontWeight: "bold" }}>R$ 375,00</p>
              </div>
            </div>
          </header>
        </div>
      )}
      {/*HEADER DO USUÁRIO LOGADO ---FIM//*/}

      {/*HEADER DO USUÁRIO NÃO LOGADO ---INICIO//*/}
      {!user_id && (
        <div>
          <header
            style={{
              backgroundColor: "black",
              color: "white",
              display: "flex",
              flexDirection: "column",
              padding: "15px",
              gap: "15px",
            }}
          >
            <nav>
              <Link href={`about`}>
                <button>Sobre</button>
              </Link>

              <Link href={`signup`}>
                <button>Registro</button>
              </Link>

              <Link href={`login`}>
                <button>Login</button>
              </Link>
            </nav>
          </header>
        </div>
      )}
      {/*HEADER DO USUÁRIO NÃO LOGADO ---FIM//*/}
    </>
  );
}
