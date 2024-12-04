import React from 'react';

const CoursEtudiant = () => {
  const cours = [
    { id: 1, nom: 'Mathématiques', professeur: 'M. Dupont' },
    { id: 2, nom: 'Physique', professeur: 'Mme Martin' },
    { id: 3, nom: 'Informatique', professeur: 'M. Durand' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Mes Cours</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cours.map((cours) => (
          <div key={cours.id} className="bg-white p-4 shadow rounded">
            <h2 className="text-lg font-bold">{cours.nom}</h2>
            <p>Professeur : {cours.professeur}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursEtudiant;
