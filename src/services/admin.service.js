import api from "./axios";

export const getDashboardStats = () =>
  api.get("/admin/stats").then((res) => res.data.data);

export const getAllNotes = (params) =>
  api.get("/admin/notes", { params }).then((res) => res.data);

export const getAllUsers = (params) =>
  api.get("/admin/users", { params }).then((res) => res.data);
