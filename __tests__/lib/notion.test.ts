// Mock do Notion Client precisa estar antes dos imports que o usam
const mockQuery = jest.fn();

jest.mock("@notionhq/client", () => {
  return {
    Client: jest.fn().mockImplementation(() => ({
      dataSources: {
        query: (...args: any[]) => mockQuery(...args),
      },
    })),
  };
});

// Importa depois do mock para garantir que o mock seja aplicado
import { getNotionData, getProjects } from "@/lib/notion/notion";

describe("notion integration", () => {
  beforeEach(() => {
    // Limpa todos os mocks antes de cada teste
    jest.clearAllMocks();
    mockQuery.mockClear();

    // Mock do console.log e console.error para testes limpos
    jest.spyOn(console, "log").mockImplementation();
    jest.spyOn(console, "error").mockImplementation();
    jest.spyOn(console, "warn").mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("getNotionData", () => {
    it("deve buscar dados do Notion com sucesso", async () => {
      const mockResults = [
        {
          object: "page" as const,
          id: "page-1",
          properties: {},
        },
      ];

      mockQuery.mockResolvedValue({ results: mockResults });

      const result = await getNotionData();

      expect(mockQuery).toHaveBeenCalledWith({
        data_source_id: process.env.NOTION_DATASOURCE_ID,
      });
      expect(result).toEqual(mockResults);
      expect(console.log).toHaveBeenCalledWith(
        "✓ Notion: 1 projetos recuperados",
      );
    });

    it("deve retornar múltiplos resultados", async () => {
      const mockResults = [
        { object: "page" as const, id: "1", properties: {} },
        { object: "page" as const, id: "2", properties: {} },
        { object: "page" as const, id: "3", properties: {} },
      ];

      mockQuery.mockResolvedValue({ results: mockResults });

      const result = await getNotionData();

      expect(result).toHaveLength(3);
      expect(console.log).toHaveBeenCalledWith(
        "✓ Notion: 3 projetos recuperados",
      );
    });

    it("deve lançar erro quando a API falhar", async () => {
      const mockError = new Error("API Error");
      mockQuery.mockRejectedValue(mockError);

      await expect(getNotionData()).rejects.toThrow("API Error");
      expect(console.error).toHaveBeenCalledWith(
        "✗ Erro ao buscar dados do Notion:",
        mockError,
      );
    });
  });

  describe("getProjects", () => {
    it("deve transformar dados do Notion em projetos válidos", async () => {
      const mockResults = [
        {
          object: "page" as const,
          id: "project-1",
          properties: {
            Name: {
              type: "title" as const,
              title: [{ plain_text: "Projeto Teste" }] as any,
            },
            Descrição: {
              type: "rich_text" as const,
              rich_text: [{ plain_text: "Descrição do projeto" }] as any,
            },
            Destaque: {
              type: "checkbox" as const,
              checkbox: true,
            },
            Thumbnail: {
              type: "files" as const,
              files: [{ type: "file", file: { url: "https://example.com/img.png" } }] as any,
            },
            Categoria: {
              type: "select" as const,
              select: { name: "fullstack" } as any,
            },
            Tecnologias: {
              type: "multi_select" as const,
              multi_select: [{ name: "React" }, { name: "Node.js" }] as any,
            },
            Detalhes: {
              type: "rich_text" as const,
              rich_text: [{ plain_text: "•Feature 1\n•Feature 2\n•Feature 3" }] as any,
            },
            Github: {
              type: "url" as const,
              url: "https://github.com/test/repo",
            },
            Demo: {
              type: "url" as const,
              url: "https://demo.example.com",
            },
          },
        },
      ];

      mockQuery.mockResolvedValue({ results: mockResults });

      const projects = await getProjects();

      expect(projects).toHaveLength(1);
      expect(projects[0]).toMatchObject({
        id: "project-1",
        name: "Projeto Teste",
        description: "Descrição do projeto",
        highlight: true,
        image: "https://example.com/img.png",
        category: "fullstack",
        technologies: ["React", "Node.js"],
        highlights: ["Feature 1", "Feature 2", "Feature 3"],
        githubUrl: "https://github.com/test/repo",
        demoUrl: "https://demo.example.com",
      });
    });

    it("deve processar múltiplos projetos", async () => {
      const mockResults = [
        {
          object: "page" as const,
          id: "1",
          properties: {
            Name: { type: "title" as const, title: [{ plain_text: "Projeto 1" }] as any },
            Descrição: { type: "rich_text" as const, rich_text: [] as any },
            Destaque: { type: "checkbox" as const, checkbox: false },
            Thumbnail: { type: "files" as const, files: [] as any },
            Categoria: { type: "select" as const, select: { name: "infra" } as any },
            Tecnologias: { type: "multi_select" as const, multi_select: [] as any },
            Detalhes: { type: "rich_text" as const, rich_text: [] as any },
            GitHub: { type: "url" as const, url: null },
            Demo: { type: "url" as const, url: null },
          },
        },
        {
          object: "page" as const,
          id: "2",
          properties: {
            Name: { type: "title" as const, title: [{ plain_text: "Projeto 2" }] as any },
            Descrição: { type: "rich_text" as const, rich_text: [] as any },
            Destaque: { type: "checkbox" as const, checkbox: true },
            Thumbnail: { type: "files" as const, files: [] as any },
            Categoria: { type: "select" as const, select: { name: "fullstack" } as any },
            Tecnologias: { type: "multi_select" as const, multi_select: [] as any },
            Detalhes: { type: "rich_text" as const, rich_text: [] as any },
            GitHub: { type: "url" as const, url: null },
            Demo: { type: "url" as const, url: null },
          },
        },
      ];

      mockQuery.mockResolvedValue({ results: mockResults });

      const projects = await getProjects();

      expect(projects).toHaveLength(2);
      expect(projects[0].name).toBe("Projeto 1");
      expect(projects[0].category).toBe("infra");
      expect(projects[1].name).toBe("Projeto 2");
      expect(projects[1].category).toBe("fullstack");
    });

    it("deve usar categoria padrão 'fullstack' quando categoria for inválida", async () => {
      const mockResults = [
        {
          object: "page" as const,
          id: "1",
          properties: {
            Name: { type: "title" as const, title: [{ plain_text: "Projeto" }] as any },
            Descrição: { type: "rich_text" as const, rich_text: [] as any },
            Destaque: { type: "checkbox" as const, checkbox: false },
            Thumbnail: { type: "files" as const, files: [] as any },
            Categoria: { type: "select" as const, select: { name: "invalid-category" } as any },
            Tecnologias: { type: "multi_select" as const, multi_select: [] as any },
            Detalhes: { type: "rich_text" as const, rich_text: [] as any },
            GitHub: { type: "url" as const, url: null },
            Demo: { type: "url" as const, url: null },
          },
        },
      ];

      mockQuery.mockResolvedValue({ results: mockResults });

      const projects = await getProjects();

      expect(projects[0].category).toBe("fullstack");
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining("Categoria inválida"),
      );
    });

    it("deve filtrar URLs inválidas", async () => {
      const mockResults = [
        {
          object: "page" as const,
          id: "1",
          properties: {
            Name: { type: "title" as const, title: [{ plain_text: "Projeto" }] as any },
            Descrição: { type: "rich_text" as const, rich_text: [] as any },
            Destaque: { type: "checkbox" as const, checkbox: false },
            Thumbnail: { type: "files" as const, files: [] as any },
            Categoria: { type: "select" as const, select: { name: "fullstack" } as any },
            Tecnologias: { type: "multi_select" as const, multi_select: [] as any },
            Detalhes: { type: "rich_text" as const, rich_text: [] as any },
            Github: { type: "url" as const, url: "invalid-url" },
            Demo: { type: "url" as const, url: "not-a-url" },
          },
        },
      ];

      mockQuery.mockResolvedValue({ results: mockResults });

      const projects = await getProjects();

      expect(projects[0].githubUrl).toBeUndefined();
      expect(projects[0].demoUrl).toBeUndefined();
      expect(console.warn).toHaveBeenCalledTimes(2);
    });

    it("deve ignorar items sem properties", async () => {
      const mockResults = [
        {
          object: "page" as const,
          id: "1",
          // Sem properties
        } as any,
        {
          object: "page" as const,
          id: "2",
          properties: {
            Name: { type: "title" as const, title: [{ plain_text: "Projeto Válido" }] as any },
            Descrição: { type: "rich_text" as const, rich_text: [] as any },
            Destaque: { type: "checkbox" as const, checkbox: false },
            Thumbnail: { type: "files" as const, files: [] as any },
            Categoria: { type: "select" as const, select: { name: "fullstack" } as any },
            Tecnologias: { type: "multi_select" as const, multi_select: [] as any },
            Detalhes: { type: "rich_text" as const, rich_text: [] as any },
            GitHub: { type: "url" as const, url: null },
            Demo: { type: "url" as const, url: null },
          },
        },
      ];

      mockQuery.mockResolvedValue({ results: mockResults });

      const projects = await getProjects();

      expect(projects).toHaveLength(1);
      expect(projects[0].name).toBe("Projeto Válido");
      expect(console.warn).toHaveBeenCalledWith("⚠ Item ignorado: sem properties");
    });

    it("deve ignorar items com tipo de objeto inválido", async () => {
      const mockResults = [
        {
          object: "invalid" as any,
          id: "1",
          properties: {},
        },
        {
          object: "page" as const,
          id: "2",
          properties: {
            Name: { type: "title" as const, title: [{ plain_text: "Projeto Válido" }] as any },
            Descrição: { type: "rich_text" as const, rich_text: [] as any },
            Destaque: { type: "checkbox" as const, checkbox: false },
            Thumbnail: { type: "files" as const, files: [] as any },
            Categoria: { type: "select" as const, select: { name: "fullstack" } as any },
            Tecnologias: { type: "multi_select" as const, multi_select: [] as any },
            Detalhes: { type: "rich_text" as const, rich_text: [] as any },
            GitHub: { type: "url" as const, url: null },
            Demo: { type: "url" as const, url: null },
          },
        },
      ];

      mockQuery.mockResolvedValue({ results: mockResults });

      const projects = await getProjects();

      expect(projects).toHaveLength(1);
      expect(projects[0].name).toBe("Projeto Válido");
      expect(console.warn).toHaveBeenCalledWith("⚠ Item ignorado: tipo inválido");
    });

    it("deve retornar array vazio quando não houver resultados", async () => {
      mockQuery.mockResolvedValue({ results: [] });

      const projects = await getProjects();

      expect(projects).toEqual([]);
      expect(console.log).toHaveBeenCalledWith("✓ Total: 0 projetos válidos processados");
    });

    it("deve aceitar data_source como tipo de objeto válido", async () => {
      const mockResults = [
        {
          object: "data_source" as const,
          id: "1",
          properties: {
            Name: { type: "title" as const, title: [{ plain_text: "Data Source Project" }] as any },
            Descrição: { type: "rich_text" as const, rich_text: [] as any },
            Destaque: { type: "checkbox" as const, checkbox: false },
            Thumbnail: { type: "files" as const, files: [] as any },
            Categoria: { type: "select" as const, select: { name: "fullstack" } as any },
            Tecnologias: { type: "multi_select" as const, multi_select: [] as any },
            Detalhes: { type: "rich_text" as const, rich_text: [] as any },
            GitHub: { type: "url" as const, url: null },
            Demo: { type: "url" as const, url: null },
          },
        },
      ];

      mockQuery.mockResolvedValue({ results: mockResults });

      const projects = await getProjects();

      expect(projects).toHaveLength(1);
      expect(projects[0].name).toBe("Data Source Project");
    });
  });

  describe("getProjects em buildtime (Server Component)", () => {
    it("deve funcionar quando chamado em Server Component durante build", async () => {
      const mockResults = [
        {
          object: "page" as const,
          id: "buildtime-1",
          properties: {
            Name: { type: "title" as const, title: [{ plain_text: "Projeto Buildtime" }] as any },
            Descrição: { type: "rich_text" as const, rich_text: [{ plain_text: "Projeto sincronizado durante build" }] as any },
            Destaque: { type: "checkbox" as const, checkbox: true },
            Thumbnail: { type: "files" as const, files: [] as any },
            Categoria: { type: "select" as const, select: { name: "fullstack" } as any },
            Tecnologias: { type: "multi_select" as const, multi_select: [{ name: "Next.js" }] as any },
            Detalhes: { type: "rich_text" as const, rich_text: [] as any },
            GitHub: { type: "url" as const, url: "https://github.com/test" },
            Demo: { type: "url" as const, url: null },
          },
        },
      ];

      mockQuery.mockResolvedValue({ results: mockResults });

      // Simula chamada de Server Component
      const projects = await getProjects();

      expect(projects).toHaveLength(1);
      expect(projects[0].name).toBe("Projeto Buildtime");
      expect(projects[0].technologies).toContain("Next.js");
      expect(projects[0].highlight).toBe(true);
    });

    it("deve lançar erro durante build se API falhar", async () => {
      const apiError = new Error("Notion API is unavailable");
      mockQuery.mockRejectedValue(apiError);

      // Em buildtime, erros devem ser propagados (build falha)
      await expect(getProjects()).rejects.toThrow("Notion API is unavailable");
    });

    it("deve validar que NOTION_API_KEY existe no ambiente", () => {
      // Verifica que variáveis de ambiente estão disponíveis
      // (Next.js carrega .env automaticamente durante build)
      expect(process.env.NOTION_API_KEY).toBeDefined();
      expect(process.env.NOTION_DATASOURCE_ID).toBeDefined();
    });
  });
});
