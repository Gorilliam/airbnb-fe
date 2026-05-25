"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BookingService from "@/utils/bookingService";
import { useUser } from "@/contexts/user";
import UpdateBooking from "@/components/bookings/UpdateBooking";

export default function UpdateBookingClient({ id }: { id: string }) {
  const { user, loading } = useUser();
  const router = useRouter();

  const [booking, setBooking] = useState<BookingWithRelations | null>(null);
  const [bookingLoading, setBookingLoading] = useState(true);

  useEffect(() => {
    async function loadBooking() {
      try {
        const response = await new BookingService().getBooking(id);

        if (response.status === 401 || response.status === 403) {
          router.push("/bookings");
          return;
        }

        if (response.status === 404) {
          router.push("/bookings");
          return;
        }

        if (!response.ok) {
          router.push("/bookings");
          return;
        }

        const data: BookingWithRelations = await response.json();
        setBooking(data);
      } catch (error) {
        console.error("Error loading booking:", error);
        router.push("/bookings");
      } finally {
        setBookingLoading(false);
      }
    }

    loadBooking();
  }, [id, router]);

  if (loading || bookingLoading) return <p>Loading...</p>;

  if (!user) {
    router.push("/");
    return null;
  }

  if (!booking) {
    router.push("/bookings");
    return null;
  }

  if (user.user_id !== booking.user.user_id && user.role !== "admin") {
    router.push("/bookings");
    return null;
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