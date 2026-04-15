import mongoose from "mongoose";

let initialized = false;

export const connect = async () => {
  mongoose.set("strictQuery", true);

  if (initialized) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    initialized = true;
  } catch (error) {
    console.error("Error connecting mongodb", error);
    throw error;
  }
};