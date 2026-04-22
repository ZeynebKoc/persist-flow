import { Link, NavLink } from "react-router-dom";
import { HeaderProps } from "../../types/todo.types";
import { SunIcon, MoonIcon } from "../icons";

export default function Header({ theme, toggleTheme }: HeaderProps) {
  return (
    <header className="border-b border-border bg-bg dark:bg-bg backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
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