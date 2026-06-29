import { useEffect } from "react";

export default function Modal({ isOpen, onClose, title, children, footer }) {
  // close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white dark:bg-[#1c1c1c] border border-black/10 dark:border-white/10 shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 px-5 py-4">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-black dark:text-white">
            {title}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white text-lg leading-none"
          >
            ×
          </button>
        </div>

        <div className="px-5 py-5 text-sm text-black/70 dark:text-white/70">
          {children}
        </div>

        {footer && (
          <div className="flex items-center justify-end gap-3 border-t border-black/10 dark:border-white/10 px-5 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
