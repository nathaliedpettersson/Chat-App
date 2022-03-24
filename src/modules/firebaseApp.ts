import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8-_6OlLLGP_kVPkHOHLCZK3jxs2ukfQI",
  authDomain: "chatapp-30a6b.firebaseapp.com",
  databaseURL: "https://chatapp-30a6b-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "chatapp-30a6b",
  storageBucket: "chatapp-30a6b.appspot.com",
  messagingSenderId: "355675536288",
  appId: "1:355675536288:web:03d2ca1fafe06d787642c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
