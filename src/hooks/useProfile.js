// src/hooks/useProfile.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import {
  getProfile,
  updateProfile,
  changePassword,
  uploadProfileImage,
  removeProfileImage,
} from "../services/user.service";
import { updateUser } from "../store/authSlice";

export const profileKeys = {
  me: ["profile", "me"],
};

export const useProfile = () =>
  useQuery({
    queryKey: profileKeys.me,
    queryFn: getProfile,
  });

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: profileKeys.me });
      dispatch(updateUser(data.user)); // keep Redux's cached user in sync too
    },
  });
};

export const useChangePassword = () =>
  useMutation({ mutationFn: changePassword });

export const useUploadProfileImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadProfileImage,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: profileKeys.me }),
  });
};

export const useRemoveProfileImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeProfileImage,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: profileKeys.me }),
  });
};
