export type ProjectCategory = "fullstack" | "infra" | "automation";

export interface ProjectHighlight {
  text: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  highlight: boolean;
  image?: string;
  category: ProjectCategory;
  technologies: string[];
  highlights: ProjectHighlight[];
  githubUrl?: string;
  demoUrl?: string;
}

export const categoryLabels: Record<ProjectCategory, string> = {
  fullstack: "Full Stack",
  infra: "Infraestrutura",
  automation: "Automação",
};

export type ProjectFilter = "highlight" | ProjectCategory;
