"use client";
import { ClerkLoading, ClerkLoaded, ClerkProvider } from "@clerk/nextjs";
import Loader from "../components/Loader";
import "../globals.css";

import React from "react";

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ClerkLoading>
            <Loader />
          </ClerkLoading>
          <ClerkLoaded>{children}</ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  );
}
