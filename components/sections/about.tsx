import { BookOpen, Search, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import Image from "next/image";

const qualities = [
  {
    name: "Aprendizado Contínuo",
    icon: BookOpen,
    description:
      "Encaro cada nova tecnologia como um desafio a ser vencido. Tenho uma vontade genuína de aprender novas habilidades, adaptando-me rapidamente às mudanças do mercado técnico.",
  },
  {
    name: "Resolução de Problemas",
    icon: Search,
    description:
      'Minha abordagem não é apenas "fazer funcionar", mas entender o porquê. Analiso problemas com rigor crítico para encontrar soluções sustentáveis e eficientes, focando na causa raiz.',
  },
  {
    name: "Melhoria Contínua",
    icon: TrendingUp,
    description:
      "Busco diariamente aprimorar não apenas minhas competências técnicas em código e nuvem, mas também minhas habilidades comportamentais, como protagonismo e comunicação clara.",
  },
];

export function About() {
  return (
    <section
      className="w-full bg-secondary/10 px-6 sm:px-12 lg:px-24 py-16"
      id="sobre"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Título principal */}
        <h2 className="text-3xl sm:text-4xl font-bold text-primary text-center">
          Sobre Mim
        </h2>
        {/* Container principal com foto e introdução */}
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
          {/* Foto de perfil */}
          <Image
            src="/images/profile.jpg"
            alt="Foto de perfil de Israel Soares Porto"
            width={240}
            height={240}
            className="object-cover rounded-sm"
          />
          {/* Parágrafo introdutório */}
          <div className="space-y-1">
            <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
              Sou estudante de Sistemas de Informação (5° semestre). Minha base
              sólida reside no Desenvolvimento Full-Stack, trabalhando com
              tecnologias como TypeScript, React, Nest.JS, e Postgresql.
            </p>
            <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
              Hoje vivo um momento minha transição estratégica para a cultura
              DevOps. Atualmente, dedico minha energia ao domínio de
              arquiteturas AWS, buscando unir a agilidade do desenvolvimento com
              a resiliência da infraestrutura moderna. Minha jornada é guiada
              por uma paixão por aprender e evoluir constantemente, buscando não
              apenas acompanhar as tendências, mas também antecipá-las.
            </p>
            <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
              Acredito que a combinação de habilidades técnicas e uma
              mentalidade de melhoria contínua é a chave para criar soluções
              inovadoras e impactantes.
            </p>
          </div>
        </div>
        {/* Grid de características */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {qualities.map((quality, index) => (
            <Card
              key={index}
              role="article"
              className="hover:shadow-sm transition-shadow duration-300 hover:shadow-primary/50"
            >
              <CardContent>
                <div className="inline-block bg-primary/10 dark:bg-primary/20 p-2 rounded-md mb-2">
                  <quality.icon className="size-6 text-primary" />
                </div>
                <CardTitle className="text-xl text-primary mb-4">
                  <h3>{quality.name}</h3>
                </CardTitle>
                <CardDescription>{quality.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
