import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../Config/firebaseConfig'; // Assurez-vous que cela pointe vers Firebase correctement

const ProtectedRoute = ({ role, children }) => {
  const currentUser = auth.currentUser;

  // Exemple de vérification (ajustez selon vos données Firebase)
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // Vérifiez le rôle (ajustez en fonction de votre logique utilisateur)
  const userRole = currentUser.role; // Remplacez par la méthode pour obtenir le rôle
  if (role && userRole !== role) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
