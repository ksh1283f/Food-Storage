import { getAnalytics } from "firebase/analytics";
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDeS4R2IWygUtkuSZITjI6Mja0HYRYMx-U",
    authDomain: "food-storage-9bd85.firebaseapp.com",
    projectId: "food-storage-9bd85",
    storageBucket: "food-storage-9bd85.firebasestorage.app",
    messagingSenderId: "1043747608978",
    appId: "1:1043747608978:web:7aba1839f4fe0954d5c94b",
    measurementId: "G-VB6714NQKS"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);