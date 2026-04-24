import { useState, useRef, useEffect, memo } from "react";
import { Todo } from "../../types/todo.types";
import { useTodoStore } from "../../store/todoStore";
import { formatDate } from "../../utils/formatDate";
import { PencilIcon, TrashIcon, DotsIcon, RestoreIcon } from "../icons/index";
import { useSearchParams } from "react-router-dom";
import { statusConfig, priorityConfig } from "../../config/todoCardConfig";

interface TodoCardProps {
  todo: Todo;
  isTrash?: boolean;
  onDeleteRequest: (id: string, permanent: boolean) => void;
}

export const TodoCard = memo(function TodoCard({
  todo,
  isTrash = false,
  onDeleteRequest,
}: TodoCardProps) {
  const { restoreTodo } = useTodoStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [, setSearchParams] = useSearchParams();

  const status = statusConfig[todo.status];
  const priority = priorityConfig[todo.priority];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleEdit() {
    setMenuOpen(false);
    setSearchParams({ edit: todo.id });
  }

  function handleDelete() {
    setMenuOpen(false);
    onDeleteRequest(todo.id, false);
  }

  function handlePermanentDelete() {
    setMenuOpen(false);
    onDeleteRequest(todo.id, true);
  }

  function handleRestore() {
    setMenuOpen(false);
    restoreTodo(todo.id);
  }

  return (
    <div
      className={`hover:border-border2 hover:bg-surface2 ${status.hover} relative flex flex-col sm:flex-row sm:items-center gap-3 bg-surface border border-border rounded-r-xl px-4 py-3 transition-colors duration-200 group`}
    >
      {/* LEFT BORDER */}
      <div className={`absolute left-0 top-0 bottom-0 w-[4px] ${status.borderClass}`} />

      {/* LEFT SIDE */}
      <div className="flex-1 min-w-0 pl-3">
        <p className="text-sm font-medium truncate text-content">{todo.title}</p>
        <p className="text-xs text-muted2 font-light truncate mt-1">{todo.description}</p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap sm:justify-end">

        {/* STATUS */}
        <div className={`h-7 min-w-[80px] px-1 flex items-center justify-center rounded-full text-[0.7rem] font-semibold ${status.pillClass}`}>
          {status.label}
        </div>

        {/* PRIORITY */}
        <div className="flex items-center gap-1 h-7 min-w-[70px] justify-center">
          <div className={`w-2 h-2 rounded-full ${priority.dotClass}`} />
          <span className="text-[0.7rem] text-muted2 leading-none">{priority.label}</span>
        </div>

        {/* DATE */}
        <div className="flex flex-col leading-tight text-right min-w-[4rem]">
          <span className="text-[10px] text-muted2">Updated</span>
          <span className="text-[11px] text-muted2">{formatDate(todo.updatedAt)}</span>
        </div>

        {/* MENU */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-border bg-surface2 text-muted2 hover:border-border2 hover:text-content transition-colors duration-200"
          >
            <DotsIcon className="w-4 h-4" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-9 z-50 w-44 bg-surface2 border border-border2 rounded-xl shadow-xl">
              {isTrash ? (
                <>
                  <button
                    onClick={handleRestore}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-content hover:text-blue-400 transition-colors"
                  >
                    <RestoreIcon className="w-4 h-4" />
                    Restore
                  </button>
                  <button
                    onClick={handlePermanentDelete}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-content hover:text-red-500 transition-colors"
                  >
                    <TrashIcon className="w-4 h-4" />
                    Delete Forever
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleEdit}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-content hover:text-orange-400 transition-colors"
                  >
                    <PencilIcon className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-content hover:text-red-500 transition-colors"
                  >
                    <TrashIcon className="w-4 h-4" />
                    Delete
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
})