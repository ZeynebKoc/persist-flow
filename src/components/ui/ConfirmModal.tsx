import { useEffect } from "react";

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
}

export function ConfirmModal({ open, onClose, onConfirm, title, description }: ConfirmModalProps) {
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
        if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* BACKDROP */}
      <div onClick={onClose} className="absolute inset-0 bg-black/40 backdrop-blur-sm"/>

      {/* MODAL */}
      <div className="relative w-full max-w-xs md:max-w-sm rounded-2xl bg-surface border border-border shadow-xl p-5 animate-in fade-in zoom-in-95">
        <h2 className="text-sm text-content mb-2">{title}</h2>
        <p className="text-xs text-muted2 mb-4">{description}</p>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1.5 text-sm rounded-lg border border-border bg-surface2 text-content hover:bg-surface transition">
            Cancel
          </button>

          <button onClick={onConfirm} className="px-3 py-1.5 text-sm rounded-lg bg-red-500 text-white hover:bg-red-700 transition">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}