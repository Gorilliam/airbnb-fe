"use client";

import Link from "next/link";

export default function PropertyList({ properties }: { properties: Property[] }) {
  if (!properties || properties.length === 0)
    return <p>No properties available.</p>;

  return (
    <div className="space-y-4">
      {properties.map((p) => (
        <div key={p.id} className="p-4 border rounded-lg shadow-sm bg-white">
          <h3 className="font-semibold text-lg">{p.name}</h3>
          <p className="text-gray-600">{p.location}</p>
          <p className="text-gray-800">{p.price_per_night} €/night</p>

          <div className="mt-3 flex gap-4">
            {p.availability ? (
              <Link
                href={`/bookings/new?property=${p.id}`}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Book Property
              </Link>
            ) : (
              <button
                disabled
                className="px-3 py-1 bg-gray-300 text-gray-600 rounded cursor-not-allowed"
              >
                Unavailable
              </button>
            )}

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

