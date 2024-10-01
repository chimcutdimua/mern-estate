// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-8f6bc.firebaseapp.com",
  projectId: "mern-estate-8f6bc",
  storageBucket: "mern-estate-8f6bc.appspot.com",
  messagingSenderId: "640016947109",
  appId: "1:640016947109:web:b43a3f6707b604d0e4fa4c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
