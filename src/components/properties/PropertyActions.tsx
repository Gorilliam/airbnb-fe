"use client";

import { useUser } from "@/contexts/user";
import Link from "next/link";

export default function PropertyActions({
  property,
}: {
  property: Property;
}) {
  const { user } = useUser();

  // Not logged in → no actions
  if (!user) return null;

  // Only owner or admin sees actions
  const isOwner = user.user_id === property.user_id || user.role === "admin";

  if (!isOwner) return null;

  return (
    <div className="mt-6 flex gap-3">
      <Link
        href={`/properties/${property.id}/update`}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Edit Property
      </Link>
    </div>
  );
}