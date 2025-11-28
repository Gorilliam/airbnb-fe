"use client";

import PropertyList from "@/components/properties/PropertyList";
import Link from "next/link";
import { useUser } from "@/contexts/user";

export default function PropertiesPage() {
  const { user } = useUser();

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Properties</h1>

        <div className="flex items-center gap-4">
                  {/* Only hosts & admins can add properties */}
          {(user?.role === "host" || user?.role === "admin") && (
            <Link
              href="/properties/new"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              + Add Property
            </Link>
          )}
         
          <Link
            href="/bookings"
            className="text-blue-600 underline font-medium"
          >
            My Bookings
          </Link>

 
        </div>
      </div>

      <PropertyList />
    </div>
  );
}
