"use client";

import { useUser } from "@/contexts/user";
import { redirect } from "next/navigation";
import UpdateBooking from "@/components/bookings/UpdateBooking";

export default function UpdateBookingClient({ booking }: { booking: Booking }) {
  const { user, loading } = useUser();

  if (loading) return <p>Loading...</p>;

  if (!user) redirect("/");

  if (user.user_id !== booking.user_id && user.role !== "admin") {
    redirect("/bookings");
  }

  return <UpdateBooking booking={booking} />;
}