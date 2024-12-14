// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Ajout de l'import pour Firebase Storage

const firebaseConfig = {
  apiKey: 'AIzaSyAGkpmgN5hgO31FECdZ-eKxEHkbg1D-Wk4',
  authDomain: 'tache21test.firebaseapp.com',
  projectId: 'tache21test',
  storageBucket: 'tache21test.appspot.com', // Correction ici
  messagingSenderId: '85829053208',
  appId: '1:85829053208:web:a5b8b349f3b11cae804c6d',
  measurementId: 'G-Y6V5DSKHRT',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // Initialisation de Firebase Storage

export { auth, db, app, storage };
