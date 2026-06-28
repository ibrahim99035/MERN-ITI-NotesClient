// src/hooks/useNotes.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from "../services/note.service";

// centralized query keys — change shape here, not in every component
export const notesKeys = {
  all: ["notes"],
  list: (filters) => ["notes", "list", filters],
  detail: (noteId) => ["notes", "detail", noteId],
};

export const useNotes = (filters) =>
  useQuery({
    queryKey: notesKeys.list(filters),
    queryFn: () => getNotes(filters),
    keepPreviousData: true, // smooths pagination — no flash of empty state between pages
  });

export const useNote = (noteId) =>
  useQuery({
    queryKey: notesKeys.detail(noteId),
    queryFn: () => getNoteById(noteId),
    enabled: !!noteId, // don't fire until noteId actually exists
  });

export const useCreateNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notesKeys.all });
    },
  });
};

export const useUpdateNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateNote, // expects { noteId, data }
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: notesKeys.all });
      queryClient.invalidateQueries({ queryKey: notesKeys.detail(variables.noteId) });
    },
  });
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notesKeys.all });
    },
  });
};
