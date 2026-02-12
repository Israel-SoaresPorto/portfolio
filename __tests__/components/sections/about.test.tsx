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
    const description = screen.getByText(/Sou estudande de Sistemas de Informação/i);
    expect(description).toBeInTheDocument();
  });

  it("deve renderizar a foto de perfil", () => {
    render(<About />);
    const profileImage = screen.getByRole("img", { name: /Foto de perfil de Israel Soares Porto/i });
    expect(profileImage).toBeInTheDocument();
  });

  it("deve renderizar o card de 'Aprendizado Contínuo'", () => {
    render(<About />);
    const learningCharacteristic = screen.getByRole("heading", { name: /Aprendizado Contínuo/i });
    expect(learningCharacteristic).toBeInTheDocument();
  });

  it("deve renderizar o texto da característica de 'Aprendizado Contínuo'", () => {
    render(<About />);
    const learningDescription = screen.getByText(/Encaro cada nova tecnologia como um desafio a ser vencido/i);
    expect(learningDescription).toBeInTheDocument();
  });

  it("deve renderizar o card de 'Resolução de Problemas'", () => {
    render(<About />);
    const problemSolvingCharacteristic = screen.getByRole("heading", { name: /Resolução de Problemas/i });
    expect(problemSolvingCharacteristic).toBeInTheDocument();
  });

  it("deve renderizar o texto da característica de 'Resolução de Problemas'", () => {
    render(<About />);
    const problemSolvingDescription = screen.getByText(/Minha abordagem não é apenas "fazer funcionar", mas entender o porquê/i);
    expect(problemSolvingDescription).toBeInTheDocument();
  });

  it("deve renderizar as característica de 'Melhoria Contínua'", () => {
    render(<About />);
    const continuousImprovementCharacteristic = screen.getByRole("heading", { name: /Melhoria Contínua/i });
    expect(continuousImprovementCharacteristic).toBeInTheDocument();
  });

  it("deve renderizar o texto da característica de 'Melhoria Contínua'", () => {
    render(<About />);
    const continuousImprovementDescription = screen.getByText(/Busco diariamente aprimorar não apenas minhas competências técnicas em código e nuvem, mas também minhas habilidades comportamentais/i);
    expect(continuousImprovementDescription).toBeInTheDocument();
  });
});