"use client";

import PropertyList from "@/components/properties/PropertyList";
import { useUser } from "@/contexts/user";
import { redirect } from "next/navigation";

export default function PropertiesPage() {
  const {user, loading} = useUser();

  if (!loading && !user) {
    redirect("/");
  }

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Properties</h1>

        <div className="flex items-center gap-4">
        </div>
      </div>
      <PropertyList />
    </div>
  );
}
