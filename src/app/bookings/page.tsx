"use client";

import BookingList from "@/components/bookings/BookingList";
import Link from "next/link";

export default function BookingsPage() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Bookings</h1>

      <Link
        href="/bookings/new"
        className="text-blue-600 underline font-medium"
      >
        Add New Booking
      </Link>

      {/* Den här komponenten hämtar och visar relationerna */}
      <BookingList />
    </div>
  );
}

