// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import { auth, db } from '../Config/firebaseConfig'; // Firebase Config
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export const useAuth = () => {
    const [user, setUser] = useState(null); // Données utilisateur
    const [loading, setLoading] = useState(true); // Chargement

    useEffect(() => {
        console.log('useAuth: Surveillance de l\'état d\'authentification...');
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                console.log('Utilisateur connecté :', currentUser);

                // Récupérer les données utilisateur depuis Firestore
                try {
                    const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setUser({ uid: currentUser.uid, ...userData }); // Fusion des données Firestore et Auth
                    } else {
                        console.log('Aucune donnée utilisateur trouvée dans Firestore.');
                        setUser(null);
                    }
                } catch (error) {
                    console.error('Erreur lors de la récupération des données utilisateur :', error);
                    setUser(null);
                }
            } else {
                console.log('Aucun utilisateur connecté.');
                setUser(null);
            }
            setLoading(false); // Fin du chargement
        });

        return () => unsubscribe(); // Nettoyage à la désinscription
    }, []);

    return { user, loading };
};