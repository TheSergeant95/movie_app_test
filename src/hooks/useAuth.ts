"use client";

import { useAuthContext } from "@/context/AuthContext";
import { postData } from "@/utils/postData";

export function useAuth() {
  const { isAuth, token, login, logout } = useAuthContext();

  async function loginUser(username: string, password: string) {
    const res = await postData('auth/login', { username, password });
    if (res?.data?.token) login(res.data.token);
    return res;
  }

  async function logoutUser() {
    await postData('auth/logout');
    logout();
  }

  async function registerUser(username: string, password: string) {
    const res = await postData("auth/register", { username, password });
    if(res?.data?.token) login(res.data.token);
    return res;
  }

  return { isAuth, token, loginUser, registerUser, logoutUser };
}
