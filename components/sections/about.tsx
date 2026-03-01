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
      className="w-full bg-slate-50 dark:bg-zinc-950 px-6 sm:px-12 lg:px-24 py-16"
      id="sobre"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Título principal */}
        <div className="space-y-3">
          <p className="text-primary font-medium uppercase tracking-wide">
            Sobre
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100">
            Sobre Mim
          </h2>
        </div>
        {/* Container principal com foto e introdução */}
        <div className="flex flex-col items-center gap-12 lg:gap-16 md:flex-row md:items-start">
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
              Sou estudante do 5º semestre de Sistemas de Informação com forte
              base em Desenvolvimento Full-Stack, construindo aplicações
              robustas com TypeScript, React, Nest.js e PostgreSQL.
            </p>
            <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
              Atualmente, estou focado em minha transição para a área de Cloud e
              DevOps. Dedico meus estudos diários ao domínio de ambientes Linux
              e arquiteturas AWS. Meu principal objetivo é unir a agilidade da
              criação de software com a resiliência, automação e escalabilidade
              da infraestrutura moderna.
            </p>
            <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
              Mais do que acompanhar tendências, busco entender o
              &quot;porquê&quot; por trás de cada ferramenta, aplicando uma
              mentalidade de melhoria contínua para desenvolver sistemas que
              realmente façam a diferença.
            </p>
          </div>
        </div>
        {/* Grid de características */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {qualities.map((quality, index) => (
            <Card
              key={index}
              role="article"
              className="shadow-sm border-0"
            >
              <CardContent>
                <div className="inline-block bg-primary/10 dark:bg-primary/20 p-2 rounded-md mb-2">
                  <quality.icon className="size-6 text-primary" />
                </div>
                <CardTitle className="text-xl text-zinc-900 dark:text-zinc-100 mb-4">
                  <h3>{quality.name}</h3>
                </CardTitle>
                <CardDescription className="text-zinc-700 dark:text-zinc-300">
                  {quality.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
