"use client";

import { useState } from "react";
import BookingService from "@/utils/bookingService";
import BookingForm from "./BookingForm";

export default function NewBooking() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleCreateBooking = async (data: NewBooking) => {
    setLoading(true);
    setMessage("");

    try {
      const response = await new BookingService().createBooking(data);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create booking");
      }

      setMessage("✅ Booking created successfully!");
    } catch (err: any) {
      console.error("Error creating booking:", err);
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">New Booking</h1>
      <BookingForm onSubmit={handleCreateBooking} loading={loading} />
      {message && (
        <p
          className={`mt-4 text-center ${
            message.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
