// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "next-social-app-d8b8a.firebaseapp.com",
  projectId: "next-social-app-d8b8a",
  storageBucket: "next-social-app-d8b8a.firebasestorage.app",
  messagingSenderId: "113702672304",
  appId: "1:113702672304:web:3dd86d62b2e3d2d7f0a875"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);