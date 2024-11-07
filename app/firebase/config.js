// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: ,
  authDomain: "resumes-build.firebaseapp.com",
  projectId: "resumes-build",
  storageBucket: "resumes-build.firebasestorage.app",
  messagingSenderId: "702837663349",
  appId: "1:702837663349:web:5ee27ca2afb58cd6c83a3c",
  measurementId: "G-PSBH8ELPSE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

