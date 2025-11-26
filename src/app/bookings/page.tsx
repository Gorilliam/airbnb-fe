"use client";

import BookingList from "@/components/bookings/BookingList";
import Link from "next/link";

export default function BookingsPage() {
  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Bookings</h1>
        <Link
          href="/properties"
          className="text-blue-600 underline font-medium"
        >
          Properties
        </Link>
      </div>

      <BookingList />
    </div>
  );
}

