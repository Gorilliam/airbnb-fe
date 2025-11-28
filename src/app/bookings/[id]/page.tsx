// src/app/bookings/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BookingService from "@/utils/bookingService";
import PropertyService from "@/utils/propertyService";
import BookingActions from "@/components/bookings/BookingActions";

export default function BookingDetailPage() {
  const { id } = useParams<{ id: string }>();

  const [booking, setBooking] = useState<Booking | null>(null);
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      if (!id || typeof id !== "string") {
        console.error("No id in route params:", id);
        setError("Invalid booking id");
        setLoading(false);
        return;
      }

      try {
        const bookingService = new BookingService();
        const res = await bookingService.getBooking(id);

        console.log("GET /bookings/:id -> status", res.status);

        if (!res.ok) {
          setError("Booking not found");
          setLoading(false);
          return;
        }

        const data: Booking = await res.json();
        console.log("Booking data:", data);
        setBooking(data);

        // Fetch related property so we can show a nice card
        const propertyService = new PropertyService();
        const propRes = await propertyService.getProperty(data.property_id);

        if (propRes.ok) {
          const prop: Property = await propRes.json();
          setProperty(prop);
        }
      } catch (e) {
        console.error("Error fetching booking:", e);
        setError("Failed to load booking");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) {
    return (
      <div className="p-10 text-center">
        <p>Loading booking…</p>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="p-10 text-center">
        <p className="text-red-600 font-semibold">
          {error ?? "Booking not found"}
        </p>
      </div>
    );
  }

  const checkIn = new Date(booking.check_in_date).toLocaleDateString();
  const checkOut = new Date(booking.check_out_date).toLocaleDateString();

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <div className="bg-white shadow p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-4">Booking Details</h1>

        {/* Property info if we managed to load it */}
        {property && (
          <>
            <p className="text-xl font-semibold mb-1">{property.name}</p>
            <p className="text-gray-600 mb-4">📍 {property.location}</p>
            <p className="mb-2">
              Price per night: {property.price_per_night} €
            </p>
          </>
        )}

        {/* Dates */}
        <p className="mb-1">
          Check-in: <span className="font-medium">{checkIn}</span>
        </p>
        <p className="mb-4">
          Check-out: <span className="font-medium">{checkOut}</span>
        </p>

        {/* Total price */}
        <p className="text-xl font-semibold mb-4">
          Total price: {booking.total_price} €
        </p>

        {/* Owner/admin actions */}
        <BookingActions booking={booking} />
      </div>
    </div>
  );
}
