import { useQuery } from "@tanstack/react-query";
import {
  getDashboardStats,
  getAllNotes,
  getAllUsers,
} from "../services/admin.service";

export const adminKeys = {
  stats: ["admin", "stats"],
  notes: (params) => ["admin", "notes", params],
  users: (params) => ["admin", "users", params],
};

export const useAdminStats = () =>
  useQuery({
    queryKey: adminKeys.stats,
    queryFn: getDashboardStats,
  });

export const useAdminNotes = (params) =>
  useQuery({
    queryKey: adminKeys.notes(params),
    queryFn: () => getAllNotes(params),
  });

export const useAdminUsers = (params) =>
  useQuery({
    queryKey: adminKeys.users(params),
    queryFn: () => getAllUsers(params),
  });
