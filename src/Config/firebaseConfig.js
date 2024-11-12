import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAj4KOnE4xnI6EhFcFMxc2We8k3wqzAz4Q',
  authDomain: 'e-learning-app-7b69b.firebaseapp.com',
  projectId: 'e-learning-app-7b69b',
  storageBucket: 'e-learning-app-7b69b.firebasestorage.app',
  messagingSenderId: '18558548334',
  appId: '1:18558548334:web:9baf59e5a6fa572ea0697f',
  measurementId: 'G-RWH36XRQKC',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
