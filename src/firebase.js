// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbcewRHzzspZG1FTzlm_UsgMwfyljG--w",
  authDomain: "playwith-3bf97.firebaseapp.com",
  projectId: "playwith-3bf97",
  storageBucket: "playwith-3bf97.firebasestorage.app",
  messagingSenderId: "1067196710438",
  appId: "1:1067196710438:web:5a5f4a62b236c1c9de70e7",
  measurementId: "G-ZBXPGD7XPE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);