import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TaskPriority, TaskStatus, Todo } from "../../types/todo.types";
import { useTodoStore } from "../../store/todoStore";
import { statusOptions, priorityOptions } from "../../config/todoConfig";
import CancelIcon from "../icons/CancelIcon";

interface TodoModalProps {
  mode: "add" | "edit";
  todo?: Todo;
  modalTitle: string;
  buttonLabel: string;
  onClose: () => void;
}

interface FormState {
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
}

export function TodoModal({ mode, todo, modalTitle, buttonLabel, onClose }: TodoModalProps) {
  const { addTodo, updateTodo } = useTodoStore();
  const [, setSearchParams] = useSearchParams();

  const isEdit = mode === "edit";

  const [form, setForm] = useState<FormState>({
    title: todo?.title ?? "",
    description: todo?.description ?? "",
    priority: todo?.priority ?? TaskPriority.MEDIUM,
    status: todo?.status ?? TaskStatus.TODO,
  });

  const [error, setError] = useState("");

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  function handleClose() {
    setSearchParams({});
    onClose();
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setError("");
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit() {
    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }

    if (isEdit && todo) {
      updateTodo(todo.id, {
        title: form.title.trim(),
        description: form.description.trim(),
        priority: form.priority,
        status: form.status,
      });
    } else {
      addTodo(form.title.trim(), form.description.trim(), form.priority);
    }

    handleClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-[460px] mt-16 max-h-[90vh] overflow-y-auto bg-bg border border-border2 rounded-2xl p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-7">
          <h2 className="font-display font-extrabold text-xl md:text-2xl text-content">
            {modalTitle}
          </h2>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-border2 text-muted2 hover:border-content hover:text-content transition-all duration-200"
          >
            <CancelIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-xs md:text-sm font-medium text-muted2 mb-1.5">
            Title <span className="text-red-600">*</span>
          </label>
          <textarea
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="What needs to be done?"
            rows={2}
            className="w-full bg-surface2 border border-border2 rounded-xl px-4 py-2.5 text-sm text-content placeholder:text-muted outline-none focus:border-accent/40 transition-colors duration-200 resize-none"
          />
          {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-xs md:text-sm font-medium text-muted2 mb-1.5">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Optional details..."
            rows={3}
            className="w-full bg-surface2 border border-border2 rounded-xl px-4 py-2.5 text-sm text-content placeholder:text-muted outline-none focus:border-accent/40 transition-colors duration-200 resize-none max-h-40 overflow-y-auto"
          />
        </div>

        {/* Status + Priority */}
        <div className="grid grid-cols-2 gap-3 mb-6">

          {/* Status */}
          {isEdit && (
            <div>
              <label className="block text-xs md:text-sm font-medium text-muted2 mb-1.5">
                Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full bg-surface2 border border-border2 rounded-xl px-3 py-2.5 text-sm text-content outline-none focus:border-accent/40 transition-colors duration-200 cursor-pointer"
              >
                {statusOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Priority */}
          <div className={isEdit ? "" : "col-span-2"}>
            <label className="block text-xs md:text-sm font-medium text-muted2 mb-1.5">
              Priority
            </label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full bg-surface2 border border-border2 rounded-xl px-3 py-2.5 text-sm text-content outline-none focus:border-accent/40 transition-colors duration-200 cursor-pointer"
            >
              {priorityOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 justify-end">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-xs md:text-sm font-medium rounded-xl border border-border2 text-muted2 hover:text-content transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 text-xs md:text-sm font-semibold rounded-xl bg-accent text-bg hover:opacity-80 transition-all duration-200"
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
}