import BookingService from "@/utils/bookingService";
import Link from "next/link";

export default async function BookingsPage() {
  const response = await new BookingService().getBookings();
  const data: PaginatedListResponse<Booking> = await response.json();

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Bookings</h1>

      <Link
        href="/bookings/new"
        className="text-blue-600 underline font-medium"
      >
        Add New Booking
      </Link>

      <ul className="mt-4 space-y-3">
        {data.data.map((booking) => (
          <li key={booking.id} className="border p-3 rounded shadow-sm">
            <p>
              <span className="font-semibold">Property:</span>{" "}
              {booking.property_id}
            </p>
            <p>
              <span className="font-semibold">User:</span> {booking.user_id}
            </p>
            <p>
              {booking.check_in_date} → {booking.check_out_date}
            </p>
            <p className="text-gray-600">{booking.total_price} €</p>

            <Link
              href={`/bookings/${booking.id}/update`}
              className="text-blue-600 text-sm underline"
            >
              Edit
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
