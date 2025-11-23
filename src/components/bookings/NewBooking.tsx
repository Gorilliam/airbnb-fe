"use client";

import { useState } from "react";
import BookingService from "@/utils/bookingService";
import BookingForm from "./BookingForm";
import { useSearchParams } from "next/navigation";

export default function NewBooking() {
  const searchParams = useSearchParams();
  const propertyId = searchParams.get("property");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!propertyId) {
    return <p className="text-red-600">❌ No property selected.</p>;
  }

  const handleCreateBooking = async (data: NewBooking) => {
    setLoading(true);
    setMessage("");

    try {
      const response = await new BookingService().createBooking(data);

      if (!response.ok) {
        const errorData: { error?: string } = await response.json();
        throw new Error(errorData.error ?? "Could not create booking");
      }

      setMessage("✅ Booking created successfully!");
    } catch (err) {
      let errorMessage = "Unknown error";

      if (err instanceof Error) {
        errorMessage = err.message;
      }

      setMessage(`❌ ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">New Booking</h1>

      <BookingForm
        onSubmit={handleCreateBooking}
        loading={loading}
        propertyId={propertyId}
      />

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