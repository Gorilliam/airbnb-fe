"use client";

import { useState } from "react";

export default function BookingForm({
  onSubmit,
  loading,
  propertyId,
}: {
  onSubmit: (data: NewBooking) => void;
  loading?: boolean;
  propertyId: string;
}) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      property_id: propertyId,
      check_in_date: checkIn,
      check_out_date: checkOut,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block mb-1">Check-in</label>
        <input
          type="date"
          required
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Check-out</label>
        <input
          type="date"
          required
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      <button
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Creating..." : "Create Booking"}
      </button>
    </form>
  );
}
