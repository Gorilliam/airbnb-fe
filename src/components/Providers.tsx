"use client";

import { UserProvider } from "@/contexts/user";
import { PropsWithChildren } from "react";
// (Later you can import BookingProvider, PropertyProvider, etc.)

export function Providers({ children }: PropsWithChildren) {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
}
