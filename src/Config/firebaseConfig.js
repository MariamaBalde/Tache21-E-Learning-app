// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAj4KOnE4xnI6EhFcFMxc2We8k3wqzAz4Q",
    authDomain: "e-learning-app-7b69b.firebaseapp.com",
    projectId: "e-learning-app-7b69b",
    storageBucket: "e-learning-app-7b69b.firebasestorage.app",
    messagingSenderId: "18558548334",
    appId: "1:18558548334:web:9baf59e5a6fa572ea0697f",
    measurementId: "G-RWH36XRQKC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);