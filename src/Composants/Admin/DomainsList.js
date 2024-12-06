import React, { useState, useEffect } from 'react';
import { db } from '../../Config/firebaseConfig';
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { ArchiveIcon, TrashIcon, XIcon } from '@heroicons/react/solid'; // Importer les icônes

const DomainsList = () => {
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subDomains, setSubDomains] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState(null);

  // Fonction pour récupérer les domaines
  const fetchDomains = async () => {
    try {
      const domainesRef = collection(db, 'domaines');
      const querySnapshot = await getDocs(domainesRef);
      const domainsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDomains(domainsData);
      setLoading(false);
    } catch (err) {
      console.error('Erreur lors de la récupération des domaines:', err);
      setError(err);
      setLoading(false);
    }
  };

  // Fonction pour récupérer les sous-domaines d'un domaine spécifique
  const fetchSubDomains = async (domainId) => {
    try {
      const sousDomainesRef = collection(db, 'sous-domaines');
      const q = query(sousDomainesRef, where('domaineId', '==', domainId));
      const querySnapshot = await getDocs(q);
      const subDomainsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSubDomains(subDomainsData);
    } catch (err) {
      console.error('Erreur lors de la récupération des sous-domaines:', err);
    }
  };

  // Fonction pour archiver un domaine
  const toggleArchiveDomain = async (domainId, isArchived) => {
    try {
      const domainRef = doc(db, 'domaines', domainId);
      await updateDoc(domainRef, { archived: !isArchived }); // Mise à jour de l'archive
      fetchDomains(); // Recharge les domaines après modification
    } catch (err) {
      console.error("Erreur lors de l'archivage du domaine:", err);
    }
  };

  // Fonction pour supprimer un domaine
  const deleteDomain = async (domainId) => {
    try {
      const domainRef = doc(db, 'domaines', domainId);
      await deleteDoc(domainRef);
      fetchDomains(); // Recharge les domaines après suppression
    } catch (err) {
      console.error('Erreur lors de la suppression du domaine:', err);
    }
  };

  // Appel de la fonction fetchDomains pour récupérer les domaines au premier rendu
  useEffect(() => {
    fetchDomains();
  }, []);

  // Gestion de la sélection d'un domaine avec un petit délai pour forcer un re-render
  const handleSelectDomain = (domain) => {
    setSelectedDomain(null); // Réinitialiser d'abord selectedDomain
    setTimeout(() => {
      setSelectedDomain(domain); // Mettre à jour selectedDomain après un délai
      setSubDomains([]); // Réinitialise les sous-domaines avant de les récupérer
      fetchSubDomains(domain.id); // Récupère les sous-domaines pour ce domaine
    }, 100); // Délai de 100ms pour forcer un re-rendu
  };

  if (loading) {
    return <div className="text-center">Chargement des domaines...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">Erreur : {error.message}</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Liste des Domaines
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {domains.map((domain) => (
          <div
            key={domain.id}
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <h2 className="text-xl font-semibold mb-2">{domain.name}</h2>
            <p className="text-gray-600">{domain.description}</p>

            {/* Bouton pour voir les détails */}
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              onClick={() => handleSelectDomain(domain)} // Utilisation de la fonction handleSelectDomain
            >
              Voir Détails
            </button>

            {/* Icônes pour archiver ou supprimer */}
            <div className="mt-4 flex justify-between items-center">
              {/* Icône d'archivage */}
              <div className="group relative">
                <button
                  onClick={() =>
                    toggleArchiveDomain(domain.id, domain.archived)
                  }
                  className={`p-2 rounded-lg text-white hover:bg-opacity-80 transition duration-300 ${
                    domain.archived ? 'bg-green-500' : 'bg-yellow-500'
                  }`}
                >
                  {domain.archived ? (
                    <XIcon className="h-5 w-5 text-white" />
                  ) : (
                    <ArchiveIcon className="h-5 w-5 text-white" />
                  )}
                </button>
                {/* Texte au survol pour l'archivage */}
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-6 opacity-0 group-hover:opacity-100 transition duration-300 text-sm bg-black text-white p-1 rounded">
                  {domain.archived ? 'Désarchiver' : 'Archiver'}
                </span>
              </div>

              {/* Icône de suppression */}
              <div className="group relative">
                <button
                  onClick={() => deleteDomain(domain.id)}
                  className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition duration-300"
                >
                  <TrashIcon className="h-5 w-5 text-white" />
                </button>
                {/* Texte au survol pour la suppression */}
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-6 opacity-0 group-hover:opacity-100 transition duration-300 text-sm bg-black text-white p-1 rounded">
                  Supprimer
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Afficher les sous-domaines si un domaine est sélectionné */}
      {selectedDomain && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">
            Sous-domaines de {selectedDomain.name}
          </h2>
          <ul className="list-disc pl-5">
            {subDomains.length > 0 ? (
              subDomains.map((subDomain, index) => (
                <li key={index}>{subDomain.name}</li>
              ))
            ) : (
              <li>Aucun sous-domaine disponible.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DomainsList;
