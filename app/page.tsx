export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <main className="container mx-auto px-4 md:px-6">
        {/* Home Section */}
        <section id="home" className="flex min-h-screen flex-col items-center justify-center text-center pt-16">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 md:text-6xl">
            Olá, sou Israel Soares
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 md:text-xl">
            Desenvolvedor Full Stack apaixonado por criar experiências web incríveis
          </p>
        </section>

        {/* Sobre Section */}
        <section id="sobre" className="min-h-screen py-20 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-8 text-center">Sobre Mime</h2>
            <div className="text-center text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              <p>Em breve: Informações sobre minha trajetória e experiência.</p>
            </div>
        </section>

        {/* Habilidades Section */}
        <section id="habilidades" className="min-h-screen py-20 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-8 text-center">Minhas Habilidades</h2>
            <div className="text-center text-zinc-600 dark:text-zinc-400">
               <p>Em breve: Lista de tecnologias e ferramentas que domino.</p>
            </div>
        </section>

        {/* Projetos Section */}
        <section id="projetos" className="min-h-screen py-20 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-8 text-center">Meus Projetos</h2>
             <div className="text-center text-zinc-600 dark:text-zinc-400">
               <p>Em breve: Showcase dos meus melhores trabalhos.</p>
            </div>
        </section>

         {/* Contato Section */}
        <section id="contato" className="min-h-screen py-20 flex flex-col justify-center">
             <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-8 text-center">Entre em Contato</h2>
             <div className="text-center text-zinc-600 dark:text-zinc-400">
               <p>Em breve: Formulário de contato e informações de redes sociais.</p>
            </div>
        </section>

      </main>
    </div>
  );
}
