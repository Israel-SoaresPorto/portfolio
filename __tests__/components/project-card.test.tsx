import { render, screen } from "@testing-library/react";
import { ProjectCard } from "@/components/project-card";
import { Project } from "@/lib/types";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  default: (props: any) => {
    return <img {...props} />;
  },
}));

describe("ProjectCard", () => {
  const mockProject: Project = {
    id: "1",
    name: "Projeto Teste",
    description: "Descrição do projeto teste",
    highlight: false,
    category: "fullstack",
    technologies: ["React", "TypeScript", "Node.js"],
    highlights: [
      { text: "Funcionalidade destacada 1" },
      { text: "Funcionalidade destacada 2" },
    ],
    githubUrl: "https://github.com/test/project",
    demoUrl: "https://demo.test.com",
    image: "/images/test-project.png",
  };

  it("deve renderizar o card com todas as informações do projeto", () => {
    render(<ProjectCard project={mockProject} />);

    expect(screen.getByText("Projeto Teste")).toBeInTheDocument();
    expect(
      screen.getByText("Descrição do projeto teste"),
    ).toBeInTheDocument();
  });

  it("deve renderizar a imagem do projeto quando fornecida", () => {
    render(<ProjectCard project={mockProject} />);

    const image = screen.getByAltText("Preview do projeto Projeto Teste");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockProject.image);
  });

  it("não deve renderizar imagem quando não fornecida", () => {
    const projectWithoutImage = { ...mockProject, image: undefined };
    render(<ProjectCard project={projectWithoutImage} />);

    const image = screen.queryByAltText("Preview do projeto Projeto Teste");
    expect(image).not.toBeInTheDocument();
  });

  it("deve renderizar o badge 'Destaque' quando o projeto for destacado", () => {
    const highlightedProject = { ...mockProject, highlight: true };
    render(<ProjectCard project={highlightedProject} />);

    expect(screen.getByText("Destaque")).toBeInTheDocument();
  });

  it("não deve renderizar o badge 'Destaque' quando o projeto não for destacado", () => {
    render(<ProjectCard project={mockProject} />);

    expect(screen.queryByText("Destaque")).not.toBeInTheDocument();
  });

  it("deve renderizar todos os highlights do projeto", () => {
    render(<ProjectCard project={mockProject} />);

    expect(screen.getByText("Funcionalidade destacada 1")).toBeInTheDocument();
    expect(screen.getByText("Funcionalidade destacada 2")).toBeInTheDocument();
  });

  it("não deve renderizar a lista de highlights quando vazia", () => {
    const projectWithoutHighlights = { ...mockProject, highlights: [] };
    const { container } = render(
      <ProjectCard project={projectWithoutHighlights} />,
    );

    const list = container.querySelector("ul");
    expect(list).not.toBeInTheDocument();
  });

  it("deve renderizar todas as tecnologias do projeto", () => {
    render(<ProjectCard project={mockProject} />);

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
  });

  it("deve renderizar o botão do GitHub quando githubUrl estiver presente", () => {
    render(<ProjectCard project={mockProject} />);

    const githubLink = screen.getByRole("link", { name: /github/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute("href", mockProject.githubUrl);
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("não deve renderizar o botão do GitHub quando githubUrl não estiver presente", () => {
    const projectWithoutGithub = { ...mockProject, githubUrl: undefined };
    render(<ProjectCard project={projectWithoutGithub} />);

    const githubLink = screen.queryByRole("link", { name: /github/i });
    expect(githubLink).not.toBeInTheDocument();
  });

  it("deve renderizar o botão de Demo quando demoUrl estiver presente", () => {
    render(<ProjectCard project={mockProject} />);

    const demoLink = screen.getByRole("link", { name: /demo/i });
    expect(demoLink).toBeInTheDocument();
    expect(demoLink).toHaveAttribute("href", mockProject.demoUrl);
    expect(demoLink).toHaveAttribute("target", "_blank");
    expect(demoLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("não deve renderizar o botão de Demo quando demoUrl não estiver presente", () => {
    const projectWithoutDemo = { ...mockProject, demoUrl: undefined };
    render(<ProjectCard project={projectWithoutDemo} />);

    const demoLink = screen.queryByRole("link", { name: /demo/i });
    expect(demoLink).not.toBeInTheDocument();
  });

  it("deve aplicar a className personalizada quando fornecida", () => {
    const { container } = render(
      <ProjectCard project={mockProject} className="custom-class" />,
    );

    const card = container.firstChild;
    expect(card).toHaveClass("custom-class");
  });

  it("deve renderizar corretamente um projeto sem links", () => {
    const projectWithoutLinks = {
      ...mockProject,
      githubUrl: undefined,
      demoUrl: undefined,
    };
    render(<ProjectCard project={projectWithoutLinks} />);

    expect(screen.getByText("Projeto Teste")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /github/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /demo/i })).not.toBeInTheDocument();
  });

  it("deve renderizar corretamente um projeto completo com todos os campos", () => {
    const completeProject: Project = {
      ...mockProject,
      highlight: true,
    };
    render(<ProjectCard project={completeProject} />);

    // Verifica informações básicas
    expect(screen.getByText(completeProject.name)).toBeInTheDocument();
    expect(screen.getByText(completeProject.description)).toBeInTheDocument();

    // Verifica badge de destaque
    expect(screen.getByText("Destaque")).toBeInTheDocument();

    // Verifica highlights
    completeProject.highlights.forEach((highlight) => {
      expect(screen.getByText(highlight.text)).toBeInTheDocument();
    });

    // Verifica tecnologias
    completeProject.technologies.forEach((tech) => {
      expect(screen.getByText(tech)).toBeInTheDocument();
    });

    // Verifica links
    expect(screen.getByRole("link", { name: /github/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /demo/i })).toBeInTheDocument();
  });
});
