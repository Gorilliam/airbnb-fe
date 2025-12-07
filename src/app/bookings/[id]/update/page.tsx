import UpdateBookingClient from "@/components/bookings/UpdateBookingClient";

export default function UpdateBookingPage({ params }: { params: { id: string } }) {
  return <UpdateBookingClient id={params.id} />;
}
