// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDh749Caid4YKB9RkoLv8yX1SwGK8iV5xk",
  authDomain: "nationalparks-8deb6.firebaseapp.com",
  projectId: "nationalparks-8deb6",
  storageBucket: "nationalparks-8deb6.appspot.com",
  messagingSenderId: "745897526453",
  appId: "1:745897526453:web:7d63f971c8a2631418eafc",
  measurementId: "G-WS1ZQQGM3Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
