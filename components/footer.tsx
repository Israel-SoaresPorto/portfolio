export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-secondary/10 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 py-8">
        <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-8">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center sm:text-left">
            &copy; {currentYear} Israel Soares Porto. Todos os direitos
            reservados.
          </p>

          <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center sm:text-right">
            Feito com dedicação e muito código.
          </p>
        </div>
      </div>
    </footer>
  );
}
