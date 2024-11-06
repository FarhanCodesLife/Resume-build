// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSfP3MqK6fUYk7M_Ugw2wfO31lPTxGavw",
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
