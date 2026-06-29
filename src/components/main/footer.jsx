export default function Footer() {
  return (
    <footer className="border-t border-black/10 dark:border-white/10 bg-white dark:bg-[#121212] mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-[#FFC400] inline-block" />
            <span className="font-bold text-sm tracking-tight text-black dark:text-white">
              NOTES.
            </span>
          </div>
          <p className="text-xs text-black/50 dark:text-white/50 max-w-xs">
            A fast, focused notes workspace. Built with the MERN stack for the ITI Full Stack program.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-black/40 dark:text-white/40 mb-3">
            Resources
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="http://localhost:5000/api-docs"
                target="_blank"
                rel="noreferrer"
                className="text-black/70 dark:text-white/70 hover:text-[#FFC400] transition-colors"
              >
                API Docs (Swagger)
              </a>
            </li>
            <li>
              <a
                href="https://www.postman.com/contech-team/notes-app-iti-api-docs"
                target="_blank"
                rel="noreferrer"
                className="text-black/70 dark:text-white/70 hover:text-[#FFC400] transition-colors"
              >
                Postman Collection
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-black/40 dark:text-white/40 mb-3">
            Source
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://github.com/ibrahim99035/MERN-ITI-NotesClient"
                target="_blank"
                rel="noreferrer"
                className="text-black/70 dark:text-white/70 hover:text-[#FFC400] transition-colors"
              >
                Client repo
              </a>
            </li>
            <li>
              <a
                href="https://github.com/ibrahim99035/MERN-ITI-NotesServer"
                target="_blank"
                rel="noreferrer"
                className="text-black/70 dark:text-white/70 hover:text-[#FFC400] transition-colors"
              >
                Server repo
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-black/10 dark:border-white/10 px-6 py-4">
        <p className="text-xs text-black/40 dark:text-white/40">
          © {new Date().getFullYear()} Notes — ITI Full Stack Project.
        </p>
      </div>
    </footer>
  );
}
