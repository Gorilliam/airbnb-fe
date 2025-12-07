export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import BookingDetails from "@/components/bookings/BookingDetails";
import BookingService from "@/utils/bookingService";
import { redirect } from "next/navigation";

export default async function BookingDetailsPage({
  params,
}: PageProps<"/bookings/[id]">) {
  const { id } = await params;

  const response = await new BookingService().getBooking(id);

  if (!response.ok) {
    redirect("/bookings");
  };

  const booking: BookingWithRelations = await response.json();

  return <BookingDetails booking={booking} />;
}
