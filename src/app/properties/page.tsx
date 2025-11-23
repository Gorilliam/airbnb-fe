import PropertyService from "@/utils/propertyService";
import PropertyList from "@/components/properties/PropertyList";

export default async function PropertiesPage() {
  const response = await new PropertyService().getProperties();
  const data: PaginatedListResponse<Property> = await response.json();

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Properties</h1>

      <PropertyList properties={data.data} />
    </div>
  );
}


