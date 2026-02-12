import { About } from "@/components/sections/about";
import { Hero } from "@/components/sections/hero";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      {/* Home Section */}
      <Hero />

      {/* Sobre Section */}
      <About />

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
          <p>Em breve: Formulário de contato e informações de redes sociais.</p>
        </div>
      </section>
    </main>
  );
}
