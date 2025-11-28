"use client";

import AuthService from "@/utils/authService";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UserState {
  user: UserProfile | null;
  loading: boolean;
  actions: {
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, name: string) => Promise<void>;
    logout: () => Promise<void>;
    updateProfile: (
  data: Partial<UserProfile> & { toggleRole?: boolean }
) => Promise<boolean>;

  };
}

const initialState: UserState = {
  user: null,
  loading: true,
  actions: {
    login: async () => {},
    register: async () => {},
    logout: async () => {},
    updateProfile: async () => false,
  },
};

const UserContext = createContext<UserState>(initialState);

export function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<UserProfile | null>(initialState.user);
  const [loading, setLoading] = useState(initialState.loading);
  const router = useRouter();

  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = async () => {
    try {
      const response = await new AuthService().getUserProfile();

      if (response.ok) {
        const userProfile: UserProfile = await response.json();
        setUser(userProfile);
      } else if (response.status === 401) {
        setUser(null);
      } else {
        console.warn("Unexpected error in getUserProfile:", response.status);
        setUser(null);
      }
    } catch (err) {
      console.error("Network error fetching user profile:", err);
      setUser(null);
    } finally {
      setTimeout(() => setLoading(false), 200);
    }
  };

  const handleAuthSuccess = (redirectTo: string = "/properties") => {
    getUserProfile();
    router.push(redirectTo);
  };

  const login = async (email: string, password: string) => {
    const response = await new AuthService().login(email, password);
    if (response.ok) {
      handleAuthSuccess();
    } else {
      console.warn("Login failed", response);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    const response = await new AuthService().register(email, password, name);
    if (response.ok) {
      handleAuthSuccess();
    } else {
      console.warn("Register failed", response);
    }
  };

  const logout = async () => {
    await new AuthService().logout();
    setUser(null);
    router.push("/");
  };

  const updateProfile = async (data: Partial<UserProfile> & { toggleRole?: boolean }) => {
  const response = await new AuthService().updateProfile(data);

  if (response.ok) {
    await getUserProfile();
    return true;
  } else {
    console.warn("Failed to update profile", await response.json());
    return false;
  }
};


  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        actions: { login, register, logout, updateProfile },
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}