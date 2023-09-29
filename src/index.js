import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const root = ReactDOM.createRoot(document.getElementById("root"));

const firebaseConfig = {
  apiKey: "AIzaSyDh749Caid4YKB9RkoLv8yX1SwGK8iV5xk",
  authDomain: "nationalparks-8deb6.firebaseapp.com",
  projectId: "nationalparks-8deb6",
  storageBucket: "nationalparks-8deb6.appspot.com",
  messagingSenderId: "745897526453",
  appId: "1:745897526453:web:7d63f971c8a2631418eafc",
  measurementId: "G-WS1ZQQGM3Q",
};
const app = initializeApp(firebaseConfig);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
