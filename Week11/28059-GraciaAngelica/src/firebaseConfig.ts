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
    appId: "1:459868057939:web:c8f91914a4d9d0027e31a6",
    measurementId: "G-NG3X7X91W1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);