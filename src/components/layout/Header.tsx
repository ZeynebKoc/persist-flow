import { Link, NavLink } from "react-router-dom";
import { HeaderProps } from "../../types/todo.types";

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

export default function Header({ theme, toggleTheme }: HeaderProps) {
  return (
    <header className="border-b border-border bg-bg dark:bg-bg backdrop-blur-md sticky top-0 z-10 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-12 h-16 flex items-center justify-between">

        <Link to="/" className="font-display font-extrabold text-xl md:text-3xl tracking-tight text-content">
          task<span className="text-accent">flow</span>
        </Link>

        <nav className="flex items-center gap-6">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `text-sm md:text-lg transition-colors ${isActive ? "text-content font-medium" : "text-muted2 hover:text-content"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/todos"
            className={({ isActive }) =>
              `text-sm md:text-lg transition-colors ${isActive ? "text-content font-medium" : "text-muted hover:text-content"
              }`
            }
          >
            Todos
          </NavLink>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center rounded-md text-muted2 hover:text-content hover:bg-surface2 transition-colors"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
        </nav>
      </div>
    </header>
  );
}