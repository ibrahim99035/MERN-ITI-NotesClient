import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

export default function Pagination({ pagination, onPageChange }) {
  if (!pagination || pagination.totalPages <= 1) return null;

  const { page, totalPages, hasNextPage, hasPrevPage } = pagination;

  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, page - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages, start + maxVisible - 1);
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-1.5 pt-8 pb-4">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={!hasPrevPage}
        className="p-2 border border-black/10 dark:border-white/10 text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:border-black/30 dark:hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <HiOutlineChevronLeft size={16} />
      </button>

      {start > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="w-8 h-8 text-xs border border-transparent text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:border-black/20 dark:hover:border-white/20 transition-colors"
          >
            1
          </button>
          {start > 2 && (
            <span className="w-8 h-8 flex items-center justify-center text-xs text-black/30 dark:text-white/30">
              …
            </span>
          )}
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-8 h-8 text-xs font-semibold transition-colors ${
            p === page
              ? "bg-black dark:bg-white text-white dark:text-black"
              : "border border-black/10 dark:border-white/10 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:border-black/30 dark:hover:border-white/30"
          }`}
        >
          {p}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && (
            <span className="w-8 h-8 flex items-center justify-center text-xs text-black/30 dark:text-white/30">
              …
            </span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="w-8 h-8 text-xs border border-transparent text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:border-black/20 dark:hover:border-white/20 transition-colors"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={!hasNextPage}
        className="p-2 border border-black/10 dark:border-white/10 text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:border-black/30 dark:hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <HiOutlineChevronRight size={16} />
      </button>
    </div>
  );
}
