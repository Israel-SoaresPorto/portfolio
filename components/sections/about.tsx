export function About() {
  return (
    <section
      className="w-full place-items-center bg-background-secondary px-4 md:px-12 lg:px-24 py-16"
      id="sobre"
    >
      <div className="max-w-7xl">
        {/* Título principal */}
        <h2 className="text-3xl font-bold mb-8">Sobre Mim</h2>
        {/* Parágrafo introdutório */}
        <p className="text-base md:text-lg leading-relaxed mb-12 text-foreground">
          Sou estudande de Sistemas de Informação (5° semestre). Minha base
          sólida reside no Desenvolvimento Full-Stack, mas hoje vivo um momento
          de expansão eespecialização profunda em Cloud Computing, traçando
          minha transição estratégica para a cultura DevOps. Atualmente, dedico
          minha energia ao domínio de arquiteturas AWS, buscando unir a
          agilidade do desenvolvimento com a resiliência da infraestrutura
          moderna.
        </p>
        {/* Grid de características */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:items-baseline">
          {/* Aprendizado Contínuo */}
          <div>
            <h3 className="mb-4 text-primary text-2xl font-medium">
              Curiosidade e Aprendizado Ágil
            </h3>
            <p className="text-base md:text-lg leading-relaxed text-foreground">
              Encaro cada nova tecnologia como um desafio a ser vencido. Tenho
              uma vontade genuína de aprender novas habilidades, adaptando-me
              rapidamente às mudanças do mercado técnico.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-primary text-2xl font-medium">
              Resolução de Problemas
            </h3>
            <p className="text-base md:text-lg leading-relaxed text-foreground">
              Minha abordagem não é apenas &quot;fazer funcionar&quot;, mas
              entender o porquê. Analiso problemas com rigor crítico para
              encontrar soluções sustentáveis e eficientes, focando na causa
              raiz.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-primary text-2xl font-medium">
              Melhoria Contínua
            </h3>
            <p className="text-base md:text-lg leading-relaxed text-foreground">
              Busco diariamente aprimorar não apenas minhas competências
              técnicas em código e nuvem, mas também minhas habilidades
              comportamentais, como protagonismo e comunicação clara.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
