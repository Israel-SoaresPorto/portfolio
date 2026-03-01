"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { SiGithub as Github } from "@icons-pack/react-simple-icons";
import { cn } from "@/lib/utils";
import Linkedin from "./icons/linkedin";

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#sobre", label: "Sobre" },
  { href: "#habilidades", label: "Habilidades" },
  { href: "#projetos", label: "Projetos" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn("fixed top-0 left-0 right-0 z-50", [
        isMenuOpen ? "bg-background" : "",
      ])}
    >
      <div
        className={cn(
          "flex h-16 items-center justify-between px-4 md:px-6 mx-auto",
          isScrolled
            ? "bg-background/90 shadow-md backdrop-blur-md"
            : "backdrop-blur-sm",
        )}
      >
        {/* Logo */}
        <Link
          href="#home"
          className="text-xl font-semibold text-zinc-900 transition-colors hover:text-primary dark:text-zinc-50 dark:hover:text-primary"
        >
          Israel Soares
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-primary focus:outline-none"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Social Links & Theme Toggle */}
        <div className="flex items-center gap-4">
          <Link
            href="https://www.linkedin.com/in/israel-soares-porto/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hidden xs:inline-block hover:text-primary"
          >
            <Linkedin className="size-4" />
          </Link>

          <Link
            href="https://github.com/Israel-SoaresPorto"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hidden xs:inline-block hover:text-primary"
          >
            <Github className="size-4" />
          </Link>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="hover:text-primary cursor-pointer"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden hover:text-primary cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="w-full place-items-center border-t border-zinc-200 bg-background/80 lg:hidden">
          <nav className="w-[95%] flex flex-col gap-4 px-4 md:px-6 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex gap-4 pt-2 sm:hidden">
              <Link
                href="https://www.linkedin.com/in/israel-soares-porto/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-primary"
              >
                <Linkedin className="size-4" />
              </Link>

              <Link
                href="https://github.com/Israel-SoaresPorto"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="hover:text-primary"
              >
                <Github className="size-4" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
