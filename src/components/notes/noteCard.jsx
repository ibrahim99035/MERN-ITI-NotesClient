import { Link } from "react-router-dom";
import { format } from "date-fns";
import { IoPinOutline } from "react-icons/io5";
import { HiOutlineTrash } from "react-icons/hi";

export default function NoteCard({ note, onDelete }) {
  const snippet = note.content
    ? note.content.length > 120
      ? note.content.slice(0, 120) + "…"
      : note.content
    : "";

  return (
    <div className="group border border-black/10 dark:border-white/10 bg-white dark:bg-[#1c1c1c] p-5 flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-3">
        <Link
          to={`/notes/${note._id}`}
          className="text-sm font-semibold text-black dark:text-white hover:text-[#FFC400] transition-colors leading-snug flex-1"
        >
          {note.isPinned && (
            <IoPinOutline className="inline -mt-0.5 mr-1 text-[#FFC400]" size={14} />
          )}
          {note.title}
        </Link>
        <div className="flex items-center gap-1.5 shrink-0">
          {onDelete && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onDelete(note);
              }}
              className="opacity-0 group-hover:opacity-100 text-black/30 dark:text-white/30 hover:text-red-500 transition-all"
              title="Delete"
            >
              <HiOutlineTrash size={15} />
            </button>
          )}
        </div>
      </div>

      {snippet && (
        <p className="text-xs text-black/50 dark:text-white/50 leading-relaxed mb-4 flex-1">
          {snippet}
        </p>
      )}

      <div className="flex items-center justify-between gap-3 pt-3 border-t border-black/5 dark:border-white/5">
        <div className="flex items-center gap-2 flex-wrap">
          {note.category && (
            <span className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 border border-[#FFC400]/40 text-[#FFC400]">
              {note.category}
            </span>
          )}
          {note.status === "archived" && (
            <span className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 border border-black/20 dark:border-white/20 text-black/40 dark:text-white/40">
              Archived
            </span>
          )}
        </div>
        <span className="text-[10px] text-black/40 dark:text-white/40 shrink-0">
          {format(new Date(note.createdAt), "MMM d, yyyy")}
        </span>
      </div>
    </div>
  );
}
