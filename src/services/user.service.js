import api from "./axios";

export const getProfile = () =>
  api.get("/users/me").then((res) => res.data.data);

export const updateProfile = (data) =>
  api.patch("/users/me", data).then((res) => res.data.data);

export const changePassword = (data) =>
  api.patch("/users/me/change-password", data).then((res) => res.data.data);

export const uploadProfileImage = (formData) =>
  api
    .post("/users/me/profile-image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data.data);

export const removeProfileImage = () =>
  api.delete("/users/me/profile-image").then((res) => res.data.data);
