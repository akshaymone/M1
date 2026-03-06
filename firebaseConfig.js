// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0sq1HkhcPWRrpc2nBU2VFEGFbMbUoOLc",
  authDomain: "m1corp.firebaseapp.com",
  projectId: "m1corp",
  storageBucket: "m1corp.firebasestorage.app",
  messagingSenderId: "914222557654",
  appId: "1:914222557654:web:86a2cf7f839a7f14ed5c77",
  measurementId: "G-PP4W697L15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
