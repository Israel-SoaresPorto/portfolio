export type ProjectCategory = "fullstack" | "infra" | "automation";

export interface Project {
  id: string;
  name: string;
  description: string;
  highlight: boolean;
  image?: string;
  category: ProjectCategory;
  technologies: string[];
  highlights: string[];
  githubUrl?: string;
  demoUrl?: string;
}

export const categoryLabels: Record<ProjectCategory, string> = {
  fullstack: "Full Stack",
  infra: "Infraestrutura",
  automation: "Automação",
};

export type ProjectFilter = "highlight" | ProjectCategory;
