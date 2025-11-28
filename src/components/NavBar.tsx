"use client";

import Link from "next/link";
import { useUser } from "@/contexts/user";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const { user, loading, actions } = useUser();
  const pathname = usePathname();

  const isHome = pathname === "/";

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
        {loading && <span className="text-gray-500">Loading…</span>}

        {!loading && !user && !isHome && (
          <Link
            href="/"
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Login
          </Link>
        )}

        {!loading && user && (
          <>
            <span className="text-sm text-gray-600">
              Logged in as {user.email}
            </span>

            <button
              onClick={actions.logout}
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}