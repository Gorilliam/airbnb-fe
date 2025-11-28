"use client";

import BookingList from "@/components/bookings/BookingList";
import { useUser } from "@/contexts/user";
import { redirect } from "next/navigation";

export default function BookingsPage() {
  const {user, loading} = useUser();

  if (!loading && !user) {
    redirect("/");
  }
  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Bookings</h1>

      </div>

      <BookingList />
    </div>
  );
}

