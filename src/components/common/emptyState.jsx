export default function EmptyState({
  title = "Nothing here yet",
  message = "Create your first note to get started.",
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center px-6">
      <span className="w-3 h-3 bg-[#FFC400] inline-block" />
      <h3 className="text-base font-semibold text-black dark:text-white">{title}</h3>
      <p className="text-sm text-black/50 dark:text-white/50 max-w-xs">{message}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-2 text-xs font-semibold uppercase tracking-widest bg-black dark:bg-white text-white dark:text-black px-4 py-2 hover:bg-[#FFC400] hover:text-black transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
