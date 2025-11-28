"use client";

import { useUser } from "@/contexts/user";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function MePage() {
  const { user, loading, actions } = useUser();

  if (!loading && !user) {
    redirect("/");
  }

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name ?? "");
      setBio(user.bio ?? "");
      setAvatarUrl(user.avatar_url ?? "");
    }
  }, [user]);

  if (loading || !user) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  const saveProfile = async () => {
    const success = await actions.updateProfile({
      name,
      bio,
      avatar_url: avatarUrl,
    });

    if (success) alert("Profile updated!");
  };

  const toggleRole = async () => {
    const success = await actions.updateProfile({ toggleRole: true });
    if (success) alert("Role changed!");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>

      <div className="space-y-1 mb-6">
        <p><span className="font-semibold">Email:</span> {user.email}</p>
        <p><span className="font-semibold">Role:</span> {user.role}</p>
        <p>
          <span className="font-semibold">Joined:</span>{" "}
          {new Date(user.created_at).toDateString()}
        </p>
      </div>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Bio</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Avatar URL</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
          />
        </div>

        <button
          onClick={saveProfile}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-3"
        >
          Save Changes
        </button>
      </div>

      <hr className="my-6" />

      {user.role !== "admin" && (
        <>
          <h2 className="text-xl font-semibold mb-2">Role Switch</h2>

          <button
            onClick={toggleRole}
            className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 rounded"
          >
            Switch to {user.role === "guest" ? "host" : "guest"}
          </button>
        </>
      )}
    </div>
  );
}