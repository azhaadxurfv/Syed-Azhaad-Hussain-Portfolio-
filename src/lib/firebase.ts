// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwggqCsOPstZ1Hy7Eba60ywvRsbZZ7Ork",
  authDomain: "syed-azhaad-hussain.firebaseapp.com",
  projectId: "syed-azhaad-hussain",
  storageBucket: "syed-azhaad-hussain.firebasestorage.app",
  messagingSenderId: "1009475784378",
  appId: "1:1009475784378:web:90acd1a381c7d7f01e3c83",
  measurementId: "G-3BC0GS7HV9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
export const db = getFirestore(app);

export default app;