"use client";

import AuthService from "@/utils/authService";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

interface UserState {
  user: UserProfile | null;
  loading: boolean;
  actions: {
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
  };
}

const initialState: UserState = {
  user: null,
  loading: true,
  actions: {
    login: async () => {},
    register: async () => {},
    logout: async () => {},
  },
};

const UserContext = createContext<UserState>(initialState);

export function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<UserProfile | null>(initialState.user);
  const [loading, setLoading] = useState(initialState.loading);

  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = async () => {
    const response = await new AuthService().getUserProfile();
    if (response.ok) {
      const profile: UserProfile | null = await response.json();
      setUser(profile);
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  const handleAuthSuccess = () => {
    getUserProfile();
  };

  const login = async (email: string, password: string) => {
    const response = await new AuthService().login(email, password);
    if (response.ok) {
      handleAuthSuccess();
    } else {
      console.warn("Login failed", response);
    }
  };

  const register = async (email: string, password: string) => {
    const response = await new AuthService().register(email, password);
    if (response.ok) {
      handleAuthSuccess();
    } else {
      console.warn("Register failed", response);
    }
  };

const logout = async () => {
  await new AuthService().logout();
  setUser(null);
};


  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        actions: { login, register, logout },
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
