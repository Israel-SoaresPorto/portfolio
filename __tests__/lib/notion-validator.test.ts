import {
  extractTitle,
  extractRichText,
  extractCheckbox,
  extractFileUrl,
  extractSelect,
  extractMultiSelect,
  extractUrl,
  isValidUrl,
  isValidCategory,
  mapCategory,
  parseHighlights,
} from "@/lib/notion/notion-validator";

describe("notion-validator", () => {
  describe("extractTitle", () => {
    it("deve extrair texto de uma propriedade title válida", () => {
      const property = {
        type: "title" as const,
        title: [{ plain_text: "Meu Projeto" }] as any,
      };
      expect(extractTitle(property)).toBe("Meu Projeto");
    });

    it("deve retornar 'Untitled' quando title estiver vazio", () => {
      const property = {
        type: "title" as const,
        title: [] as any,
      };
      expect(extractTitle(property)).toBe("Untitled");
    });

    it("deve remover espaços em branco", () => {
      const property = {
        type: "title" as const,
        title: [{ plain_text: "  Projeto  " }] as any,
      };
      expect(extractTitle(property)).toBe("Projeto");
    });

    it("deve retornar 'Untitled' para tipo errado", () => {
      const property = {
        type: "rich_text" as const,
        rich_text: [] as any,
      };
      expect(extractTitle(property)).toBe("Untitled");
    });
  });

  describe("extractRichText", () => {
    it("deve extrair texto de rich_text válido", () => {
      const property = {
        type: "rich_text" as const,
        rich_text: [{ plain_text: "Descrição do projeto" }] as any,
      };
      expect(extractRichText(property)).toBe("Descrição do projeto");
    });

    it("deve retornar string vazia quando rich_text estiver vazio", () => {
      const property = {
        type: "rich_text" as const,
        rich_text: [] as any,
      };
      expect(extractRichText(property)).toBe("");
    });

    it("deve remover espaços em branco", () => {
      const property = {
        type: "rich_text" as const,
        rich_text: [{ plain_text: "  Descrição  " }] as any,
      };
      expect(extractRichText(property)).toBe("Descrição");
    });
  });

  describe("extractCheckbox", () => {
    it("deve retornar true quando checkbox estiver marcado", () => {
      const property = {
        type: "checkbox" as const,
        checkbox: true as any,
      };
      expect(extractCheckbox(property)).toBe(true);
    });

    it("deve retornar false quando checkbox estiver desmarcado", () => {
      const property = {
        type: "checkbox" as const,
        checkbox: false as any,
      };
      expect(extractCheckbox(property)).toBe(false);
    });

    it("deve retornar false para tipo errado", () => {
      const property = {
        type: "title" as const,
        title: [] as any,
      };
      expect(extractCheckbox(property)).toBe(false);
    });
  });

  describe("extractFileUrl", () => {
    it("deve extrair URL de arquivo externo", () => {
      const property = {
        type: "files" as const,
        files: [
          {
            type: "external" as const,
            external: { url: "https://example.com/image.png" },
          },
        ] as any,
      };
      expect(extractFileUrl(property)).toBe("https://example.com/image.png");
    });

    it("deve extrair URL de arquivo hospedado", () => {
      const property = {
        type: "files" as const,
        files: [
          {
            type: "file" as const,
            file: { url: "https://notion.so/image.png" },
          },
        ] as any,
      };
      expect(extractFileUrl(property)).toBe("https://notion.so/image.png");
    });

    it("deve retornar undefined quando files estiver vazio", () => {
      const property = {
        type: "files" as const,
        files: [] as any,
      };
      expect(extractFileUrl(property)).toBeUndefined();
    });

    it("deve retornar undefined para tipo errado", () => {
      const property = {
        type: "title" as const,
        title: [] as any,
      };
      expect(extractFileUrl(property)).toBeUndefined();
    });
  });

  describe("extractSelect", () => {
    it("deve extrair nome de select válido", () => {
      const property = {
        type: "select" as const,
        select: { name: "fullstack" } as any,
      };
      expect(extractSelect(property)).toBe("fullstack");
    });

    it("deve retornar null quando select estiver vazio", () => {
      const property = {
        type: "select" as const,
        select: null as any,
      };
      expect(extractSelect(property)).toBeNull();
    });

    it("deve retornar null para tipo errado", () => {
      const property = {
        type: "title" as const,
        title: [] as any,
      };
      expect(extractSelect(property)).toBeNull();
    });
  });

  describe("extractMultiSelect", () => {
    it("deve extrair array de nomes de multi_select", () => {
      const property = {
        type: "multi_select" as const,
        multi_select: [
          { name: "React" },
          { name: "TypeScript" },
          { name: "Node.js" },
        ] as any,
      };
      expect(extractMultiSelect(property)).toEqual([
        "React",
        "TypeScript",
        "Node.js",
      ]);
    });

    it("deve retornar array vazio quando multi_select estiver vazio", () => {
      const property = {
        type: "multi_select" as const,
        multi_select: [] as any,
      };
      expect(extractMultiSelect(property)).toEqual([]);
    });

    it("deve retornar array vazio para tipo errado", () => {
      const property = {
        type: "title" as const,
        title: [] as any,
      };
      expect(extractMultiSelect(property)).toEqual([]);
    });
  });

  describe("extractUrl", () => {
    it("deve extrair URL válida", () => {
      const property = {
        type: "url" as const,
        url: "https://github.com/user/repo" as any,
      };
      expect(extractUrl(property)).toBe("https://github.com/user/repo");
    });

    it("deve retornar undefined quando url for null", () => {
      const property = {
        type: "url" as const,
        url: null as any,
      };
      expect(extractUrl(property)).toBeUndefined();
    });

    it("deve retornar undefined para tipo errado", () => {
      const property = {
        type: "title" as const,
        title: [] as any,
      };
      expect(extractUrl(property)).toBeUndefined();
    });
  });

  describe("isValidUrl", () => {
    it("deve validar URLs corretas", () => {
      expect(isValidUrl("https://example.com")).toBe(true);
      expect(isValidUrl("http://localhost:3000")).toBe(true);
      expect(isValidUrl("https://github.com/user/repo")).toBe(true);
    });

    it("deve rejeitar URLs inválidas", () => {
      expect(isValidUrl("not-a-url")).toBe(false);
      expect(isValidUrl("")).toBe(false);
      expect(isValidUrl("invalid url with spaces")).toBe(false);
    });
  });

  describe("isValidCategory", () => {
    it("deve validar categorias corretas", () => {
      expect(isValidCategory("fullstack")).toBe(true);
      expect(isValidCategory("infra")).toBe(true);
      expect(isValidCategory("automation")).toBe(true);
    });

    it("deve rejeitar categorias inválidas", () => {
      expect(isValidCategory("backend")).toBe(false);
      expect(isValidCategory("")).toBe(false);
      expect(isValidCategory("FULLSTACK")).toBe(false);
    });
  });

  describe("parseHighlights", () => {
    it("deve separar texto por vírgulas", () => {
      const text = "Item 1, Item 2, Item 3";
      expect(parseHighlights(text)).toEqual(["Item 1", "Item 2", "Item 3"]);
    });

    it("deve remover espaços em branco extras", () => {
      const text = "  Item 1  ,  Item 2  ,  Item 3  ";
      expect(parseHighlights(text)).toEqual(["Item 1", "Item 2", "Item 3"]);
    });

    it("deve filtrar itens vazios", () => {
      const text = "Item 1,, Item 2,  , Item 3";
      expect(parseHighlights(text)).toEqual(["Item 1", "Item 2", "Item 3"]);
    });

    it("deve retornar array vazio para string vazia", () => {
      expect(parseHighlights("")).toEqual([]);
      expect(parseHighlights("   ")).toEqual([]);
    });

    it("deve tratar um único item sem vírgula", () => {
      expect(parseHighlights("Item único")).toEqual(["Item único"]);
    });
  });

  describe("mapCategory", () => {
    it("deve mapear categorias em português para códigos internos", () => {
      expect(mapCategory("Infraestrutura")).toBe("infra");
      expect(mapCategory("infraestrutura")).toBe("infra");
      expect(mapCategory("infra")).toBe("infra");
      
      expect(mapCategory("Full Stack")).toBe("fullstack");
      expect(mapCategory("full stack")).toBe("fullstack");
      expect(mapCategory("fullstack")).toBe("fullstack");
      
      expect(mapCategory("Automação")).toBe("automation");
      expect(mapCategory("automação")).toBe("automation");
      expect(mapCategory("automation")).toBe("automation");
    });

    it("deve retornar null para categorias inválidas", () => {
      expect(mapCategory("Categoria Inválida")).toBeNull();
      expect(mapCategory("")).toBeNull();
      expect(mapCategory("outra coisa")).toBeNull();
    });
  });
});
