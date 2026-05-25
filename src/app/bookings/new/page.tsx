import NewBookingClient from "@/components/bookings/NewBookingClient";
import { Suspense } from "react";

export default function NewBookingPage() {
  return (
    <Suspense fallback={<p>Loading booking form...</p>}>
      <NewBookingClient />
    </Suspense>
  );
}