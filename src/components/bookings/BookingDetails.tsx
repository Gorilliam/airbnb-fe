"use client";

export default function BookingDetails({ booking }: { booking: BookingWithRelations }) {
  return (
    <div className="p-10 max-w-lg space-y-4">
      <h1 className="text-2xl font-bold">Booking Details</h1>

      <p><strong>Property:</strong> {booking.property?.name}</p>
      <p><strong>Location:</strong> {booking.property?.location}</p>

      <p><strong>Check-in:</strong> {booking.check_in_date}</p>
      <p><strong>Check-out:</strong> {booking.check_out_date}</p>

      <p><strong>Total Price:</strong> {booking.total_price} €</p>

      <p><strong>Booked By:</strong> {booking.user?.name} ({booking.user?.email})</p>
    </div>
  );
}