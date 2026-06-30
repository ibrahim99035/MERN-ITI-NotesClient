import { useParams, useNavigate } from "react-router-dom";
import { useNote, useUpdateNote } from "../hooks/useNotes";
import NoteForm from "../components/notes/noteForm";
import Loader from "../components/common/loader";
import ErrorState from "../components/common/errorState";

export default function NoteUpdate() {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, error, refetch } = useNote(noteId);
  const { mutate, isPending } = useUpdateNote();

  const note = data?.data;

  const onSubmit = (formData, { setError }) => {
    mutate(
      { noteId, data: formData },
      {
        onSuccess: () => navigate(`/notes/${noteId}`),
        onError: (error) => {
          const message = error.response?.data?.message || "Failed to update note";
          setError("root", { message });
        },
      }
    );
  };

  if (isLoading) return <div className="max-w-3xl mx-auto px-6 py-20"><Loader label="Loading note..." /></div>;
  if (isError) return <div className="max-w-3xl mx-auto px-6 py-20"><ErrorState status={error.response?.status} onRetry={refetch} /></div>;
  if (!note) return <div className="max-w-3xl mx-auto px-6 py-20"><ErrorState status={404} /></div>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-20">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-black/40 dark:text-white/40 mb-1">
          Edit
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white">
          Edit note
        </h1>
      </div>
      <NoteForm
        defaultValues={{
          title: note.title,
          content: note.content,
          category: note.category,
          tags: note.tags || [],
          status: note.status,
          isPinned: note.isPinned,
        }}
        onSubmit={onSubmit}
        isPending={isPending}
        submitLabel="Update note"
      />
    </div>
  );
}
