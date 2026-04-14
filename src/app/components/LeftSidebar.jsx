"use client";
import React from "react";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { HiHome } from "react-icons/hi";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
export default function LeftSideBar() {
  return (
    <div>
      <Link href="/">
        <FaXTwitter className="w-16 h-16 cursor-pointer p-3 hover:bg-gray-100 rounded-full transtion-all duration-200" />
      </Link>
      <Link
        href="/"
        className="flex items-center p-3 hover:bg-gray-100 rounded-full transition-all duration-200 gap-2 w-fit"
      >
        <HiHome className="w-7 h-7" />
        <span className="font-bold hidden xl:inline">Home</span>
      </Link>

      <button className="bg-blue-500 text-white px-4 py-2 rounded-full mt-4 hover:brightness-95 transition-all duration-200 w-48 h-9 shadow-md hidden xl:inline font-semibold">
        <SignedIn>
          <SignOutButton />
        </SignedIn>

        <SignedOut>
          <SignInButton />
        </SignedOut>
      </button>
    </div>
  );
}
