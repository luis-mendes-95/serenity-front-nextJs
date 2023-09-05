import Link from "next/link";
import Header from "../components/Header";

export default async function Home() {

  return (
    <>
      <Header/>
      <main>
    <section>
        <h1>Bem-vindo ao Serenity</h1>
        <p>O aplicativo que transformará sua vida financeira!</p>
        <Link href="/signup">Comece Agora</Link>
    </section>

    <section>
        <h2>Recursos Principais</h2>
        <div>
            <h3>Gerenciamento de Finanças Simplificado</h3>
            <p>Organize suas finanças de maneira fácil e eficiente com nosso sistema de "potes".</p>
        </div>
        <div>
            <h3>Acompanhamento de Despesas</h3>
            <p>Monitore suas despesas e orçamento em tempo real para alcançar suas metas financeiras.</p>
        </div>
        <div>
            <h3>Investimentos Inteligentes</h3>
            <p>Descubra oportunidades de investimento e aumente sua riqueza com a Serenity.</p>
        </div>
    </section>

    <section>
        <h2>Depoimentos de Clientes Satisfeitos</h2>
        <div>
            <blockquote>
                "Serenity mudou minha maneira de lidar com o dinheiro. É uma ferramenta incrível!"
            </blockquote>
            <p>- João Silva</p>
        </div>
        <div>
            <blockquote>
                "Finalmente, encontrei uma maneira simples de controlar minhas finanças."
            </blockquote>
            <p>- Maria Santos</p>
        </div>
    </section>
</main>
    </>
  )
}
