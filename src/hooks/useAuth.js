// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import { auth } from '../Config/firebaseConfig'; // Firebase Auth

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  return { user };
};
