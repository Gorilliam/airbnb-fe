"use client";

import { useEffect, useState } from "react";
import BookingService from "@/utils/bookingService";

export default function BookingList() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await new BookingService().getBookings();

        if (!response.ok) {
          console.error("Failed to load bookings:", response.status);
          return;
        }

        // Backend returns PaginatedListResponse<Booking>
        const result = await response.json();
        setBookings(result.data || []);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <p>Loading your bookings...</p>;

  if (bookings.length === 0)
    return <p className="text-gray-500">You have no bookings yet.</p>;

  return (
    <div className="space-y-4">
      {bookings.map((b) => (
        <div
          key={b.id}
          className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition"
        >
          <h3 className="font-semibold text-lg text-gray-800">
            Booking #{b.id}
          </h3>
          <p className="text-gray-700">
            <strong>Property:</strong> {b.property_id}
          </p>
          <p className="text-gray-700">
            <strong>Dates:</strong> {b.check_in_date} → {b.check_out_date}
          </p>
          <p className="text-gray-700">
            <strong>Total Price:</strong> ${b.total_price}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Created: {new Date(b.created_at).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}

