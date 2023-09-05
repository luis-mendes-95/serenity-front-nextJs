import Link from "next/link";

export default function About() {
    return (
        <div>
            <Link href={`/`}>
                <button>Voltar ao início</button>
            </Link>

      <h1>Sobre o Aplicativo Serenity</h1>
      <p>
        Bem-vindo ao Serenity, o aplicativo que pode transformar sua vida financeira com base nos princípios dos "potes" mencionados no livro "Os Segredos da Mente Milionária" de T. Harv Eker.
      </p>

      <h2>Nossa Missão</h2>
      <p>
        Na Serenity, acreditamos que o gerenciamento financeiro é fundamental para alcançar a independência financeira e o sucesso. Nosso objetivo é ajudar você a aplicar os princípios dos "potes" de forma eficaz, permitindo que você organize suas finanças de maneira inteligente e alcance seus objetivos financeiros.
      </p>

      <h2>Como Funciona</h2>
      <p>
        Com o Serenity, você pode criar potes virtuais para várias categorias de despesas e investimentos. Nossa plataforma facilita a distribuição de sua renda para esses potes, garantindo que você esteja sempre no controle de suas finanças.
      </p>

      <h2>Por Que Escolher o Serenity</h2>
      <p>
        - Interface intuitiva e fácil de usar.<br />
        - Personalização completa dos potes de acordo com suas necessidades.<br />
        - Acompanhamento detalhado de gastos e investimentos.<br />
        - Apoio à sua jornada financeira em direção à riqueza e prosperidade.
      </p>

      <h2>Entre em Contato Conosco</h2>
      <p>
        Se você tiver alguma dúvida, sugestão ou feedback, não hesite em nos contatar. Estamos aqui para ajudar!
      </p>
      <p>Email: contato@serenityapp.com</p>
      <Link href={`/`}>
                <button>Voltar ao início</button>
      </Link>
    </div>
    )
}