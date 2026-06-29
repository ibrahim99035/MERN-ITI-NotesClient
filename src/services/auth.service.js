import api from "./axios";

export const registerUser = (data) =>
  api.post("/auth/register", data).then((res) => res.data.data);

export const loginUser = (data) =>
  api.post("/auth/login", data).then((res) => res.data.data);

export const verifyEmail = (token) =>
  api.get(`/auth/verify-email?token=${token}`).then((res) => res.data.data);

export const resendVerification = (data) =>
  api.post("/auth/resend-verification", data).then((res) => res.data.data);
