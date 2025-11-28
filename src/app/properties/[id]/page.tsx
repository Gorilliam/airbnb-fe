// src/app/properties/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PropertyService from "@/utils/propertyService";
import PropertyActions from "@/components/properties/PropertyActions";

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      if (!id || typeof id !== "string") {
        console.error("No id in route params:", id);
        setError("Invalid property id");
        setLoading(false);
        return;
      }

      try {
        const service = new PropertyService();
        const res = await service.getProperty(id);

        console.log("GET /properties/:id -> status", res.status);

        if (!res.ok) {
          setError("Property not found");
          setLoading(false);
          return;
        }

        const data: Property = await res.json();
        setProperty(data);
      } catch (e) {
        console.error("Error fetching property:", e);
        setError("Failed to load property");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) {
    return (
      <div className="p-10 text-center">
        <p>Loading property…</p>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="p-10 text-center">
        <p className="text-red-600 font-semibold">{error ?? "Property not found"}</p>
      </div>
    );
  }

  const isAvailable = property.availability;

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <div className="bg-white shadow p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">{property.name}</h1>

        <p className="text-gray-600 mb-1">
          📍 <span className="font-medium">{property.location}</span>
        </p>

        <p className="text-gray-500 text-sm mb-4">
          Added on: {new Date(property.created_at).toLocaleDateString()}
        </p>

        <p className="mb-6">{property.description}</p>

        <p className="text-xl font-semibold mb-2">
          {property.price_per_night} €/night
        </p>

        <p className={isAvailable ? "text-green-600" : "text-red-600"}>
          {isAvailable ? "Available" : "Unavailable"}
        </p>

        <PropertyActions property={property} />
      </div>
    </div>
  );
}