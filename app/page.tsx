import { About } from "@/components/sections/about";
import { Hero } from "@/components/sections/hero";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";
import { getProjects } from "@/lib/notion/notion";

export default async function Home() {
  // Busca projetos do Notion durante o build
  const projects = await getProjects();

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
        <Projects projects={projects} />

        {/* Contato Section */}
        <Contact />
      </main>
    </>
  );
}
