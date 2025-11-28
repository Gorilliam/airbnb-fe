"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BookingService from "@/utils/bookingService";
import BookingActions from "@/components/bookings/BookingActions";

export default function BookingDetailPage() {
  const { id } = useParams<{ id: string }>();

  const [booking, setBooking] = useState<BookingWithRelations | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      if (!id || typeof id !== "string") {
        console.error("Missing booking id:", id);
        setError("Invalid booking id");
        setLoading(false);
        return;
      }

      try {
        const service = new BookingService();
        const res = await service.getBooking(id);

        console.log("GET /bookings/:id ->", res.status);

        if (!res.ok) {
          setError("Booking not found");
          setLoading(false);
          return;
        }

        const data: BookingWithRelations = await res.json();
        setBooking(data);
      } catch (err) {
        console.error("Error fetching booking:", err);
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

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <div className="bg-white shadow p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-6">Booking Details</h1>

        {/* Property Info */}
        <h2 className="text-xl font-semibold">{booking.property.name}</h2>
        <p className="text-gray-600">📍 {booking.property.location}</p>

        <div className="mt-4">
          <p>
            <span className="font-semibold">Check-in:</span>{" "}
            {new Date(booking.check_in_date).toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold">Check-out:</span>{" "}
            {new Date(booking.check_out_date).toLocaleDateString()}
          </p>
        </div>

        <p className="text-xl font-semibold mt-4">
          Total Price: {booking.total_price} €
        </p>

        {/* Guest */}
        <p className="mt-4 text-gray-700">
          Guest: {booking.user.name} ({booking.user.email})
        </p>

        {/* Owner/Admin Actions */}
        <BookingActions booking={booking} />
      </div>
    </div>
  );
}
