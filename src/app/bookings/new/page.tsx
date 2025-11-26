"use client";

console.log("⭐ NEW BOOKING PAGE LOADED");

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BookingService from "@/utils/bookingService";
import BookingForm from "@/components/bookings/BookingForm";

export default function NewBookingPage() {
  console.log("⭐ COMPONENT RENDERED");
  const router = useRouter();
  const searchParams = useSearchParams();

  const propertyId = searchParams.get("property"); // THIS WORKS

  const [loading, setLoading] = useState(false);

  if (!propertyId) {
    return (
      <p className="text-red-600 text-lg font-semibold">
        ❌ No property selected.
      </p>
    );
  }

  async function handleCreateBooking(data: NewBooking) {
    setLoading(true);

    try {
      const response = await new BookingService().createBooking(data);

      console.log("POST SENT:", data); // <-- you will now SEE THIS

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create booking");
      }

      router.push("/bookings");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to create booking");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-10 max-w-md">
      <h1 className="text-2xl font-bold mb-4">New Booking</h1>

      <BookingForm
        onSubmit={handleCreateBooking}
        loading={loading}
        propertyId={propertyId}
      />
    </div>
  );
}
