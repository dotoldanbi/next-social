"use client";

import { useModalStore, usePostIdStore } from "@/store/store";
import { HiX } from "react-icons/hi";

import React, { useEffect, useState } from "react";
import moment from "moment";
import { useUser } from "@clerk/nextjs";
import Modal from "react-modal";

export default function CommentModal() {
  const open = useModalStore((state) => state.open);
  const setOpen = useModalStore((state) => state.setOpen);

  const postId = usePostIdStore((state) => state.postId);
  const setPostId = usePostIdStore((state) => state.setPostId);

  const [post, setPost] = useState(null);
  const [postLoading, setPostLoading] = useState(false);
  const [input, setInput] = useState("");

  const { user } = useUser();


  useEffect(() => {
    const fetchPost = async () => {
      if (postId !== "") {
        setPostLoading(true);
        setInput("");
        const response = await fetch("/api/post/get", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ postId }),
        });

        if (response.ok) {
          const postData = await response.json();
          setPost(postData);
          setPostLoading(false);
        } else {
          console.error("Failed to fetch post data");
          setPostLoading(false);
        }
      }
    };
    fetchPost();
  }, [postId]);

  const sendComment = async () => {
    if (input.trim() === "") return;
  }

  return (
    <Modal
      isOpen={open}
      onRequestClose={() => setOpen(false)}
      ariaHideApp={false}
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg w-full max-w-md"
    >
      <div className="p-4">
        <div className="border-b border-gray-200 py-2 px-1.5">
          <HiX
            className="text-2xl text-gray-700 p-1 hover:bg-gray-200 rounded-full cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>

        <div className="p-2 flex items-center space-x-1 relative">
          <span className="w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-300" />
          <img
            src={
              postLoading
                ? "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                : post?.profileImg
            }
            alt="User Avatar"
            className="w-10 h-10 rounded-full mr-4"
          />

          <h4 className="font-bold sm:text-[16px] text-[15px] hover:underline truncate">
            {postLoading ? "Name" : post?.name}
          </h4>
          <span className="font-bold sm:text-[16px] text-[15px] hover:underline truncate">
            @{postLoading ? "username" : post?.username}
          </span>
        </div>
        
        <div className='flex p-3 space-x-3'>
          <img src={user?.imageUrl} alt="user-img" className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95" />

          <div className='w-full divide-y divide-gray-200'>
            <div>
              <textarea
                rows="2"
                placeholder="Tweet your reply"
                className="w-full border-none focus:ring-0 text-lg placeholder-gray-500 tracking-wide min-h-[50px] text-gray-700"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            
            </div>
        </div>
        <p className="ml-12 text-[15px] sm:text-[16px] mb-2">
          {postLoading ? "Post content loading..." : post?.content}
        </p>

        <div className="flex items-center justify-end pt-2.5">
          <button className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
          disabled={input.trim() === "" || postLoading} onClick={sendComment}>
            Reply
          </button>
        </div>
      </div>
    </Modal>
  );
}
