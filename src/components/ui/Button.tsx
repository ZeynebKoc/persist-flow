import { ButtonProps } from "../../types/todo.types";

export function AddNewTaskButton({ buttonName, onClick, icon }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2.5 bg-accent text-bg font-semibold text-sm rounded-xl hover:opacity-70 active:scale-80 transition-all duration-200 whitespace-nowrap"
    >
      <span className="w-4 h-4">{icon}</span>
      {buttonName}
    </button>
  );
}

