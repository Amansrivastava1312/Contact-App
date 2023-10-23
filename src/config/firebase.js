// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_n7tTejc66vhQMttSaWsytjYUog52TkA",
  authDomain: "vite-contacts-4a2a5.firebaseapp.com",
  projectId: "vite-contacts-4a2a5",
  storageBucket: "vite-contacts-4a2a5.appspot.com",
  messagingSenderId: "635022742824",
  appId: "1:635022742824:web:e65eecc80c9b5fab0cac1d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
