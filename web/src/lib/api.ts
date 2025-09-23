import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const registerUser = (payload: any) =>
  api.post(process.env.NEXT_PUBLIC_API_REGISTER!, payload);

export const loginUser = (payload: any) =>
  api.post(process.env.NEXT_PUBLIC_API_LOGIN!, payload);

export const verifyOtp = (payload: any) =>
  api.post(process.env.NEXT_PUBLIC_API_OTP_VERIFY!, payload);

export const editProfile = (payload: any) =>
  api.post(process.env.NEXT_PUBLIC_API_EDIT_PROFILE!, payload);

export default api;
