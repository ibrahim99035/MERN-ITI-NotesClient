// src/services/note.service.js
import api from "./axios";

export const getNotes = (params) =>
  api.get("/notes", { params }).then((res) => res.data);

export const getNoteById = (noteId) =>
  api.get(`/notes/${noteId}`).then((res) => res.data);

export const getPinnedNote = () =>
  api.get("/notes/pinned").then((res) => res.data);

export const createNote = (data) =>
  api.post("/notes", data).then((res) => res.data);

export const updateNote = ({ noteId, data }) =>
  api.patch(`/notes/${noteId}`, data).then((res) => res.data);

export const deleteNote = (noteId) =>
  api.delete(`/notes/${noteId}`).then((res) => res.data);
