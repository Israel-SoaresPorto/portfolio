export type ProjectCategory = "fullstack" | "infra";

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
};

export type ProjectFilter = "highlight" | ProjectCategory;
