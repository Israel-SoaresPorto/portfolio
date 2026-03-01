import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Projects } from "@/components/sections/projects";
import { Project } from "@/lib/types";

// Mock do ProjectCard para simplificar os testes
jest.mock("@/components/project-card", () => ({
  ProjectCard: ({ project }: { project: Project }) => (
    <div data-testid={`project-card-${project.id}`}>
      <h3>{project.name}</h3>
      <p>{project.description}</p>
    </div>
  ),
}));

const mockProjects: Project[] = [
  {
    id: "1",
    name: "Projeto Destaque 1",
    description: "Descrição do projeto destaque",
    category: "fullstack",
    highlight: true,
    technologies: ["React", "Node.js"],
    highlights: ["Feature 1"],
    githubUrl: "https://github.com/test/project1",
    demoUrl: "https://demo.test/project1",
    image: "/test-image-1.jpg",
  },
  {
    id: "2",
    name: "Projeto Full Stack",
    description: "Projeto full stack normal",
    category: "fullstack",
    highlight: false,
    technologies: ["Next.js", "TypeScript"],
    highlights: ["Feature 2"],
    githubUrl: "https://github.com/test/project2",
    image: "/test-image-2.jpg",
  },
  {
    id: "3",
    name: "Projeto Infra",
    description: "Projeto de infraestrutura",
    category: "infra",
    highlight: false,
    technologies: ["AWS", "Terraform"],
    highlights: ["Feature 3"],
    githubUrl: "https://github.com/test/project3",
    image: "/test-image-3.jpg",
  },
];

