// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnTj3zQlqiJ1jmnLwo761E0-tZPRNi0IE",
  authDomain: "do-an-cnpm-3d2a0.firebaseapp.com",
  projectId: "do-an-cnpm-3d2a0",
  storageBucket: "do-an-cnpm-3d2a0.appspot.com",
  messagingSenderId: "420640745819",
  appId: "1:420640745819:web:b4cb8cd0af9ce149e8d27e",
  measurementId: "G-820Y9G1R37"
};

// Initialize Firebase
initializeApp(firebaseConfig);

//const auth = getAuth();
//connectAuthEmulator(auth, "http://localhost:9099");

//const db = getFirestore();
//connectFirestoreEmulator(db, 'localhost', 8080);
