"use client";

import { useEffect, useState } from "react";
import BookingService from "@/utils/bookingService";
import { useUser } from "@/contexts/user";
import { redirect } from "next/navigation";
import UpdateBooking from "@/components/bookings/UpdateBooking";

export default function UpdateBookingClient({ id }: { id: string }) {
  const { user, loading } = useUser();
  const [booking, setBooking] = useState<BookingWithRelations | null>(null);

  useEffect(() => {
    async function load() {
      const res = await new BookingService().getBooking(id);

      if (!res.ok) redirect("/bookings");

      const data = await res.json();
      setBooking(data);
    }
    load();
  }, [id]);

  if (loading || !booking) return <p>Loading...</p>;

  // Client-side auth check
  if (user?.user_id !== booking.user.user_id && user?.role !== "admin") {
    redirect("/bookings");
  }

  const flatBooking: Booking = {
    id: booking.id,
    property_id: booking.property.id,
    user_id: booking.user.user_id,
    check_in_date: booking.check_in_date,
    check_out_date: booking.check_out_date,
    total_price: booking.total_price,
    created_at: booking.created_at,
  };

  return <UpdateBooking booking={flatBooking} />;
}