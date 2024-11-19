import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../Config/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Config/firebaseConfig';

const PrivateRoute = ({ roleRequired, children }) => {
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const fetchUserRole = async () => {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserRole(userDoc.data().Role);
          } else {
            setError('Utilisateur non trouvé dans la base de données');
          }
        } catch (err) {
          console.error('Erreur lors de la récupération du rôle:', err);
          setError('Erreur lors de la récupération du rôle');
        } finally {
          setLoading(false);
        }
      };
      fetchUserRole();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (userRole === roleRequired) {
    return children;
  }

  return <Navigate to="/" />;
};

export default PrivateRoute;
