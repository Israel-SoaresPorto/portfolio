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
    { name: "Atenção aos Detalhes", icon: Glasses },
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
          <div className="space-y-2 mb-12">
            <p className="text-primary font-medium uppercase tracking-wide">
              Stack
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100">
              Habilidades
            </h2>
          </div>
          {/* Grid de categorias (hard skills) */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12"
            aria-label="Categorias de Hard Skills"
          >
            {skillCategories.map((category) => (
              <Card
                key={category.title}
                aria-labelledby={`category-${category.title}`}
                role="article"
                className="shadow-sm border-0 dark:bg-zinc-900"
              >
                <h3
                  id={`category-${category.title}`}
                  className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 px-6"
                >
                  {category.title}
                </h3>
                <CardContent className="flex flex-wrap gap-3">
                  {category.skills.map((skill) => (
                    <Badge
                      aria-label={skill.name}
                      key={skill.name}
                      className="text-zinc-700 dark:text-zinc-300 bg-primary/10 text-sm flex items-center gap-2 rounded-sm"
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
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <article className="space-y-4" aria-labelledby="soft-skills-title">
          <h3
            className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-12"
            id="soft-skills-title"
          >
            Soft Skills
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {softSkills.map((skill) => (
              <Card
                key={skill.name}
                className="p-4 items-center text-center gap-2 shadow-sm border-0 dark:bg-zinc-900"
                aria-label={skill.name}
              >
                <div className="p-2 bg-primary/10 border rounded-lg">
                  {skill.icon && (
                    <skill.icon
                      className="size-6 text-primary"
                      role="img"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <CardContent className="p-0 text-zinc-700 dark:text-zinc-300">
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
