"use client";
import { SignUp } from "@clerk/clerk-react";
import React from "react";

export default function Page() {
  return (
    <div className="flex items-center justify-center p-3">
      <SignUp />
    </div>
  );
}
