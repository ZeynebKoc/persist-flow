import { options, PriorityValue } from "../../config/filterConfig";
import { TaskPriority } from "../../types/todo.types";

interface PriorityFilterProps {
  value: PriorityValue;
  onChange: (value: PriorityValue) => void;
}

export function PriorityFilter({ value, onChange }: PriorityFilterProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as TaskPriority | "all")}
      className="bg-surface border border-border rounded-xl px-3 py-2.5 text-sm text-muted2 outline-none cursor-pointer hover:border-border2 transition-colors duration-200 min-w-[130px]"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}