<<<<<<< HEAD


=======
>>>>>>> ab53ac4f461b5bed62bb67e3418dae6b152b9b5c
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Hooks/UseAuth';

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
