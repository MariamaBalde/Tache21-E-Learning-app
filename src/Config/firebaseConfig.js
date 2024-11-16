// src/Config/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Pour l'authentification
import { getFirestore } from 'firebase/firestore'; // Pour la base de données Firestore

const firebaseConfig = {
  apiKey: 'AIzaSyCQCmiojhdkSbmeEo4A98M63T4H0Ks5yIQ',
  authDomain: 'tache-21-6fd14.firebaseapp.com',
  projectId: 'tache-21-6fd14',
  storageBucket: 'tache-21-6fd14.firebasestorage.app',
  messagingSenderId: '608461948845',
  appId: '1:608461948845:web:3e87e509173a12fd978324',
  measurementId: 'G-R6Z2LQ7WXF',
};

// Initialise Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
