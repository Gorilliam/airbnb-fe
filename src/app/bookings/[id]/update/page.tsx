import BookingService from "@/utils/bookingService";
import UpdateBookingClient from "@/components/bookings/UpdateBookingClient";
import { redirect } from "next/navigation";

export default async function UpdateBookingPage({
  params,
}: PageProps<"/bookings/[id]/update">) {
  const { id } = await params;
  console.log("✏️ FETCHING BOOKING FOR UPDATE", id);
  const response = await new BookingService().getBooking(id);

  console.log("✏️ STATUS FROM BE:", response.status);

  if (!response.ok) {
    const text = await response.text();
    console.log("✏️ ERROR BODY:", text);
    redirect("/bookings");
  }

  const booking: BookingWithRelations = await response.json();

  return <UpdateBookingClient booking={booking} />;
}
