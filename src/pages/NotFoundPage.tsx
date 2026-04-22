import { Link } from "react-router-dom";
import ArrowLeftIcon from "../components/icons/ArrowLeftIcon";

export default function NotFoundPage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center px-4">
      {/* 404 number */}
      <p className="font-display font-extrabold text-[8rem] sm:text-[12rem] leading-none tracking-tighter text-border2 mb-4 select-none">
        404
      </p>

      {/* Divider */}
      <div className="w-12 h-px bg-accent mb-8" />

      {/* Message */}
      <h2 className="font-display font-bold text-xl md:text-2xl text-content mb-3">
        Page not found
      </h2>
      <p className="text-sm md:text-base text-muted2 max-w-sm leading-relaxed mb-10">
        The page you're looking for doesn't exist or has been moved.
        Let's get you back on track.
      </p>

      {/* Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 border border-border2 rounded-full bg-accent text-bg px-5 py-2.5 rounded-xl bg-surface text-content transition-colors duration-200 hover:border-accent hover:text-accent"
      >
        <ArrowLeftIcon />
        Back to Home
      </Link>

    </section>
  );
}