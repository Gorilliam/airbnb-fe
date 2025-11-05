import PropertyService from "@/utils/propertyService";
import Link from "next/link";

export default async function PropertiesPage() {
  const response = await new PropertyService().getProperties();
  const data: PaginatedListResponse<Property> = await response.json();

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Properties</h1>
      <Link href="/properties/new" className="text-blue-600 underline">
        Add New Property
      </Link>

      <ul className="mt-4 space-y-3">
        {data.data.map((property) => (
          <li key={property.id} className="border p-3 rounded">
            <p className="font-semibold">{property.name}</p>
            <p className="text-sm text-gray-500">{property.location}</p>
            <p>{property.price_per_night} €/night</p>
            <Link
              href={`/properties/${property.id}/update`}
              className="text-blue-600 text-sm underline"
            >
              Edit
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
