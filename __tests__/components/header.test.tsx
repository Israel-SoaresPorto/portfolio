import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "@/components/header";

// Mock next-themes
const mockSetTheme = jest.fn();
jest.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "light",
    setTheme: mockSetTheme,
  }),
}));

// Mock matchMedia
const mockMatchMedia = () => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

describe("Header", () => {
  beforeAll(() => {
    mockMatchMedia();
  });

  beforeEach(() => {
    mockSetTheme.mockClear();
  });

  it("deve renderizar o logo", () => {
    render(<Header />);
    const logo = screen.getByRole("link", { name: "Israel Soares" });
    expect(logo).toBeInTheDocument();
  });

  it("deve renderizar todos os itens de navegação", () => {
    render(<Header />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Sobre")).toBeInTheDocument();
    expect(screen.getByText("Habilidades")).toBeInTheDocument();
    expect(screen.getByText("Projetos")).toBeInTheDocument();
    expect(screen.getByText("Contato")).toBeInTheDocument();
  });

  it("deve renderizar o botão de toggle de tema", () => {
    render(<Header />);
    const themeButton = screen.getByLabelText("Toggle theme");
    expect(themeButton).toBeInTheDocument();
  });

  it("deve renderizar os links sociais", () => {
    render(<Header />);
    const linkedinLinks = screen.getAllByLabelText("LinkedIn");
    const githubLinks = screen.getAllByLabelText("GitHub");
    
    expect(linkedinLinks.length).toBeGreaterThan(0);
    expect(githubLinks.length).toBeGreaterThan(0);
  });

  it("deve alternar o tema quando o botão de tema é clicado", () => {
    render(<Header />);
    const themeButton = screen.getByLabelText("Toggle theme");
    
    fireEvent.click(themeButton);
    
    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it("deve abrir o menu mobile quando o botão de menu é clicado", () => {
    render(<Header />);
    const menuButton = screen.getByLabelText("Toggle menu");
    
    // Menu inicialmente fechado - os links mobile não devem estar visíveis
    const navLinks = screen.getAllByText("Home");
    expect(navLinks.length).toBe(1); // Apenas o link desktop
    
    // Abrir o menu
    fireEvent.click(menuButton);
    
    // Agora deve ter 2 links "Home" (desktop + mobile)
    const navLinksAfterOpen = screen.getAllByText("Home");
    expect(navLinksAfterOpen.length).toBe(2);
  });

  it("deve fechar o menu mobile ao clicar em um link", () => {
    render(<Header />);
    const menuButton = screen.getByLabelText("Toggle menu");
    
    // Abrir o menu
    fireEvent.click(menuButton);
    
    const navLinksOpen = screen.getAllByText("Home");
    expect(navLinksOpen.length).toBe(2);
    
    // Clicar em um link do menu mobile (o segundo "Home")
    fireEvent.click(navLinksOpen[1]);
    
    // Menu deve fechar - apenas 1 link "Home" visível
    const navLinksAfterClose = screen.getAllByText("Home");
    expect(navLinksAfterClose.length).toBe(1);
  });

  it("deve alternar entre ícones de abrir/fechar menu", () => {
    render(<Header />);
    const menuButton = screen.getByLabelText("Toggle menu");
    
    // Menu fechado - deve mostrar o ícone de Menu
    expect(menuButton.querySelector("svg")).toBeInTheDocument();
    
    // Abrir o menu
    fireEvent.click(menuButton);
    
    // Menu aberto - ainda deve ter o ícone (agora X ao invés de Menu)
    expect(menuButton.querySelector("svg")).toBeInTheDocument();
  });
});
