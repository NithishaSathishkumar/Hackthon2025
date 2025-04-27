// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDakPvQy1FT-8pwYF4aIQrXrvvMCD0DRlU",
  authDomain: "hackthon2025-8a00c.firebaseapp.com",
  databaseURL: "https://hackthon2025-8a00c-default-rtdb.firebaseio.com",
  projectId: "hackthon2025-8a00c",
  storageBucket: "hackthon2025-8a00c.firebasestorage.app",
  messagingSenderId: "639822419195",
  appId: "1:639822419195:web:3667eac31ba10f92c10c5e",
  measurementId: "G-9EM937BXL4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);