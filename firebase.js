// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAF288CkIPWML6aCCn5zm396a20jo_aBLU",
    authDomain: "shopandcook-ef020.firebaseapp.com",
    projectId: "shopandcook-ef020",
    storageBucket: "shopandcook-ef020.appspot.com",
    messagingSenderId: "896942290389",
    appId: "1:896942290389:web:8be520c10d3bbb0cd1f95c",
    measurementId: "G-8MMM859XKG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const db = getFirestore(app);