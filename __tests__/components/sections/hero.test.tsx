import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/sections/hero";

describe("Hero", () => {
  it("deve renderizar o titulo principal", () => {
    render(<Hero />);
    const title = screen.getByRole("heading");
    expect(title).toBeInTheDocument();
  });

  it("deve renderizar o nome no titulo", () => {
    render(<Hero />);
    const nameElement = screen.getByRole("heading");
    expect(nameElement).toHaveTextContent("Israel Soares Porto");
  });

  it("deve renderizar o badge", () => {
    render(<Hero />);
    const badge = screen.getByText(/Disponivel para oportunidades/i);
    expect(badge).toBeInTheDocument();
  });

  it("deve renderizar o subtitulo", () => {
    render(<Hero />);
    const subtitle = screen.getByText(/Desenvolvedor Full-Stack/i);
    expect(subtitle).toBeInTheDocument();
  });

  it("deve renderizar o botão de ver projetos", () => {
    render(<Hero />);
    const projectsButton = screen.getByRole("button", { name: /Ver Projetos/i });
    expect(projectsButton).toBeInTheDocument();
  });

  it("deve renderizar o botão de baixar CV", () => {
    render(<Hero />);
    const downloadButton = screen.getByRole("link", { name: /Baixar CV/i });
    expect(downloadButton).toBeInTheDocument();
  });
});
