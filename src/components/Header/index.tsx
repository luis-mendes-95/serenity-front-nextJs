import api from "../../app/services/api"
import Link from "next/link";

interface User {
    id: string;
    name: string;
    email: string;
  }

export default async function Header() {

  const userLoggedIn = false;

  const userId = "0c7b454f-4412-4392-8e00-cb82682524b9"

  const response = await api.get<User>(`users/${userId}`);

  return (
    <>

    {/*HEADER DO USUÁRIO LOGADO ---INICIO//*/}
      {userLoggedIn && (
        <div>
                <header style={{backgroundColor: "black", color: "white", display:"flex", flexDirection:"column",
                    padding: "15px", gap:"15px"}}>
      <p>
      Olá {response.data.name}!
      </p>
      <nav>
        <button>Nova Receita +</button>
        <button>Nova Despesa -</button>
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
            <p style={{color:"green", fontWeight:"bold"}}>R$ 375,00</p>
        </div>
      </div>
      </header>
        </div>
      )}
    {/*HEADER DO USUÁRIO LOGADO ---FIM//*/}




    {/*HEADER DO USUÁRIO NÃO LOGADO ---INICIO//*/}
    {!userLoggedIn && (
        <div>
            <header style={{backgroundColor: "black", color: "white", display:"flex", flexDirection:"column", padding: "15px", gap:"15px"}}>
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
