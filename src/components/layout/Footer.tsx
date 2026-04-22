import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="border-t border-border">
            <div className="max-w-5xl mx-auto px-12 h-14 flex items-center justify-between">
                <Link to="/" className="font-display font-extrabold text-base md:text-lg tracking-tight text-content">
                    task<span className="text-accent">flow</span>
                </Link>
                <p className="text-xs md:text-sm text-muted2">© 2026 Zeyneb Koç</p>
            </div>
        </footer>
    );
}