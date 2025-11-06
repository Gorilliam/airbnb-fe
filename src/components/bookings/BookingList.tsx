"use client";

import { useEffect, useState } from "react";
import BookingService from "@/utils/bookingService";

export default function BookingList() {
  const [bookings, setBookings] = useState<BookingWithRelations[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await new BookingService().getBookings();

        if (!response.ok) {
          console.error("Failed to load bookings:", response.status);
          return;
        }

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
    <div className="space-y-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">My Bookings</h1>

      {bookings.map((b) => (
        <div
          key={b.id}
          className="p-5 border rounded-lg shadow-sm bg-white hover:shadow-md transition duration-150"
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-lg text-gray-900">
              🏠 {b.property?.name || "Unknown property"}
            </h3>
            <span className="text-gray-500 text-sm">
              {new Date(b.created_at).toLocaleDateString()}
            </span>
          </div>

          <p className="text-gray-700 mb-1">
            <strong>Location:</strong> {b.property?.location || "—"}
          </p>

          <p className="text-gray-700 mb-1">
            <strong>Dates:</strong> {b.check_in_date} → {b.check_out_date}
          </p>

          <p className="text-gray-700 mb-1">
            <strong>Price per night:</strong>{" "}
            {b.property?.price_per_night
              ? `${b.property.price_per_night} €`
              : "—"}
          </p>

          <p className="text-gray-800 font-semibold mt-2">
            Total: {b.total_price} €
          </p>

          <div className="border-t mt-3 pt-2 text-sm text-gray-500">
            <p>
              👤 {b.user?.name || "Unknown user"} — {b.user?.email || "No email"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}


