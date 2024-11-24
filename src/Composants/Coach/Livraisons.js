import React from 'react';

const Livraisons = () => {
  const livraisons = [
    {
      etudiant: 'Mohamed fall',
      projet: 'Site web React',
      lien: '#',
      statut: 'En attente',
    },
    {
      etudiant: 'Marie Cisse',
      projet: 'Application mobile',
      lien: '#',
      statut: 'En attente',
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Liste des livraisons</h1>
      <div className="space-y-4">
        {livraisons.map((livraison, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition"
          >
            <p className="text-lg font-semibold text-gray-700">
              Étudiant : <span className="text-gray-900">{livraison.etudiant}</span>
            </p>
            <p className="text-lg text-gray-600">
              Projet : <span className="text-gray-800">{livraison.projet}</span>
            </p>
            <p className="text-sm text-blue-600 hover:underline">
              <a href={livraison.lien} target="_blank" rel="noopener noreferrer">
                Lien de livraison
              </a>
            </p>
            <div className="mt-2 flex items-center gap-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  livraison.statut === 'En attente'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-green-100 text-green-700'
                }`}
              >
                Statut : {livraison.statut}
              </span>
              <button className="px-4 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600">
                Accepter
              </button>
              <button className="px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600">
                Rejeter
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Livraisons;
