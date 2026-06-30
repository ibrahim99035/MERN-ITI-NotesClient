import { format } from "date-fns";
import Loader from "../common/loader";
import ErrorState from "../common/errorState";
import EmptyState from "../common/emptyState";

export default function DashboardNotes({ data, isLoading, isError, error, refetch }) {
  if (isLoading) return <Loader label="Loading notes..." />;
  if (isError) return <ErrorState status={error?.response?.status} onRetry={refetch} />;

  const notes = data?.data?.notes || data?.notes || [];
  if (notes.length === 0) return <EmptyState title="No notes yet" />;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-black/10 dark:border-white/10">
            <th className="text-left py-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-black/40 dark:text-white/40">
              Title
            </th>
            <th className="text-left py-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-black/40 dark:text-white/40">
              Author
            </th>
            <th className="text-left py-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-black/40 dark:text-white/40">
              Status
            </th>
            <th className="text-left py-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-black/40 dark:text-white/40">
              Category
            </th>
            <th className="text-left py-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-black/40 dark:text-white/40">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => (
            <tr key={note._id} className="border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              <td className="py-3 px-3">
                <span className="text-sm font-medium text-black dark:text-white">
                  {note.isPinned && <span className="text-[#FFC400] mr-1">•</span>}
                  {note.title}
                </span>
              </td>
              <td className="py-3 px-3 text-xs text-black/50 dark:text-white/50">
                {note.user?.name || "—"}
              </td>
              <td className="py-3 px-3">
                <span
                  className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 ${
                    note.status === "active"
                      ? "border border-[#FFC400]/40 text-[#FFC400]"
                      : "border border-black/20 dark:border-white/20 text-black/40 dark:text-white/40"
                  }`}
                >
                  {note.status}
                </span>
              </td>
              <td className="py-3 px-3 text-xs text-black/50 dark:text-white/50">
                {note.category || "—"}
              </td>
              <td className="py-3 px-3 text-xs text-black/40 dark:text-white/40">
                {format(new Date(note.createdAt), "MMM d, yyyy")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
