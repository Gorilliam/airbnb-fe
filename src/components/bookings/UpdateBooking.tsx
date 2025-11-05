"use client";

import { useState } from "react";
import BookingService from "@/utils/bookingService";
import { useRouter } from "next/navigation";

export default function UpdateBooking({ booking }: { booking: Booking }) {
  const [checkIn, setCheckIn] = useState(booking.check_in_date);
  const [checkOut, setCheckOut] = useState(booking.check_out_date);
  const router = useRouter();

  async function handleSave() {
    const response = await new BookingService().updateBooking(booking.id, {
      check_in_date: checkIn,
      check_out_date: checkOut,
    });

    if (response.ok) {
      router.push("/bookings");
    } else {
      alert("Failed to update booking");
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this booking?")) return;
    const res = await new BookingService().deleteBooking(booking.id);
    if (res.ok) {
      router.push("/bookings");
    } else {
      alert("Failed to delete booking");
    }
  }

  return (
    <div className="p-10 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Edit Booking</h1>

      <input
        type="date"
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
        className="border p-2 w-full rounded mb-2"
      />
      <input
        type="date"
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
        className="border p-2 w-full rounded mb-2"
      />

      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
