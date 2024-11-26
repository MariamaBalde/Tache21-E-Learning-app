import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';

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
    console.log(
      `Accès refusé. Rôle requis : ${roleRequired}, Rôle actuel : ${user.role}`
    );
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
