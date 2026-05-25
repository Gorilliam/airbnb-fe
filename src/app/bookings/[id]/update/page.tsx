import UpdateBookingClient from "@/components/bookings/UpdateBookingClient";

export default async function UpdateBookingPage({
  params,
}: PageProps<"/bookings/[id]/update">) {
  const { id } = await params;

  return <UpdateBookingClient id={id} />;
}



// import BookingService from "@/utils/bookingService";
// import UpdateBookingClient from "@/components/bookings/UpdateBookingClient";
// import { notFound, redirect } from "next/navigation";

// export default async function UpdateBookingPage({
//   params,
// }: PageProps<"/bookings/[id]/update">) {
//   const { id } = await params;
//   const response = await new BookingService().getBooking(id);

//   if (response.status === 404) {
//   return notFound();
// }

// if (response.status === 401 || response.status === 403) {
//   console.log("Här går det fel")
//   console.log(response.status)
//   redirect("/bookings");
// }


//   const booking: BookingWithRelations = await response.json();

//   return <UpdateBookingClient booking={booking} />;
// }
