// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cleansy-ea4f4.firebaseapp.com",
  projectId: "cleansy-ea4f4",
  storageBucket: "cleansy-ea4f4.appspot.com",
  messagingSenderId: "407073933828",
  appId: "1:407073933828:web:a05057979e13ff59c8c351"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