describe("Projects", () => {
  it("deve renderizar o título da seção", () => {
    render(<Projects projects={mockProjects} />);
    const title = screen.getByRole("heading", { name: /projetos/i });
    expect(title).toBeInTheDocument();
  });

  it("deve renderizar a descrição da seção", () => {
    render(<Projects projects={mockProjects} />);
    const description = screen.getByText(
      /Uma seleção de soluções que desenvolvi unindo infraestrutura em nuvem/i,
    );
    expect(description).toBeInTheDocument();
  });

  it("deve renderizar todas as abas de filtro", () => {
    render(<Projects projects={mockProjects} />);

    expect(screen.getByRole("tab", { name: /destaques/i })).toBeInTheDocument();
    expect(
      screen.getByRole("tab", { name: /full stack/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("tab", { name: /infraestrutura/i }),
    ).toBeInTheDocument();
  });

  it("deve iniciar com a aba 'Destaques' selecionada", () => {
    render(<Projects projects={mockProjects} />);
    const highlightTab = screen.getByRole("tab", { name: /destaques/i });
    expect(highlightTab).toHaveAttribute("data-state", "active");
  });

  it("deve exibir apenas projetos em destaque no estado inicial", () => {
    render(<Projects projects={mockProjects} />);

    const highlightProjects = mockProjects.filter((p) => p.highlight);
    const projectCards = screen.getAllByTestId(/project-card-/);

    expect(projectCards).toHaveLength(highlightProjects.length);
  });

  it("deve filtrar projetos ao clicar na aba 'Full Stack'", async () => {
    const user = userEvent.setup();
    render(<Projects projects={mockProjects} />);

    const fullStackTab = screen.getByRole("tab", { name: /full stack/i });
    await user.click(fullStackTab);

    expect(fullStackTab).toHaveAttribute("data-state", "active");

    const fullStackProjects = mockProjects.filter(
      (p) => p.category === "fullstack",
    );
    const projectCards = screen.getAllByTestId(/project-card-/);

    expect(projectCards).toHaveLength(fullStackProjects.length);
  });

  it("deve filtrar projetos ao clicar na aba 'Infraestrutura'", async () => {
    const user = userEvent.setup();
    render(<Projects projects={mockProjects} />);

    const infraTab = screen.getByRole("tab", { name: /infraestrutura/i });
    await user.click(infraTab);

    expect(infraTab).toHaveAttribute("data-state", "active");

    const infraProjects = mockProjects.filter((p) => p.category === "infra");
    const projectCards = screen.getAllByTestId(/project-card-/);

    expect(projectCards).toHaveLength(infraProjects.length);
  });

  it("deve voltar a exibir destaques ao clicar novamente na aba 'Destaques'", async () => {
    const user = userEvent.setup();
    render(<Projects projects={mockProjects} />);

    // Navega para outra aba
    const fullStackTab = screen.getByRole("tab", { name: /full stack/i });
    await user.click(fullStackTab);

    // Volta para destaques
    const highlightTab = screen.getByRole("tab", { name: /destaques/i });
    await user.click(highlightTab);

    expect(highlightTab).toHaveAttribute("data-state", "active");

    const highlightProjects = mockProjects.filter((p) => p.highlight);
    const projectCards = screen.getAllByTestId(/project-card-/);

    expect(projectCards).toHaveLength(highlightProjects.length);
  });

  it("deve renderizar a mensagem de estado vazio quando não há projetos", () => {
    // Testa com array vazio
    render(<Projects projects={[]} />);

    const emptyMessage = screen.getByText(
      /nenhum projeto encontrado./i,
    );
    expect(emptyMessage).toBeInTheDocument();
  });

  it("deve renderizar a grade de projetos com layout responsivo", () => {
    render(<Projects projects={mockProjects} />);

    const grid = screen.getAllByTestId(/project-card-/)[0]?.parentElement;

    expect(grid).toHaveClass("grid");
    expect(grid).toHaveClass("grid-cols-1");
    expect(grid).toHaveClass("md:grid-cols-2");
    expect(grid).toHaveClass("xl:grid-cols-3");
  });

  it("deve ter o atributo id='projetos' para navegação por âncora", () => {
    const { container } = render(<Projects projects={mockProjects} />);
    const section = container.querySelector("#projetos");
    expect(section).toBeInTheDocument();
  });

  it("deve passar os projetos corretos para o ProjectCard", () => {
    render(<Projects projects={mockProjects} />);

    const highlightProjects = mockProjects.filter((p) => p.highlight);

    highlightProjects.forEach((project) => {
      const card = screen.getByTestId(`project-card-${project.id}`);
      expect(card).toBeInTheDocument();
      expect(within(card).getByText(project.name)).toBeInTheDocument();
    });
  });

  it("deve manter apenas uma aba ativa por vez", async () => {
    const user = userEvent.setup();
    render(<Projects projects={mockProjects} />);

    const highlightTab = screen.getByRole("tab", { name: /destaques/i });
    const fullStackTab = screen.getByRole("tab", { name: /full stack/i });

    // Inicialmente destaques está ativo
    expect(highlightTab).toHaveAttribute("data-state", "active");
    expect(fullStackTab).not.toHaveAttribute("data-state", "active");

    // Clica em full stack
    await user.click(fullStackTab);

    expect(highlightTab).not.toHaveAttribute("data-state", "active");
    expect(fullStackTab).toHaveAttribute("data-state", "active");
  });

  it("deve aceitar projetos vindos do Notion (simulação de buildtime)", () => {
    // Simula projetos vindos do Notion API
    const notionProjects: Project[] = [
      {
        id: "notion-1",
        name: "Projeto do Notion",
        description: "Projeto sincronizado do Notion",
        category: "fullstack",
        highlight: true,
        technologies: ["Next.js", "Notion API"],
        highlights: ["Sincronização automática", "Buildtime data fetching"],
        githubUrl: "https://github.com/test/notion-project",
        image: "/notion-image.jpg",
      },
    ];

    render(<Projects projects={notionProjects} />);

    const projectCard = screen.getByTestId("project-card-notion-1");
    expect(projectCard).toBeInTheDocument();
    expect(within(projectCard).getByText("Projeto do Notion")).toBeInTheDocument();
  });
});
