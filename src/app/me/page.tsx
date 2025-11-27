"use client";

import { useEffect, useState } from "react";
import AuthService from "@/utils/authService";

export default function MePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await new AuthService().getUserProfile();
        const data: UserProfile | { error: string } = await response.json();

        if ("error" in data) {
          setUser(null);
        } else {
          setUser(data);
        }
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <p className="text-red-600">Failed to load profile.</p>
      </div>
    );
  }

  return (
    <div className="p-10 space-y-4">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <div className="space-y-3 text-lg">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>

        {user.avatar_url && (
          <img
            src={user.avatar_url}
            alt="Avatar"
            className="w-24 h-24 rounded-full border"
          />
        )}

        {user.bio && (
          <p><strong>Bio:</strong> {user.bio}</p>
        )}

        <p>
          <strong>Role:</strong>{" "}
          <span className={
            user.role === "admin"
              ? "text-purple-600 font-semibold"
              : user.role === "host"
              ? "text-blue-600 font-semibold"
              : "text-gray-800"
          }>
            {user.role}
          </span>
        </p>

        <p><strong>Joined:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
      </div>
    </div>
  );
}
