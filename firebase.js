// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGNVHSGzEzpVW4DQle6roF0B_uP-lasvU",
  authDomain: "new-bloom-2-0.firebaseapp.com",
  projectId: "new-bloom-2-0",
  storageBucket: "new-bloom-2-0.firebasestorage.app",
  messagingSenderId: "55361053663",
  appId: "1:55361053663:web:ef3f83677ea1ab2a211a6a",
  measurementId: "G-9X8858B2BW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
