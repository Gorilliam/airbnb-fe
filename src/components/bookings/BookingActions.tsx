"use client";

import { useUser } from "@/contexts/user";
import Link from "next/link";

export default function BookingActions({
  booking,
}: {
  booking: BookingWithRelations;
}) {
  const { user } = useUser();

  if (!user) return null;

  const isOwner = user.user_id === booking.user.id || user.role === "admin";

  if (!isOwner) return null;

  return (
    <div className="mt-6 flex gap-3">
      <Link
        href={`/bookings/${booking.id}/update`}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Edit Booking
      </Link>
    </div>
  );
}