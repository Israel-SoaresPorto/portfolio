import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home", () => {
  it("deve renderizar o elemento main", () => {
    render(<Home />);
    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
  });

  it("deve renderizar a seção Hero", () => {
    render(<Home />);
    const heroSection = screen.getByText(/Olá, eu sou/i);
    expect(heroSection).toBeInTheDocument();
  });

  it("deve renderizar a seção Sobre", () => {
    render(<Home />);
    const aboutSection = screen.getByText(/Sobre Mim/i);
    expect(aboutSection).toBeInTheDocument();
  });

  it("deve renderizar a seção Habilidades", () => {
    render(<Home />);
    const habilidadesSection = screen.getByText(/Minhas Habilidades/i);
    expect(habilidadesSection).toBeInTheDocument();
  });

  it("deve renderizar a seção Projetos", () => {
    render(<Home />);
    const projetosSection = screen.getByRole("heading", {
      name: /Projetos/i,
    });

    expect(projetosSection).toBeInTheDocument();
  });

  it("deve renderizar a seção Contato", () => {
    render(<Home />);
    const contatoSection = screen.getByText(/Entre em Contato/i);
    expect(contatoSection).toBeInTheDocument();
  });
});