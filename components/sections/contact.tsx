"use client";

import { Mail } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { Button } from "@/components/ui/button";
import Linkedin from "@/components/icons/linkedin";

export function Contact() {
  return (
    <section
      id="contato"
      className="bg-secondary/10 w-full py-20 px-6 sm:px-12 lg:px-24"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center gap-8 text-center">
        <h2 className="text-4xl font-bold text-primary">Vamos Conversar?</h2>

        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
          Estou sempre aberto a novas oportunidades e colaborações em projetos.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Button variant="default" size="lg" asChild className="gap-2">
            <a href="mailto:seu-email@example.com">
              <Mail className="size-5" />
              E-mail
            </a>
          </Button>

          <Button variant="outline" size="lg" asChild className="gap-2">
            <a
              href="https://www.linkedin.com/in/seu-perfil"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="size-5" />
              Linkedin
            </a>
          </Button>

          <Button variant="outline" size="lg" asChild className="gap-2">
            <a
              href="https://github.com/seu-usuario"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiGithub className="size-5" />
              Github
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
