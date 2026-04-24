import { Link } from "react-router-dom";
import ArrowRightIcon from "../components/icons/ArrowRightIcon";
import { Helmet } from "react-helmet-async";

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home | Persist Flow</title>
        <meta name="description" content="Perseus Flow is a minimal task management app built with React and Zustand." />
      </Helmet>
      <section className="flex flex-col items-center justify-start pt-8 md:pt-16 text-center px-4">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 border border-border rounded-full px-4 py-1.5 mb-6 md:mb-12 bg-border2">
          <span className="text-xs font-medium text-content tracking-wide uppercase">
            Task Management
          </span>
        </div>

        {/* Heading */}
        <h1 className="font-display font-extrabold text-5xl md:text-7xl leading-tight tracking-tight text-content mb-6">
          Manage your tasks{" "}
          <span className="text-accent">intelligently.</span>
        </h1>

        {/* Subheading */}
        <p className="text-sm md:text-base text-muted2 max-w-lg leading-relaxed mb-8 md:mb-12">
          Simple but powerful. Taskflow helps you stay on top of everything —
          without the clutter, without the chaos.
        </p>

        {/* Button */}
        <Link
          to="/todos"
          className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-3 border border-border2 rounded-full bg-accent text-bg transition-opacity duration-200 hover:opacity-50"
        >
          Go to Todos
          <ArrowRightIcon />
        </Link>

      </section>
    </>
  );
}