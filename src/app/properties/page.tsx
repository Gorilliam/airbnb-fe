"use client";

import PropertyList from "@/components/properties/PropertyList";
import { useUser } from "@/contexts/user";
import { redirect } from "next/navigation";

export default function PropertiesPage() {
  const { user, loading } = useUser();

  // ❗ Do NOT redirect while loading
  if (loading) {
    return (
      <div className="p-10 text-center text-gray-600">
        Loading properties...
      </div>
    );
  }

  // After loading finishes → user still null → redirect
  if (!user) {
    redirect("/");
  }

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Properties</h1>
      </div>

      <PropertyList />
    </div>
  );
}