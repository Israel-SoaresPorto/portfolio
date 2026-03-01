import { render, screen } from "@testing-library/react";
import { Contact } from "@/components/sections/contact";

describe("Contact", () => {
  it("deve renderizar o título principal", () => {
    render(<Contact />);
    const title = screen.getByRole("heading", { name: /Vamos Conversar\?/i });
    expect(title).toBeInTheDocument();
  });

  it("deve renderizar a descrição", () => {
    render(<Contact />);
    const description = screen.getByText(
      /Estou sempre aberto a novas oportunidades e colaborações em projetos/i,
    );
    expect(description).toBeInTheDocument();
  });

  it("deve renderizar o botão de e-mail", () => {
    render(<Contact />);
    const emailButton = screen.getByRole("link", { name: /E-mail/i });
    expect(emailButton).toBeInTheDocument();
    expect(emailButton).toHaveAttribute(
      "href",
      "mailto:soaresportoisrael@gmail.com",
    );
  });

  it("deve renderizar o botão do Linkedin", () => {
    render(<Contact />);
    const linkedinButton = screen.getByRole("link", { name: /Linkedin/i });
    expect(linkedinButton).toBeInTheDocument();
    expect(linkedinButton).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/israel-soares-porto/",
    );
    expect(linkedinButton).toHaveAttribute("target", "_blank");
    expect(linkedinButton).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("deve renderizar o botão do Github", () => {
    render(<Contact />);
    const githubButton = screen.getByRole("link", { name: /Github/i });
    expect(githubButton).toBeInTheDocument();
    expect(githubButton).toHaveAttribute(
      "href",
      "https://github.com/Israel-SoaresPorto",
    );
    expect(githubButton).toHaveAttribute("target", "_blank");
    expect(githubButton).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("deve renderizar todos os três botões de contato", () => {
    render(<Contact />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(3);
  });

  it("deve ter o id correto na section", () => {
    const { container } = render(<Contact />);
    const section = container.querySelector("section");
    expect(section).toHaveAttribute("id", "contato");
  });
});
