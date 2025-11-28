import PropertyService from "@/utils/propertyService";
import { notFound } from "next/navigation";

export default async function PropertyDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const response = await new PropertyService().getProperty(id);
  if (!response.ok) return notFound();

  const property: Property = await response.json();
  const isAvailable = property.availability === true;

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <div className="bg-white shadow p-6 rounded-lg">

        <h1 className="text-3xl font-bold mb-2">{property.name}</h1>

        <p className="text-gray-600 mb-1">
          📍 <span className="font-medium">{property.location}</span>
        </p>

        <p className="text-gray-500 text-sm mb-4">
          Added on:{" "}
          {new Date(property.created_at).toLocaleDateString()}
        </p>

        <p className="mb-6">{property.description}</p>

        <p className="text-xl font-semibold mb-2">
          {property.price_per_night} €/night
        </p>

        <p
          className={`font-medium ${
            isAvailable ? "text-green-600" : "text-red-600"
          }`}
        >
          {isAvailable ? "Available" : "Unavailable"}
        </p>

      </div>
    </div>
  );
}
