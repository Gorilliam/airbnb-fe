"use client";

import { useUser } from "@/contexts/user";
import { redirect } from "next/navigation";
import UpdateBooking from "@/components/bookings/UpdateBooking";

export default function UpdateBookingClient({ booking }: { booking: BookingWithRelations }) {
  const { user, loading } = useUser();

  if (loading) return <p>Loading...</p>;

  if (!user) redirect("/");
  console.log("User:", user);
  console.log("Booking:", booking);

  if (user.user_id !== booking.user.user_id && user.role !== "admin") {
    redirect("/bookings");
  }

  const flatBooking: Booking = {
  id: booking.id,
  property_id: booking.property.id,
  user_id: booking.user.user_id,
  check_in_date: booking.check_in_date,
  check_out_date: booking.check_out_date,
  total_price: booking.total_price,
  created_at: booking.created_at
};


  return <UpdateBooking booking={flatBooking} />;
}