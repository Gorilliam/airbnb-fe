"use client";

import Link from "next/link";
import { useUser } from "@/contexts/user";

export default function NavBar() {
  const { user } = useUser();

  return (
    <nav className="w-full bg-gray-100 px-6 py-4 flex justify-between items-center border-b">
      <div className="flex gap-6 items-center">
        <Link href="/properties" className="text-lg font-semibold hover:underline">
          Properties
        </Link>

        <Link href="/bookings" className="hover:underline">
          Bookings
        </Link>

        {user && (
          <Link href="/me" className="hover:underline">
            My Profile
          </Link>
        )}

        {(user?.role === "host" || user?.role === "admin") && (
          <Link
            href="/properties/new"
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            + Add Property
          </Link>
        )}
      </div>

      <div>
        {!user ? (
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        ) : (
          <span className="text-gray-600">Logged in as {user.email}</span>
        )}
      </div>
    </nav>
  );
}