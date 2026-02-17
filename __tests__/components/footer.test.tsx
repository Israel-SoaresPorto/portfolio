import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/footer";

describe("Footer", () => {
  it("deve renderizar o componente footer", () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector("footer");
    expect(footer).toBeInTheDocument();
  });

  it("deve renderizar o copyright", () => {
    render(<Footer />);
    const copyright = screen.getByText(/Israel Soares Porto/i);
    expect(copyright).toBeInTheDocument();
    expect(copyright).toHaveTextContent("Todos os direitos reservados");
  });

  it("deve exibir o ano atual no copyright", () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    const copyright = screen.getByText(new RegExp(currentYear.toString()));
    expect(copyright).toBeInTheDocument();
  });
  
  it("deve renderizar todos os 5 links de navegação", () => {
    render(<Footer />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(5);
  });
  
  it("deve renderizar o link de Início", () => {
    render(<Footer />);
    const homeLink = screen.getByRole("link", { name: /Início/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "#home");
  });

  it("deve renderizar o link de Sobre", () => {
    render(<Footer />);
    const aboutLink = screen.getByRole("link", { name: /Sobre/i });
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute("href", "#sobre");
  });

  it("deve renderizar o link de Habilidades", () => {
    render(<Footer />);
    const skillsLink = screen.getByRole("link", { name: /Habilidades/i });
    expect(skillsLink).toBeInTheDocument();
    expect(skillsLink).toHaveAttribute("href", "#habilidades");
  });

  it("deve renderizar o link de Projetos", () => {
    render(<Footer />);
    const projectsLink = screen.getByRole("link", { name: /Projetos/i });
    expect(projectsLink).toBeInTheDocument();
    expect(projectsLink).toHaveAttribute("href", "#projetos");
  });

  it("deve renderizar o link de Contato", () => {
    render(<Footer />);
    const contactLink = screen.getByRole("link", { name: /Contato/i });
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute("href", "#contato");
  });

});
