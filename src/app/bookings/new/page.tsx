"use client";

export const dynamic = "force-dynamic";

import { useSearchParams } from "next/navigation";
import BookingForm from "@/components/bookings/BookingForm";
import BookingService from "@/utils/bookingService";
import { useEffect, useState } from "react";

export default function NewBookingPage() {
  const searchParams = useSearchParams();
  const [propertyId, setPropertyId] = useState<string | null>(null);

  useEffect(() => {
    setPropertyId(searchParams.get("property"));
  }, [searchParams]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!propertyId) {
    return (
      <p className="text-red-600 text-lg font-semibold">
        ❌ No property selected.
      </p>
    );
  }

  async function handleCreateBooking(data: NewBooking) {
    setLoading(true);
    setMessage("");

    try {
      const response = await new BookingService().createBooking(data);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create booking");
      }

      setMessage("✅ Booking successfully created!");
    } catch {
      setMessage("❌ Failed to create booking");
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

      {message && <p className="mt-4 font-medium">{message}</p>}
    </div>
  );
}
