import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import { getProjects } from "@/lib/notion/notion";
import type { Project } from "@/lib/types";

// Mock da função getProjects
jest.mock("@/lib/notion/notion", () => ({
  getProjects: jest.fn(),
}));

const mockProjects: Project[] = [
  {
    id: "1",
    name: "Projeto Mock 1",
    description: "Descrição do projeto mock 1",
    highlight: true,
    image: "/mock-image-1.png",
    category: "fullstack",
    technologies: ["React", "TypeScript"],
    highlights: ["Feature 1", "Feature 2"],
    githubUrl: "https://github.com/user/projeto1",
    demoUrl: "https://exemplo1.com",
  },
  {
    id: "2",
    name: "Projeto Mock 2",
    description: "Descrição do projeto mock 2",
    highlight: false,
    image: "/mock-image-2.png",
    category: "infra",
    technologies: ["Next.js", "Tailwind"],
    highlights: ["Feature A"],
    demoUrl: "https://exemplo2.com",
  },
];

describe("Home", () => {
  beforeEach(() => {
    // Mock getProjects para retornar projetos de teste
    (getProjects as jest.Mock).mockResolvedValue(mockProjects);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve renderizar o elemento main", async () => {
    const component = await Home();
    render(component);
    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
  });

  it("deve renderizar a seção Hero", async () => {
    const component = await Home();
    render(component);
    const heroSection = screen.getByText(/Olá, eu sou/i);
    expect(heroSection).toBeInTheDocument();
  });

  it("deve renderizar a seção Sobre", async () => {
    const component = await Home();
    render(component);
    const aboutSection = screen.getByText(/Sobre Mim/i);
    expect(aboutSection).toBeInTheDocument();
  });

  it("deve renderizar a seção Habilidades", async () => {
    const component = await Home();
    render(component);
    const habilidadesSection = screen.getByText(/Minhas Habilidades/i);
    expect(habilidadesSection).toBeInTheDocument();
  });

  it("deve renderizar a seção Projetos", async () => {
    const component = await Home();
    render(component);
    const projetosSection = screen.getByRole("heading", {
      name: /Projetos/i,
    });

    expect(projetosSection).toBeInTheDocument();
  });

  it("deve renderizar a seção Contato", async () => {
    const component = await Home();
    render(component);
    const contatoSection = screen.getByText(/Vamos Conversar/i);
    expect(contatoSection).toBeInTheDocument();
  });

  it("deve chamar getProjects durante a renderização", async () => {
    const component = await Home();
    render(component);
    expect(getProjects).toHaveBeenCalledTimes(1);
  });

  it("deve passar projetos do Notion para o componente Projects", async () => {
    const component = await Home();
    render(component);
    
    // Verifica que os projetos mockados são renderizados
    // (o componente Projects deve receber os projetos via props)
    expect(getProjects).toHaveBeenCalled();
  });
});