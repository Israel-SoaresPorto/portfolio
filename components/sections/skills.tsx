import { Badge } from "@/components/ui/badge";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiJsonwebtokens,
  SiPostgresql,
  SiPrisma,
  SiLinux,
  SiDocker,
  SiGit,
  SiGithub,
  SiGithubcopilot,
  SiN8n,
} from "@icons-pack/react-simple-icons";
import {
  UserLockIcon,
  Cog,
  UsersRound,
  Puzzle,
  Glasses,
  Brain,
  GraduationCap,
  ClipboardList,
} from "lucide-react";
import AWS from "../icons/aws";
import VSCode from "../icons/vscode";
import { Card, CardContent } from "../ui/card";

interface Skill {
  name: string;
  icon?: React.ElementType;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

export function Skills() {
  const skillCategories: SkillCategory[] = [
    {
      title: "Front-End",
      skills: [
        { name: "HTML", icon: SiHtml5 },
        { name: "CSS", icon: SiCss },
        { name: "Javascript", icon: SiJavascript },
        { name: "React", icon: SiReact },
        { name: "Tailwind CSS", icon: SiTailwindcss },
        { name: "Next.js", icon: SiNextdotjs },
        { name: "Typescript", icon: SiTypescript },
      ],
    },
    {
      title: "Back-End",
      skills: [
        { name: "Node.js", icon: SiNodedotjs },
        { name: "Express.js", icon: SiExpress },
        { name: "Nest.js", icon: SiNestjs },
        { name: "Autenticação", icon: UserLockIcon },
        { name: "JWT", icon: SiJsonwebtokens },
        { name: "Postgresql", icon: SiPostgresql },
        { name: "Prisma ORM", icon: SiPrisma },
        { name: "API Rest", icon: Cog },
      ],
    },
    {
      title: "Infraestrutura",
      skills: [
        { name: "Linux", icon: SiLinux },
        { name: "Docker", icon: SiDocker },
        { name: "AWS", icon: AWS },
      ],
    },
    {
      title: "Ferramentas & Workflows",
      skills: [
        { name: "Git", icon: SiGit },
        { name: "Github", icon: SiGithub },
        { name: "VSCode", icon: VSCode },
        { name: "Github Copilot", icon: SiGithubcopilot },
        { name: "N8N", icon: SiN8n },
      ],
    },
  ];

  const softSkills: Skill[] = [
    { name: "Trabalho em Equipe", icon: UsersRound },
    { name: "Resolução de Problemas", icon: Puzzle },
    { name: "Organização", icon: ClipboardList },
    { name: "Atenção no Detalhes", icon: Glasses },
    { name: "Pensamento Crítico", icon: Brain },
    { name: "Aprendizado Contínuo", icon: GraduationCap },
  ];

  return (
    <section
      className="w-full bg-primary/5 px-6 sm:px-12 lg:px-24 py-16"
      id="habilidades"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-20">
        {/* Hard Skills */}
        <div>
          <h2 className="text-3xl font-bold text-primary text-center mb-12">
            Habilidades
          </h2>
          {/* Grid de categorias (hard skills) */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-16 gap-y-12"
            aria-label="Categorias de Hard Skills"
          >
            {skillCategories.map((category) => (
              <article
                key={category.title}
                className="space-y-4"
                aria-labelledby={`category-${category.title}`}
              >
                <h3
                  id={`category-${category.title}`}
                  className="text-xl font-semibold text-primary"
                >
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill) => (
                    <Badge
                      aria-label={skill.name}
                      variant="outline"
                      key={skill.name}
                      className="px-4 py-2 border-primary text-zinc-700 dark:text-zinc-300 bg-background/20 text-sm font-medium flex items-center gap-2 shadow-xs hover:shadow-xs transition-shadow duration-300 hover:shadow-primary/50"
                    >
                      {skill.icon && (
                        <skill.icon
                          className="size-8 text-primary"
                          aria-hidden="true"
                          role="img"
                        />
                      )}
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <article className="space-y-4" aria-labelledby="soft-skills-title">
          <h2
            className="text-3xl font-bold text-primary mb-12 text-center"
            id="soft-skills-title"
          >
            Minhas Softs Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {softSkills.map((skill) => (
              <Card
                key={skill.name}
                className="p-4 bg-background/20 backdrop-blur-lg 
                hover:shadow-sm transition-shadow duration-300 hover:shadow-primary/50 flex-row items-center group"
                aria-label={skill.name}
              >
                <div className="p-3 bg-primary/5 border rounded-lg group-hover:bg-primary/10 group-hover:border-primary/20 transition-colors duration-300">
                  {skill.icon && (
                    <skill.icon
                      className="size-6 text-primary"
                      role="img"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <CardContent className="p-0 font-semibold text-zinc-700 dark:text-zinc-300">
                  {skill.name}
                </CardContent>
              </Card>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
