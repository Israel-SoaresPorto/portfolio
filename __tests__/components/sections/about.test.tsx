import { render, screen } from "@testing-library/react";
import { About } from "@/components/sections/about";

describe("About", () => {
  it("deve renderizar o título da seção", () => {
    render(<About />);
    const title = screen.getByRole("heading", { name: /Sobre Mim/i });
    expect(title).toBeInTheDocument();
  });

  it("deve renderizar a texto de 'Sobre Mim'", () => {
    render(<About />);
    const description = screen.getByText(/Lorem ipsum dolor sit amet consectetur. Leo/i);
    expect(description).toBeInTheDocument();
  });

  it("deve renderizar as características de 'Aprendizado Contínuo' e 'Foco em Resolução de Problemas'", () => {
    render(<About />);
    const learningCharacteristic = screen.getByRole("heading", { name: /Aprendizado Contínuo/i });
    const problemSolvingCharacteristic = screen.getByRole("heading", { name: /Foco em Resolução de Problemas/i });
    expect(learningCharacteristic).toBeInTheDocument();
    expect(problemSolvingCharacteristic).toBeInTheDocument();
  });
});