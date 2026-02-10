"use client";

import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
// import Image from 'next/image'

export function Hero() {
  return (
    <section className="w-full max-w-7xl px-4 md:px-12 lg:px-24" id="home">
      <div className="flex min-h-160 flex-col-reverse items-center justify-center gap-8 md:gap-12 lg:flex-row lg:justify-between">
        {/* Conteúdo à esquerda */}
        <div className="flex flex-col space-y-6 text-center lg:text-left lg:flex-1">
          <h1 className="text-4xl font-bold">
            Oi, eu sou <span className="text-primary">Israel Soares Porto</span>
          </h1>

          <p className="text-xl font-medium text-primary md:text-2xl">
            Desenvolvedor Full-Stack, focado em criar sistemas escaláveis,
            seguros e eficientes.
          </p>

          {/* Botões */}
          <div className="flex gap-4 sm:flex-row sm:gap-6 justify-center lg:justify-start">
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

            <Button size="lg" variant="outline" className="font-medium" asChild>
              <a href="/cv.pdf" download>
                Baixar CV
                <Download className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>

        {/* Imagem/Avatar à direita */}
        <div className="relative h-64 w-64 rounded-3xl bg-zinc-200 dark:bg-zinc-800 md:h-80 md:w-80 lg:h-96 lg:w-96">
          {/* Placeholder para imagem - substitua com sua foto */}
          {/* <Image 
              src="/profile.jpg" 
              alt="Israel Soares Porto"
              fill
              className="rounded-3xl object-cover"
              priority
            /> */}
        </div>
      </div>
    </section>
  );
}
