"use client";

import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";

export function Hero() {
  return (
    <section
      className="bg-secondary/10 w-full min-h-screen pt-32 py-16 px-6 sm:px-12 lg:px-24 flex justify-center"
      id="home"
    >
      <div className="max-w-7xl gap-8 flex flex-col justify-center items-center">
        <Badge className="font-medium sm:text-sm">
          Disponivel para oportunidades
        </Badge>
        {/* Textos e Botões */}
        <div className="flex flex-col gap-6 text-center">
          <p className="text-lg text-zinc-700 dark:text-zinc-300">
            Olá, eu sou
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary">
            Israel Soares Porto
          </h1>

          <p className="text-base sm:text-lg font-medium text-zinc-700 dark:text-zinc-300">
            Desenvolvedor Full-Stack | Foco em Cloud & DevOps
          </p>

          {/* CTAs */}
          <div className="flex gap-4 xs:gap-6 justify-center">
            <Button
              size="lg"
              onClick={() => {
                document
                  .getElementById("projetos")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Ver Projetos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="font-medium text-primary border-primary hover:bg-primary hover:text-background bg-transparent dark:hover:bg-primary dark:hover:text-primary-foreground dark:border-primary"
              asChild
            >
              <a href="/curriculo.pdf" download>
                Baixar CV
                <Download className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
