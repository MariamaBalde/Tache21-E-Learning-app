import React, { useState, useEffect } from 'react';
import Messagerie from '../Messagerie'; // Assurez-vous que le chemin est correct
import { useAuth } from '../../Hooks/useAuth'; // Importer le hook d'authentification
import Loader from '../Shared/Loader'; // Importer le composant Loader

const MessagerieCoach = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true); // État de chargement

  useEffect(() => {
    if (user) {
      setLoading(false); // Si l'utilisateur est authentifié, arrêter le chargement
    } else {
      setLoading(true); // Si l'utilisateur n'est pas authentifié, afficher le chargement
    }
  }, [user]);

  if (loading) {
    return <Loader />; // Afficher le loader pendant le chargement
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Messagerie Coach</h1>
      <Messagerie />
    </div>
  );
};

export default MessagerieCoach;