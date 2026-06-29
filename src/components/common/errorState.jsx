import { getErrorInfo } from "../../utils/errorMessages";

export default function ErrorState({ status, onRetry }) {
  const { title, message } = getErrorInfo(status);

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center px-6">
      <span className="w-3 h-3 bg-red-500 inline-block" />
      <h3 className="text-base font-semibold text-black dark:text-white">{title}</h3>
      <p className="text-sm text-black/50 dark:text-white/50 max-w-xs">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 text-xs font-semibold uppercase tracking-widest border border-black dark:border-white px-4 py-2 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
        >
          Try again
        </button>
      )}
    </div>
  );
}
