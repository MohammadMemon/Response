// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWOUI0f4L8beM9HntegZxOCnvTLyEVIQw",

  authDomain: "response-chat.firebaseapp.com",

  projectId: "response-chat",

  storageBucket: "response-chat.appspot.com",

  messagingSenderId: "564757557911",

  appId: "1:564757557911:web:e7bc75e9d559241657efd2",

  measurementId: "G-7WRSDFHFW4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db }