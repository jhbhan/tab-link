// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJfCFzo2bth2ENQNM2ysz_7d7T5rhPOs0",
  authDomain: "chrome-extension-links.firebaseapp.com",
  projectId: "chrome-extension-links",
  storageBucket: "chrome-extension-links.appspot.com",
  messagingSenderId: "333777901538",
  appId: "1:333777901538:web:85d128d9717b10e9b1cbbb",
  measurementId: "G-WKKQW0F61M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;