"use client";

import BookingList from "@/components/bookings/BookingList";
import Link from "next/link";

export default function BookingsPage() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Bookings</h1>

      <BookingList />
    </div>
  );
}

