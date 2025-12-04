"use client";

import { useEffect, useState } from "react";
import PropertyForm from "@/components/properties/PropertyForm";
import PropertyService from "@/utils/propertyService";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/user";
import { redirect } from "next/navigation";

export default function NewPropertyPage() {
  const {user, loading} = useUser();

  if (!loading) {
    if (!user) {
      redirect("/");
    }

    if (user.role !== "host" && user.role !== "admin") {
      redirect("/properties");
    }
  }

  const router = useRouter();
  const [template, setTemplate] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const t = params.get("template");
      setTemplate(t);
    }
  }, []);

  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleCreateProperty(data: NewProperty) {
    setLoading(true);
    setMessage("");

    try {
      const response = await new PropertyService().createProperty(data);

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to create property");
      }

      setMessage("✅ Property created successfully!");

      setTimeout(() => router.push("/properties"), 1000);
    } catch (err: any) {
      console.error(err);
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-10 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">New Property</h1>

      <PropertyForm
        onSubmit={handleCreateProperty}
        loading={isLoading}
        initialData={template === "luxury" ? (
          {
            name: "Luxury Suite",
            location: "Monaco",
            price_per_night: 999,
            description: "An exclusive luxury suite."
          }
        ) : {}}/>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}