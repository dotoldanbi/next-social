"use client";
import React, { useState, useEffect, useRef } from "react";

import { useUser } from "@clerk/nextjs";
import { HiOutlinePhotograph } from "react-icons/hi";
import { app } from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export default function Input() {
  // clerk 유저상태
  const { user, isSignedIn, isLoaded } = useUser();

  // 리액트 useRef
  const imagePickRef = useRef(null);

  const [imageFileUrl, setImageFileUrl] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [imageFileUploading, setImageFileUploading] = useState();

  const [text, setText] = useState('');
  const [postLoading, setPostLoading] = useState();

  const addImageToPost = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 파일을 받아서 파일과 파일URL 격납
      setSelectedFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    // selectedFile이 변경 시 업로드
    if (selectedFile) {
      uploadImageToStorage();
    }
  }, [selectedFile]);

  const uploadImageToStorage = () => {
    // flag
    setImageFileUploading(true);

    const fileName = new Date().getTime() + "_" + selectedFile.name;

    // 파이어베이스 스토리지
    const storage = getStorage(app);
    // 스토리지ref
    const storageRef = ref(storage, fileName);
    // 업로드
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done.");
      },
      (error) => {
        console.log(error);
        setImageFileUploading(false);
        setSelectedFile(null);
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageFileUrl(downloadUrl);
          setImageFileUploading(false);
        });
      },
    );
  };

  if (!isSignedIn || !isLoaded) {
    return null;
  }

  const handleSubmit = async () => {
    setPostLoading(true);
    const response = await fetch("/api/post/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      
      body: JSON.stringify({
        userMongoId: user.publicMetadata.userMongoId,
        name: user.fullName,
        username: user.username,
        text,
        profileImg: user.imageUrl,
        image: imageFileUrl,
      }),
    });
    setPostLoading(false);
    setText('');
    setSelectedFile(null);
    setImageFileUrl(null);
    location.reload();
  };

  return (
    <div className="flex border-b border-gray-200 p-3 space-x-3 w-full">
      <img
        src={user.imageUrl}
        alt="user-img"
        className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95 object-cover"
      />

      <div className="w-full divide-y divide-gray-200">
        <textarea
          className="w-full border-none outline-none tranking-wide min-h-[50px] text-gray-700"
          placeholder="What's happening"
          rows="2"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        {selectedFile && (
          <img
            onClick={() => {
              setSelectedFile(null);
              setImageFileUrl(null);
            }}
            src={imageFileUrl}
            alt="selected-img"
            className={`w-full max-h-[250px] object-cover cursor-pointer ${imageFileUploading}?'animate-pulse':'' `}
          />
        )}

        <div className="flex items-center justify-between pt-2.5">
          <HiOutlinePhotograph
            className="h-10 w-10 p-2 text-sky-500 hover:bg-sky-100 rounded-full cursor-pointer"
            onClick={() => imagePickRef.current.click()}
          />
          <input
            type="file"
            ref={imagePickRef}
            accept="image/*"
            hidden
            onChange={addImageToPost}
          />
          <button
            disabled={text.trim() === "" || postLoading || imageFileUploading}
            className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
            onClick={handleSubmit}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
