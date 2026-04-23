import { EmptyStateProps } from "../../types/todo.types";

export function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-12 h-12 rounded-2xl bg-surface2 border border-border2 flex items-center justify-center mb-4">
        <div className="w-5 h-5 text-muted2">{icon}</div>
      </div>
        <p className="text-sm font-medium text-content mb-1">{title}</p>
        {description && (
      <p className="text-xs text-muted2">{description}</p>
      )}    
    </div>
  );
}
