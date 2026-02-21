import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-secondary/10 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 py-8">
        <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            &copy; {currentYear} Israel Soares Porto. Todos os direitos
            reservados.
          </p>

          <div className="flex gap-6">
            <Link
              href="#home"
              className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-zinc-100 transition-colors"
            >
              Início
            </Link>
            <Link
              href="#sobre"
              className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-zinc-100 transition-colors"
            >
              Sobre
            </Link>
            <Link
              href="#habilidades"
              className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-zinc-100 transition-colors"
            >
              Habilidades
            </Link>
            <Link
              href="#projetos"
              className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-zinc-100 transition-colors"
            >
              Projetos
            </Link>
            <Link
              href="#contato"
              className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-zinc-100 transition-colors"
            >
              Contato
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
