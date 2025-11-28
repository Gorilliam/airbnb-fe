import BookingService from "@/utils/bookingService";
import UpdateBooking from "@/components/bookings/UpdateBooking";
import { notFound } from "next/navigation";

export default async function UpdateBookingPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const response = await new BookingService().getBooking(id);

  if (!response.ok) return notFound();

  const booking: Booking = await response.json();

  return <UpdateBooking booking={booking} />;
}
