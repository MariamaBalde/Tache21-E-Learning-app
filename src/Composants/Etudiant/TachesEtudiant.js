
import React, { useState } from 'react';

const TachesEtudiant = () => {
  const tasks = [
    {
      number: "1",
      duration: "168h",
      syllabus: "JavaScript",
      syllabusLink: "https://developer.mozilla.org/fr/docs/Web/JavaScript",
      category: "Atelier",
      year: "2022",
      title: "Manipulation des variables, opérateurs et conditions",
      description: `
        Ecrire un programme en JavaScript qui demande à l’utilisateur de saisir 5 nombres
        successivement et qui lui dit ensuite qui est le plus grand, le plus petit et la moyenne.
        Le programme affiche la somme du plus petit et du plus grand nombre puis affiche le
        produit des trois nombres (le plus grand, le plus petit et la moyenne).
      `,
      usefulLinks: "https://developer.mozilla.org/fr/docs/Web/JavaScript",
    },
    {
      number: "2",
      duration: "72h",
      syllabus: "React",
      syllabusLink: "https://reactjs.org/docs/getting-started.html",
      category: "Projet",
      year: "2023",
      title: "Créer une application de gestion des tâches",
      description: `
        Construire une application React qui permet de créer, modifier et supprimer des tâches.
        L'application doit inclure une interface utilisateur intuitive et enregistrer les données
        localement dans le navigateur ou via une API.
      `,
      usefulLinks: "https://reactjs.org/docs/getting-started.html",
    },
  ];

  return (
    <div className="p-6 bg-secondaryGreen min-h-screen relative">
      {/* Titre et bouton principal */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-primaryGreen">Liste de vos tâches</h2>
        <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-yellow-600">
          Tâches validées
        </button>
      </div>

      {/* Conteneur des cartes */}
      <div className="flex flex-col gap-6">
        {tasks.map((task, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 flex gap-4">
            {/* Section gauche */}
            <div className="w-1/4 text-textDark">
              <p className="text-lg font-bold">Tâches N° {task.number}</p>
              <p>Durée: {task.duration}</p>
              <p className="mt-4 font-semibold text-primaryGreen">
                <a
                  href={task.syllabusLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {task.syllabus}
                </a>
              </p>
              <p>{task.category}</p>
              <p>{task.year}</p>
            </div>

            {/* Ligne de séparation verticale */}
            <div className="border-l border-gray-300 mx-4"></div>

            {/* Section centrale */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold text-textDark">{task.title}</h3>
                <p className="text-textLight mt-2">{task.description}</p>
              </div>
              <div className="mt-4">
                <p className="font-semibold">Liens utiles</p>
                {task.usefulLinks ? (
                  <a
                    href={task.usefulLinks}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Voir le lien
                  </a>
                ) : (
                  <p className="text-textLight">Aucun lien disponible</p>
                )}
              </div>
            </div>

            {/* Section droite */}
            <div className="flex flex-col items-end">
              <button className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-700">
                Démarrer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TachesEtudiant;
