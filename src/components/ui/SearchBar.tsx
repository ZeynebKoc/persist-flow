import { useEffect, useRef, useState } from "react";
import SearchIcon from "../icons/SearchIcon";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  debounceMs?: number;
}

export function SearchBar({ value, onChange, debounceMs = 300 }: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setLocalValue(val);

    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => onChange(val), debounceMs);
  }

  return (
    <div className="relative flex-1">
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-muted">
        <SearchIcon className="w-4 h-4 text-content" />
      </span>
      <input
        type="text"
        value={localValue}
        onChange={handleChange}
        placeholder="Search tasks..."
        className="w-full bg-surface border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-content placeholder:text-muted outline-none focus:border-accent/40 transition-colors duration-200"
      />
    </div>
  );
}