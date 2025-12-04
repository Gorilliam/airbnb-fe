import PropertyService from "@/utils/propertyService";
import { notFound } from "next/navigation";
import UpdatePropertyClient from "@/components/properties/UpdatePropertyClient";

export default async function UpdatePropertyPage({
  params,
}: PageProps<"/properties/[id]/update">) {
  const { id } = await params;

  const response = await new PropertyService().getProperty(id);

  if (!response.ok) return notFound();

  const property: Property = await response.json();

  return <UpdatePropertyClient property={property} />;
}