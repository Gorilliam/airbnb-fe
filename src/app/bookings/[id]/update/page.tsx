import BookingService from "@/utils/bookingService";
import UpdateBooking from "@/components/bookings/UpdateBooking";
import { notFound } from "next/navigation";

export default async function UpdateBookingPage({
  params,
}: PageProps<"/bookings/[id]/update">) {
  const { id } = await params;

  const response = await new BookingService().getBooking(id);
  if (!response.ok) return notFound();

  const data: BookingWithRelations = await response.json();

  // Convert to raw Booking for UpdateBooking component
  const booking: Booking = {
    id: data.id,
    property_id: data.property_id,
    user_id: data.user_id,
    check_in_date: data.check_in_date,
    check_out_date: data.check_out_date,
    total_price: data.total_price,
    created_at: data.created_at,
  };

  return <UpdateBooking booking={booking} />;
}
