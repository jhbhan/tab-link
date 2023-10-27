// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { QueryDocumentSnapshot, getFirestore } from "firebase/firestore";
import { LinkModel } from "../models/Models";
import { keys } from "../react-app-env";
import "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: keys.FIREBASE_KEY,
  authDomain: "chrome-extension-links.firebaseapp.com",
  projectId: "chrome-extension-links",
  storageBucket: "chrome-extension-links.appspot.com",
  messagingSenderId: "333777901538",
  appId: keys.FIREBASE_APP_ID,
  measurementId: "G-WKKQW0F61M"
};

export const converter = {
  toFirestore: (data: LinkModel) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) =>
    snap.data() as LinkModel
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;