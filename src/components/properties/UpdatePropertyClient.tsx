"use client";

import { useUser } from "@/contexts/user";
import { redirect } from "next/navigation";
import UpdateProperty from "@/components/properties/UpdateProperty";

export default function UpdatePropertyClient({
  property,
}: {
  property: Property;
}) {
  const { user, loading } = useUser();

  if (loading) return <p>Loading...</p>;

  if (!user) redirect("/");

  if (user.user_id !== property.user_id && user.role !== "admin") {
    redirect("/properties");
  }

  return <UpdateProperty property={property} />;
}