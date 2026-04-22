import { Outlet } from "react-router-dom";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import { useTheme } from "../../hooks/useTheme";

export default function Layout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="relative min-h-screen flex flex-col bg-bg text-content transition-colors duration-300">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="relative z-10 flex-1 max-w-5xl w-full mx-auto px-12 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}