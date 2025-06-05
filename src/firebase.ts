// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdC_cJtcpxt8UALQFlmTa6QXeG711y0mc",
  authDomain: "todo-app-d37c1.firebaseapp.com",
  databaseURL: "https://todo-app-d37c1-default-rtdb.firebaseio.com",
  projectId: "todo-app-d37c1",
  storageBucket: "todo-app-d37c1.firebasestorage.app",
  messagingSenderId: "514833284342",
  appId: "1:514833284342:web:916d4f91c497050ed900d7",
  measurementId: "G-EL465BH54N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

