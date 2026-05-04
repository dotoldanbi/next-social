import { create } from "zustand";

// zustand store naming : useXxxStore
// param : set
export const useModalStore = create((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));

export const usePostIdStore = create((set) => ({
  postId: "",
  setPostId: (postId) => set({ postId }),
}));
