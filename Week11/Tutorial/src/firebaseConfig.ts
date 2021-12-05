// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDT8rNlrUTIP6SeAdcZnJoexcDlMFGJHn4",
    authDomain: "week11mobilecrossplat.firebaseapp.com",
    projectId: "week11mobilecrossplat",
    storageBucket: "week11mobilecrossplat.appspot.com",
    messagingSenderId: "459868057939",
    appId: "1:459868057939:web:c79a2291fa1062f97e31a6",
    measurementId: "G-G72MH98J8N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);