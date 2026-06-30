export default function NoteDeleteConfirm({ note }) {
  if (!note) return null;

  return (
    <div className="space-y-3">
      <p>
        Are you sure you want to delete{" "}
        <span className="font-semibold text-black dark:text-white">
          "{note.title}"
        </span>
        ?
      </p>
      <p className="text-xs text-black/50 dark:text-white/50">
        This action cannot be undone.
      </p>
    </div>
  );
}
