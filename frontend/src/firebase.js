// Import the necessary Firebase modules
import { initializeApp } from "firebase/app";


// Your Firebase app's configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cleansy-ea4f4.firebaseapp.com",
  projectId: "cleansy-ea4f4",
  storageBucket: "cleansy-ea4f4.appspot.com",
  messagingSenderId: "407073933828",
  appId: "1:407073933828:web:a05057979e13ff59c8c351",
};

// Initialize Firebase app
export const app = initializeApp(firebaseConfig);


