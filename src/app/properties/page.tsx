"use client";

import PropertyList from "@/components/properties/PropertyList";
import Link from "next/link";

export default function PropertiesPage() {
  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Properties</h1>

        <Link href="/bookings" className="text-blue-600 underline font-medium">
          My Bookings
        </Link>
      </div>

      <PropertyList />
    </div>
  );
}
