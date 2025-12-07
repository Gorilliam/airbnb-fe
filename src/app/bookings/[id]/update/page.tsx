import BookingService from "@/utils/bookingService";
import UpdateBookingClient from "@/components/bookings/UpdateBookingClient";
import { redirect } from "next/navigation";

export default async function UpdateBookingPage({
  params,
}: PageProps<"/bookings/[id]/update">) {
  const { id } = await params;
  const response = await new BookingService().getBooking(id);

  if (!response.ok) {
    redirect("/bookings");
  }

  const booking: BookingWithRelations = await response.json();

  return <UpdateBookingClient booking={booking} />;
}
