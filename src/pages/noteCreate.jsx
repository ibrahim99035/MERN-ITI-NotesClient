import { useNavigate } from "react-router-dom";
import NoteForm from "../components/notes/noteForm";
import { useCreateNote } from "../hooks/useNotes";

export default function NoteCreate() {
  const navigate = useNavigate();
  const { mutate, isPending } = useCreateNote();

  const onSubmit = (data, { setError }) => {
    mutate(data, {
      onSuccess: () => navigate("/notes"),
      onError: (error) => {
        const message = error.response?.data?.message || "Failed to create note";
        setError("root", { message });
      },
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-20">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-black/40 dark:text-white/40 mb-1">
          Create
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white">
          New note
        </h1>
      </div>
      <NoteForm onSubmit={onSubmit} isPending={isPending} submitLabel="Create note" />
    </div>
  );
}
