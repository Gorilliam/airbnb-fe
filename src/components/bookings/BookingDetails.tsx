"use client";

export default function BookingDetails({ booking }: { booking: BookingWithRelations }) {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="p-6 border rounded-lg shadow-sm bg-white space-y-4">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold text-gray-900">
            Booking Details
          </h1>
          <span className="text-gray-500 text-sm">
            {new Date(booking.created_at).toLocaleDateString()}
          </span>
        </div>

        <p className="text-gray-700">
          <strong>Property:</strong> {booking.property?.name}
        </p>

        <p className="text-gray-700">
          <strong>Location:</strong> {booking.property?.location}
        </p>

        <p className="text-gray-700">
          <strong>Check-in:</strong> {booking.check_in_date}
        </p>

        <p className="text-gray-700">
          <strong>Check-out:</strong> {booking.check_out_date}
        </p>

        <p className="text-gray-800 font-semibold text-lg">
          <strong>Total Price:</strong> {booking.total_price} €
        </p>

        <div className="border-t pt-3 text-gray-600 text-sm">
          <p>
            👤 <strong>Booked By:</strong> {booking.user?.name} ({booking.user?.email})
          </p>
        </div>
      </div>
    </div>
  );
}