import { useSearchParams, Link } from "react-router-dom";
import { useNotes } from "../../hooks/useNotes";
import { useDeleteNote } from "../../hooks/useNotes";
import Filter from "./filter";
import NoteCard from "./noteCard";
import Pagination from "./pagination";
import Loader from "../common/loader";
import ErrorState from "../common/errorState";
import EmptyState from "../common/emptyState";
import Modal from "../common/modal";
import NoteDeleteConfirm from "./noteDeleteConfirm";
import { useState } from "react";

export default function NotesMain() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filters = {
    page: Number(searchParams.get("page")) || 1,
    limit: Number(searchParams.get("limit")) || 9,
    sort: searchParams.get("sort") || "-createdAt",
    search: searchParams.get("search") || undefined,
    status: searchParams.get("status") || undefined,
    category: searchParams.get("category") || undefined,
  };

  const { data, isLoading, isError, error, refetch, isFetching } = useNotes(filters);
  const { mutate: deleteNote, isPending: isDeleting } = useDeleteNote();

  const updateFilters = (newFilters) => {
    const params = {};
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params[key] = String(value);
      }
    });
    setSearchParams(params, { replace: true });
  };

  const handlePageChange = (page) => {
    updateFilters({ ...filters, page });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    deleteNote(deleteTarget._id, {
      onSuccess: () => setDeleteTarget(null),
    });
  };

  const notes = data?.data?.notes || [];
  const pagination = data?.data?.pagination;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-black/40 dark:text-white/40 mb-1">
            Notes
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white">
            All notes
          </h1>
        </div>
        <Link
          to="/notes/new"
          className="text-xs font-semibold uppercase tracking-widest bg-black dark:bg-white text-white dark:text-black px-5 py-2.5 hover:bg-[#FFC400] hover:text-black transition-colors"
        >
          + New note
        </Link>
      </div>

      <Filter filters={filters} onFilterChange={updateFilters} />

      {isLoading ? (
        <Loader label="Loading notes..." />
      ) : isError ? (
        <ErrorState status={error.response?.status} onRetry={refetch} />
      ) : notes.length === 0 ? (
        <EmptyState
          title="No notes found"
          message={
            filters.search || filters.status || filters.category
              ? "Try adjusting your filters or search terms."
              : "Create your first note to get started."
          }
          actionLabel={!filters.search && !filters.status && !filters.category ? "Create note" : undefined}
          onAction={() => (window.location.href = "/notes/new")}
        />
      ) : (
        <>
          {isFetching && (
            <p className="text-[10px] text-black/30 dark:text-white/30 mb-3 text-right">
              Updating…
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} onDelete={setDeleteTarget} />
            ))}
          </div>
          <Pagination pagination={pagination} onPageChange={handlePageChange} />
        </>
      )}

      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete note"
        footer={
          <>
            <button
              onClick={() => setDeleteTarget(null)}
              className="text-xs font-semibold uppercase tracking-widest px-4 py-2 border border-black dark:border-white text-black dark:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="text-xs font-semibold uppercase tracking-widest px-4 py-2 bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </>
        }
      >
        <NoteDeleteConfirm note={deleteTarget} />
      </Modal>
    </div>
  );
}
