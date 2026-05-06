"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function FollowButton({ user: userFromProfilePage }) {
  const { user } = useUser();
  const router = useRouter();

  const handleFollow = async () => {
    try {
      const res = await fetch("/api/user/follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userProfileId: userFromProfilePage._id,
          userMongoId: user.publicMetadata.userMongoId,
        }),
      });
      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };
  return (
    <button
      onClick={handleFollow}
      className="bg-blue-500 text-white px-4 py-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={
        !user || user.publicMetadata.userMongoId === userFromProfilePage._id
      }
    >
      {user &&
      userFromProfilePage.followers.includes(user.publicMetadata.userMongoId)
        ? "Unfollow"
        : "Follow"}
    </button>
  );
}
