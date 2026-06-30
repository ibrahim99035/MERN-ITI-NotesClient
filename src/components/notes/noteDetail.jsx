import { Link } from "react-router-dom";
import { format } from "date-fns";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { IoPinOutline } from "react-icons/io5";
import ReactMarkdown from "react-markdown";

export default function NoteDetail({ note, onDelete }) {
  return (
    <article>
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            {note.isPinned && (
              <span className="text-xs font-semibold uppercase tracking-widest px-2 py-0.5 bg-[#FFC400] text-black inline-flex items-center gap-1">
                <IoPinOutline size={12} />
                Pinned
              </span>
            )}
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
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-black dark:text-white">
            {note.title}
          </h1>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            to={`/notes/${note._id}/edit`}
            className="p-2 border border-black/10 dark:border-white/10 text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:border-black/30 dark:hover:border-white/30 transition-colors"
            title="Edit"
          >
            <HiOutlinePencil size={16} />
          </Link>
          {onDelete && (
            <button
              onClick={onDelete}
              className="p-2 border border-black/10 dark:border-white/10 text-black/50 dark:text-white/50 hover:text-red-500 hover:border-red-500/30 transition-colors"
              title="Delete"
            >
              <HiOutlineTrash size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 mb-8 text-[11px] text-black/40 dark:text-white/40">
        <span>Created {format(new Date(note.createdAt), "MMM d, yyyy")}</span>
        {note.updatedAt !== note.createdAt && (
          <span>Updated {format(new Date(note.updatedAt), "MMM d, yyyy")}</span>
        )}
      </div>

      {note.tags && note.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {note.tags.map((tag, i) => (
            <span
              key={i}
              className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 border border-black/15 dark:border-white/15 text-black/60 dark:text-white/60"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="prose prose-sm dark:prose-invert max-w-none text-black/70 dark:text-white/70 leading-relaxed">
        <ReactMarkdown>{note.content}</ReactMarkdown>
      </div>
    </article>
  );
}
