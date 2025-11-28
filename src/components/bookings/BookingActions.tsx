"use client";

import Link from "next/link";
import { useUser } from "@/contexts/user";

export default function BookingActions({ booking }: { booking: Booking }) {
  const { user } = useUser();

  if (!user) return null;

  const isOwner =
    user.user_id === booking.user_id || user.role === "admin";

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