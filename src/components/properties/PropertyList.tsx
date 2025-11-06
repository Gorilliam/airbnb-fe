"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PropertyService from "@/utils/propertyService";

export default function PropertyList() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await new PropertyService().getProperties();
        if (!response.ok) {
          console.error("Failed to load properties:", response.status);
          return;
        }

        const result = await response.json();
        setProperties(result.data || []);
      } catch (err) {
        console.error("Error fetching properties:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <p>Loading properties...</p>;
  if (properties.length === 0)
    return <p className="text-gray-500">No properties available.</p>;

  return (
    <div className="space-y-4">
      {properties.map((p) => (
        <div
          key={p.id}
          className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-lg text-gray-800">{p.name}</h3>
              <p className="text-gray-600">{p.location}</p>
              <p className="text-gray-800 font-medium">
                ${p.price_per_night} / night
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {p.availability ? "✅ Available" : "❌ Unavailable"}
              </p>
            </div>
            <Link
              href={`/properties/${p.id}/update`}
              className="text-blue-600 underline text-sm"
            >
              Edit
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
