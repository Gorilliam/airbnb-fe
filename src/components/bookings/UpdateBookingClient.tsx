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

  // extra säkerhet: kalla inte backend med tomt id
  useEffect(() => {
    if (!id) {
      console.error("UpdateBookingClient: id saknas");
      router.push("/bookings");
      return;
    }

    async function load() {
      try {
        const res = await new BookingService().getBooking(id);

        if (!res.ok) {
          console.error("getBooking svar:", res.status);
          router.push("/bookings");
          return;
        }

        const data: BookingWithRelations = await res.json();
        setBooking(data);
      } catch (err) {
        console.error("Fel vid hämtning av booking:", err);
        router.push("/bookings");
      }
    }

    load();
  }, [id, router]);

  // vänta tills både user-hook och booking är klar
  if (loading || !booking) return <p>Loading...</p>;

  // klient-sidigt ägar-check
  if (user?.user_id !== booking.user.user_id && user?.role !== "admin") {
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