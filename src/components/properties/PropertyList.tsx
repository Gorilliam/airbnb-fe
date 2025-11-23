"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PropertyService from "@/utils/propertyService";
import { useUser } from "@/contexts/user";

export default function PropertyList() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const { user } = useUser();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await new PropertyService().getProperties();
        const result = await response.json();
        setProperties(result?.data || []);
      } catch (err) {
        console.error("Error fetching properties:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  if (loading) return <p>Loading properties...</p>;
  if (properties.length === 0) return <p>No properties available.</p>;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800">Properties</h1>

      {properties.map((p) => {
        const canEdit =
          user?.role === "admin" ||
          (user?.role === "host" && user?.user_id === p.user_id);

        return (
          <div
            key={p.id}
            className="p-5 border rounded-lg shadow-sm bg-white hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-3">
              <div>
                <h3 className="font-semibold text-lg text-gray-900">{p.name}</h3>
                <p className="text-gray-600">{p.location}</p>
                <p className="text-gray-800 font-medium">
                  {p.price_per_night} €/night
                </p>

                <p className="text-sm mt-1">
                  {p.availability ? "✅ Available" : "❌ Unavailable"}
                </p>
              </div>

              {canEdit && (
                <Link
                  href={`/properties/${p.id}/update`}
                  className="text-blue-600 underline text-sm"
                >
                  Edit
                </Link>
              )}
            </div>

            <div className="mt-4">
              {p.availability ? (
                <Link
                  href={`/bookings/new?property=${p.id}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Book Property
                </Link>
              ) : (
                <button
                  disabled
                  className="px-4 py-2 bg-gray-400 text-white rounded cursor-not-allowed"
                >
                  Unavailable
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

