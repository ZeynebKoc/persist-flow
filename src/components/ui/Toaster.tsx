import { useToastStore } from "../../store/toastStore";
import { DotIcon } from "../icons";

export function Toaster() {
  const { toasts, dismiss } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-6 right-12 z-[100] gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          onClick={() => dismiss(toast.id)}
          className={`
            flex items-center gap-3 px-4 py-3 rounded-xl border border-border shadow-lg
            cursor-pointer text-sm md:text-base font-medium min-w-[220px] max-w-[320px]
            transition-all duration-200 animate-in slide-in-from-bottom-2
            ${toast.type === "success" ? "bg-green-700 border-border text-content" : ""}
            ${toast.type === "error" ? "bg-red-700 border-border text-content" : ""}
            ${toast.type === "info" ? "bg-blue-700 border-border text-content" : ""}
          `}
        >
          <span className="flex-shrink-0">
            {toast.type === "success" && <DotIcon className="w-2 h-2 text-green" />}
            {toast.type === "error" && <DotIcon className="w-2 h-2 text-red" />}
            {toast.type === "info" && <DotIcon className="w-2 h-2 text-blue" />}
          </span>
          {toast.message}
        </div>
      ))}
    </div>
  );
}
