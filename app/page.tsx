import { Hero } from "@/components/sections/hero";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 md:px-12 lg:px-24 mt-16">
      <main className="w-full max-w-7xl">
        {/* Home Section */}
        <Hero />

        <div className="container mx-auto px-4 md:px-6">
          {/* Sobre Section */}
          <section
            id="sobre"
            className="min-h-screen py-20 flex flex-col justify-center"
          >
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-8 text-center">
              Sobre Mime
            </h2>
            <div className="text-center text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              <p>Em breve: Informações sobre minha trajetória e experiência.</p>
            </div>
          </section>

          {/* Habilidades Section */}
          <section
            id="habilidades"
            className="min-h-screen py-20 flex flex-col justify-center"
          >
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-8 text-center">
              Minhas Habilidades
            </h2>
            <div className="text-center text-zinc-600 dark:text-zinc-400">
              <p>Em breve: Lista de tecnologias e ferramentas que domino.</p>
            </div>
          </section>

          {/* Projetos Section */}
          <section
            id="projetos"
            className="min-h-screen py-20 flex flex-col justify-center"
          >
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-8 text-center">
              Meus Projetos
            </h2>
            <div className="text-center text-zinc-600 dark:text-zinc-400">
              <p>Em breve: Showcase dos meus melhores trabalhos.</p>
            </div>
          </section>

          {/* Contato Section */}
          <section
            id="contato"
            className="min-h-screen py-20 flex flex-col justify-center"
          >
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-8 text-center">
              Entre em Contato
            </h2>
            <div className="text-center text-zinc-600 dark:text-zinc-400">
              <p>
                Em breve: Formulário de contato e informações de redes sociais.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
