// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { auth, db } from '../Config/firebaseConfig';
// import { useEffect, useState } from 'react';
// import { doc, getDoc } from 'firebase/firestore';

// const PrivateRoute = ({ children, roleRequired }) => {
//   const [loading, setLoading] = useState(true);
//   const [authorized, setAuthorized] = useState(false);

//   useEffect(() => {
//     console.log('PrivateRoute: useEffect déclenché');

//     const checkAuthorization = async () => {
//       // Vérifiez si un utilisateur est connecté dans Firebase Auth
//       const user = auth.currentUser;
//       console.log('Utilisateur actuel dans Firebase Auth:', user);

//       if (!user) {
//         console.log('Aucun utilisateur connecté.');
//         setAuthorized(false);
//         setLoading(false);
//         return;
//       }

//       try {
//         // Récupérez les données de l'utilisateur depuis Firestore
//         const userDoc = await getDoc(doc(db, 'users', user.uid));
//         const userData = userDoc.data();

//         console.log('Rôle requis :', roleRequired);
//         console.log('Données utilisateur Firestore :', userData);

//         // Vérifiez si l'utilisateur a le rôle requis
//         if (userData && userData.role === roleRequired) {
//           setAuthorized(true);
//         } else {
//           console.log('Rôle non autorisé ou manquant.');
//           setAuthorized(false);
//         }
//       } catch (error) {
//         console.error('Erreur lors de la vérification du rôle :', error);
//         setAuthorized(false);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkAuthorization();
//   }, [roleRequired]);

//   // Affichez une page de chargement pendant la vérification
//   if (loading) {
//     return <div>Chargement...</div>;
//   }

//   // Redirigez l'utilisateur s'il n'est pas autorisé
//   return authorized ? children : <Navigate to="/" replace />;
// };

// export default PrivateRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = ({ children, roleRequired }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!user) {
    console.log('Aucun utilisateur connecté.');
    return <Navigate to="/" replace />;
  }

  if (user.role !== roleRequired) {
    console.log(`Accès refusé. Rôle requis : ${roleRequired}, Rôle actuel : ${user.role}`);
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
