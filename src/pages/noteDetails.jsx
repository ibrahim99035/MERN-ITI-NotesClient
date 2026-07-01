import { useParams, useNavigate } from "react-router-dom";
import { useNote, useDeleteNote } from "../hooks/useNotes";
import NoteDetail from "../components/notes/noteDetail";
import NoteDeleteConfirm from "../components/notes/noteDeleteConfirm";
import Loader from "../components/common/loader";
import ErrorState from "../components/common/errorState";
import Modal from "../components/common/modal";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";

export default function NoteDetails() {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { data, isLoading, isError, error, refetch } = useNote(noteId);
  const { mutate: deleteNote, isPending: isDeleting } = useDeleteNote();

  const note = data?.data;

  useEffect(() => {
    document.title = note ? `${note.title} — Notes` : "Note — Notes";
  }, [note]);

  const handleDelete = () => {
    deleteNote(noteId, {
      onSuccess: () => navigate("/notes", { replace: true }),
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Loader label="Loading note..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20">
        <ErrorState status={error.response?.status} onRetry={refetch} />
      </div>
    );
  }

  if (!note) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20">
        <ErrorState status={404} />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-20">
      <Link
        to="/notes"
        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white mb-8 transition-colors"
      >
        <HiOutlineArrowLeft size={14} />
        Back to notes
      </Link>

      <NoteDetail note={note} onDelete={() => setShowDeleteModal(true)} />

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete note"
        footer={
          <>
            <button
              onClick={() => setShowDeleteModal(false)}
              className="text-xs font-semibold uppercase tracking-widest px-4 py-2 border border-black dark:border-white text-black dark:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-xs font-semibold uppercase tracking-widest px-4 py-2 bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </>
        }
      >
        <NoteDeleteConfirm note={note} />
      </Modal>
    </div>
  );
}
