"use client";


import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BookingForm from "@/components/bookings/BookingForm";
import BookingService from "@/utils/bookingService";
import { useUser } from "@/contexts/user";
import { redirect } from "next/navigation";

export default function NewBookingPage() {
  const {user, loading} = useUser();

  if (!loading && !user) {
    redirect("/");
  }

  const router = useRouter();
  const [propertyId, setPropertyId] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("property");
      setPropertyId(id);
    }
  }, []);


  if (!propertyId) {
    return (
      <p className="text-red-600 text-lg font-semibold">
        No property selected.
      </p>
    );
  }

  async function handleCreateBooking(data: NewBooking) {
    setLoading(true);
    try {
      const response = await new BookingService().createBooking(data);

      console.log("POST SENT:", data);

     if (!response.ok) {
  const { error } = await response.json();
  throw new Error(error ?? "Failed to create booking");
     }


      setMessage("✅ Booking successfully created!");

      setTimeout(() => router.push("/bookings"), 1000);
    } catch (err) {
      console.error(err);
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
        loading={isLoading}
        propertyId={propertyId}
      />

      {message && (
        <p className="mt-4 font-semibold">
          {message}
        </p>
      )}
    </div>
  );
}