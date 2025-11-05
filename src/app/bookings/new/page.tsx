"use client";

import BookingService from "@/utils/bookingService";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewBookingPage() {
  const [propertyId, setPropertyId] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const router = useRouter();

  async function handleSubmit() {
    const response = await new BookingService().createBooking({
      property_id: propertyId,
      check_in_date: checkIn,
      check_out_date: checkOut,
    });

    if (response.ok) {
      router.push("/bookings");
    } else {
      alert("Failed to create booking");
    }
  }

  return (
    <div className="p-10 max-w-md space-y-3">
      <h1 className="text-2xl font-bold mb-4">New Booking</h1>

      <input
        type="text"
        placeholder="Property ID"
        value={propertyId}
        onChange={(e) => setPropertyId(e.target.value)}
        className="border p-2 w-full rounded"
      />
      <input
        type="date"
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
        className="border p-2 w-full rounded"
      />
      <input
        type="date"
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
        className="border p-2 w-full rounded"
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create Booking
      </button>
    </div>
  );
}
