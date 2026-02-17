import { About } from "@/components/sections/about";
import { Hero } from "@/components/sections/hero";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <main className="min-h-screen flex flex-col items-center justify-center">
        {/* Home Section */}
        <Hero />

        {/* Sobre Section */}
        <About />

        {/* Habilidades Section */}
        <Skills />

        {/* Projetos Section */}
        <Projects />

        {/* Contato Section */}
        <Contact />
      </main>
    </>
  );
}
