"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { Button } from "@/components/ui/button";
import Linkedin from "@/components/icons/linkedin";

export function Contact() {
  return (
    <section
      id="contato"
      className="bg-primary/5 w-full py-20 px-6 sm:px-12 lg:px-24"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center gap-8 text-center">
        <div className="space-y-2">
          <p className="text-primary font-medium uppercase tracking-wide">
            Contato
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100">
            Vamos Conversar?
          </h2>
        </div>

        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
          Estou sempre aberto a novas oportunidades e colaborações em projetos.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Button
            variant="outline"
            size="lg"
            asChild
            className="gap-2 bg-zinc-50 border border-zinc-300 hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary dark:hover:text-primary-foreground"
          >
            <Link href="mailto:soaresportoisrael@gmail.com">
              <Mail className="size-5" />
              E-mail
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            asChild
            className="gap-2 bg-zinc-50 border border-zinc-300 hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary dark:hover:text-primary-foreground"
          >
            <Link
              href="https://www.linkedin.com/in/israel-soares-porto/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="size-5" />
              Linkedin
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            asChild
            className="gap-2 bg-zinc-50 border border-zinc-300 hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary dark:hover:text-primary-foreground"
          >
            <Link
              href="https://github.com/Israel-SoaresPorto"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiGithub className="size-5" />
              Github
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
