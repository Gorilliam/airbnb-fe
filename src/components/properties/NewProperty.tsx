"use client";

import { useState } from "react";
import PropertyService from "@/utils/propertyService";
import PropertyForm from "./PropertyForm";

export default function NewProperty() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleCreateProperty = async (data: NewProperty) => {
    setLoading(true);
    setMessage("");

    try {
      const response = await new PropertyService().createProperty(data);

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to create property");
      }

      setMessage("✅ Property created successfully!");
    } catch (err: any) {
      console.error("Error creating property:", err);
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">New Property</h1>
      <PropertyForm onSubmit={handleCreateProperty} loading={loading} />
      {message && (
        <p
          className={`mt-4 text-center ${
            message.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
