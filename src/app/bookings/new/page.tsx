"use client";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import { useSearchParams } from "next/navigation";
import BookingForm from "@/components/bookings/BookingForm";
import BookingService from "@/utils/bookingService";
import { useEffect, useState } from "react";

export default function NewBookingPage() {
  const searchParams = useSearchParams();

  // Avoid SSR mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <p>Loading...</p>;
  }

  const propertyId = searchParams.get("property");

  if (!propertyId) {
    return (
      <p className="text-red-600 text-lg font-semibold">
        ❌ No property selected.
      </p>
    );
  }

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleCreateBooking(data: NewBooking) {
    setLoading(true);
    setMessage("");

    try {
      const response = await new BookingService().createBooking(data);

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to create booking");
      }

      setMessage("✅ Booking successfully created!");
    } catch (err) {
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
