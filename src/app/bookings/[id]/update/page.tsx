import BookingService from "@/utils/bookingService";
import UpdateBookingClient from "@/components/bookings/UpdateBookingClient";
import { notFound } from "next/navigation";

export default async function UpdateBookingPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const response = await new BookingService().getBooking(id);

  if (!response.ok) {
    return notFound();
  }

  const booking: BookingWithRelations = await response.json();

  return <UpdateBookingClient booking={booking} />;
}
