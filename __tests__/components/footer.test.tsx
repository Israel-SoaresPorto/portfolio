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
  
  it("deve ter o texto 'Feito com dedicação e muito código'", () => {
    render(<Footer />);
    const dedicationText = screen.getByText(/Feito com dedicação e muito código/i);
    expect(dedicationText).toBeInTheDocument();
  });
});
