import { render, screen, within } from "@testing-library/react";
import { Skills } from "@/components/sections/skills";

describe("Skills", () => {
  it("deve renderizar o título principal", () => {
    render(<Skills />);
    const title = screen.getByRole("heading", { name: /^Habilidades$/i });
    expect(title).toBeInTheDocument();
  });

  it("deve renderizar o título de soft skills", () => {
    render(<Skills />);
    const softSkillsTitle = screen.getByRole("heading", {
      name: /Minhas Softs Skills/i,
    });
    expect(softSkillsTitle).toBeInTheDocument();
  });

  it("deve renderizar a section com id 'habilidades'", () => {
    render(<Skills />);
    const section = document.getElementById("habilidades");
    expect(section).toBeInTheDocument();
  });

  describe("Hard Skills - Categorias", () => {
    it("deve renderizar a seção de hard skills", () => {
      render(<Skills />);
      const section = screen.getByLabelText("Categorias de Hard Skills");
      expect(section).toBeInTheDocument();
    });

    it("deve renderizar as categorias de hard skills", () => {
      render(<Skills />);
      const hardSkillsSection = screen.getByLabelText(
        "Categorias de Hard Skills",
      );
      const categories = within(hardSkillsSection).getAllByRole("article");
      expect(categories.length).toBeGreaterThan(0);
    });

    it("deve renderizar a categoria 'Front-End'", () => {
      render(<Skills />);
      const category = screen.getByRole("heading", { name: /^Front-End$/i });
      expect(category).toBeInTheDocument();
    });

    it("deve renderizar a categoria 'Back-End'", () => {
      render(<Skills />);
      const category = screen.getByRole("heading", { name: /^Back-End$/i });
      expect(category).toBeInTheDocument();
    });

    it("deve renderizar a categoria 'Infraestrutura'", () => {
      render(<Skills />);
      const category = screen.getByRole("heading", {
        name: /^Infraestrutura$/i,
      });
      expect(category).toBeInTheDocument();
    });

    it("deve renderizar a categoria 'Ferramentas & Workflows'", () => {
      render(<Skills />);
      const category = screen.getByRole("heading", {
        name: /^Ferramentas & Workflows$/i,
      });
      expect(category).toBeInTheDocument();
    });

    it("deve renderizar o badge de cada skill", () => {
      render(<Skills />);
      const hardSkillsSection = screen.getByLabelText(
        "Categorias de Hard Skills",
      );
      const categories = within(hardSkillsSection).getAllByRole("article");

      categories.forEach((category) => {
        const badges = within(category).getAllByLabelText(/.*/, {
          selector: "[data-slot='badge']",
        }); // Pega qualquer elemento com role "generic" e nome "skill badge" dentro da categoria (que seria a badge)
        expect(badges.length).toBeGreaterThan(0);
      });
    });

    it("deve renderizar o icone na badge de skill", () => {
      render(<Skills />);
      const badge = screen.getAllByLabelText(/.*/i, {
        selector: "[data-slot='badge']",
      })[0];

      const icon = within(badge).getByRole("img", { hidden: true });
      expect(icon).toBeInTheDocument();
    });

    it("deve renderizar o nome da skill na badge", () => {
      render(<Skills />);
      const badge = screen.getAllByLabelText(/.*/i, {
        selector: "[data-slot='badge']",
      })[0];

      expect(badge).toHaveTextContent(/.*/i);
    });
  });

  describe("Soft Skills", () => {
    it("deve renderizar a seção de soft skills", () => {
      render(<Skills />);
      const section = screen.getByRole("article", {
        name: /Minhas Softs Skills/i,
      });
      expect(section).toBeInTheDocument();
    });

    it("deve renderizar os cards de soft skills", () => {
      render(<Skills />);

      const softSkillsSection = screen.getByLabelText(/Minhas Softs Skills/i);

      const softSkillsCards = within(softSkillsSection).getAllByLabelText(/.*/i, {
        selector: "[data-slot='card']",
      });

      expect(softSkillsCards.length).toBeGreaterThan(0);
      expect(softSkillsCards.length).toBe(6);
    });

    it("deve renderizar o icone no card de soft skill", () => {
      render(<Skills />);
      const card = screen.getByLabelText(/Trabalho em Equipe/i);

      const icon = within(card).getByRole("img", { hidden: true });
      expect(icon).toBeInTheDocument();
    });

    it("deve renderizar Trabalho em Equipe", () => {
      render(<Skills />);
      const skill = screen.getByText(/^Trabalho em Equipe$/i);
      expect(skill).toBeInTheDocument();
    });

    it("deve renderizar Resolução de Problemas", () => {
      render(<Skills />);
      const skill = screen.getByText(/^Resolução de Problemas$/i);
      expect(skill).toBeInTheDocument();
    });

    it("deve renderizar Organização", () => {
      render(<Skills />);
      const skill = screen.getByText(/^Organização$/i);
      expect(skill).toBeInTheDocument();
    });

    it("deve renderizar Atenção no Detalhes", () => {
      render(<Skills />);
      const skill = screen.getByText(/^Atenção no Detalhes$/i);
      expect(skill).toBeInTheDocument();
    });

    it("deve renderizar Pensamento Crítico", () => {
      render(<Skills />);
      const skill = screen.getByText(/^Pensamento Crítico$/i);
      expect(skill).toBeInTheDocument();
    });

    it("deve renderizar Aprendizado Contínuo", () => {
      render(<Skills />);
      const skill = screen.getByText(/^Aprendizado Contínuo$/i);
      expect(skill).toBeInTheDocument();
    });
  });
});
