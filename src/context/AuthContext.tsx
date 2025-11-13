"use client"
import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import Cookies from "js-cookie";

type AppContextProviderValueType = {
  isAuth: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AppContextProviderValueType>({
  isAuth: false,
  token: null,
  login: () => { },
  logout: () => { },
});

export const AppContextProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const cookieToken = Cookies.get("token");
    if (cookieToken) setToken(cookieToken);
  }, []);

  const login = (newToken: string) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAuth: !!token, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);