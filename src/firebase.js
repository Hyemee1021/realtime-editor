// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCblM21c1R-rsQ9QTqC1NrWWPEjeDeO2Ns",
  authDomain: "realtime-editor-31914.firebaseapp.com",
  projectId: "realtime-editor-31914",
  storageBucket: "realtime-editor-31914.firebasestorage.app",
  messagingSenderId: "672789685492",
  appId: "1:672789685492:web:70833b0f3fa1e09137aaa1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firestore
export const db = getFirestore(app);
