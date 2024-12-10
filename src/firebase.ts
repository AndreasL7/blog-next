// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "blog-next-615cb.firebaseapp.com",
  projectId: "blog-next-615cb",
  storageBucket: "blog-next-615cb.firebasestorage.app",
  messagingSenderId: "992313649570",
  appId: "1:992313649570:web:623507d9a75a7c4595eafb",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
