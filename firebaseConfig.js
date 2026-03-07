import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
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
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export const db = getFirestore(app);
