"use client";

import { useUser } from "@/contexts/user";
import { useEffect, useState } from "react";

export default function MePage() {
  const { user, loading, actions } = useUser();

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

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>You must be logged in.</p>;

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
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h1>My Profile</h1>

      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Joined:</strong> {new Date(user.created_at).toDateString()}</p>

      <hr />

      <h2>Edit Profile</h2>

      <label>Name</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Bio</label>
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />

      <label>Avatar URL</label>
      <input
        value={avatarUrl}
        onChange={(e) => setAvatarUrl(e.target.value)}
      />

      <button onClick={saveProfile}>Save Changes</button>

      <hr />

      {user.role !== "admin" && (
        <>
          <h2>Role Switch</h2>

          <button onClick={toggleRole}>
            Switch to {user.role === "guest" ? "host" : "guest"}
          </button>
        </>
      )}
    </div>
  );
}
