// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore, collection } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-LFu8O3Vo8qyxQUCe5_yYQRlOB3jrnJQ",
  authDomain: "react-notes-abc007.firebaseapp.com",
  projectId: "react-notes-abc007",
  storageBucket: "react-notes-abc007.appspot.com",
  messagingSenderId: "627743769737",
  appId: "1:627743769737:web:63869e67d73eb675147258"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const notesCollection = collection(db, "notes")