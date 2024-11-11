import React, { useState } from 'react';

export const Taches = () => {
  const task = {
    number: "1",
    duration: "168h",
    syllabus: "JavaScript",
    category: "Atelier",
    year: "2022",
    title: "Tache 00: Manipulation des variables, opérateurs et conditions",
    description: `
      Ecrire un programme en JavaScript qui demande à l’utilisateur de saisir 5 nombres
      successivement et qui lui dit ensuite qui est le plus grand, le plus petit et la moyenne.
      Le programme affiche la somme du plus petit et du plus grand nombre puis affiche le
      produit des trois nombres (le plus grand, le plus petit et la moyenne).
    `,
    usefulLinks: "undefined",
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="p-6 bg-secondaryGreen min-h-screen relative">
      {/* Conteneur pour aligner le titre, la recherche et le bouton */}
      <div className="flex justify-between items-center mb-4">
        {/* Titre  */}
        <h2 className="text-2xl font-semibold text-primaryGreen">Liste de vos tâches</h2>

        {/* Champ de recherche */}
        <div className="flex items-center bg-white rounded-lg shadow-md px-4 py-2">
          <input
            type="text"
            className="outline-none bg-transparent text-textDark"
            placeholder="Rechercher une tâche..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="bg-buttonYellow text-white font-semibold py-2 px-4 rounded-lg hover:bg-yellow-600 ml-2">
            Rechercher
          </button>
        </div>

        {/* Bouton de validation*/}
        <button className="bg-buttonYellow text-white font-semibold py-2 px-4 rounded-lg hover:bg-yellow-600">
          Tâches validées
        </button>
      </div>

      {/* Conteneur des cartes avec un espace entre les cartes */}
      <div className="flex flex-col gap-6">
        {/* Carte de tâche */}
        <div className="bg-white rounded-lg shadow-md p-6 flex gap-4">
          {/* Section gauche */}
          <div className="w-1/5 text-textDark">
            <p className="text-lg font-bold text-primaryGreen">Tâches N° {task.number}</p>
            <p>Durée: {task.duration}</p>
            <p className="mt-4 font-semibold text-primaryGreen">{task.syllabus}</p>
            <p>{task.category}</p>
            <p>{task.year}</p>
          </div>

          {/* Ligne de séparation verticale */}
          <div className="border-l border-gray-300 mx-4"></div>

          {/* Section centrale*/}
          <div className="flex-1 flex flex-col justify-between">
            {/* Titre et description */}
            <div>
              <h3 className="text-xl font-semibold text-textDark">{task.title}</h3>
              <p className="text-textLight mt-2">{task.description}</p>
            </div>

            {/* Liens utiles placés */}
            <div className="mt-4">
              <p className="font-semibold text-left">Liens utiles</p>
              <p className="text-left text-primaryGreen">{task.usefulLinks}</p>
            </div>
          </div>

          {/* Section droite */}
          <div className="flex flex-col items-end">
            <button className="bg-primaryGreen text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-700 mt-auto">
              Démarrer
            </button>
          </div>
        </div>

        {/* Ajoutez d'autres cartes ici en répétant le même modèle */}
        <div className="bg-white rounded-lg shadow-md p-6 flex gap-4">
          {/* Section gauche */}
          <div className="w-1/5 text-textDark">
            <p className="text-lg font-bold text-primaryGreen">Tâches N° {task.number}</p>
            <p>Durée: {task.duration}</p>
            <p className="mt-4 font-semibold text-primaryGreen">{task.syllabus}</p>
            <p>{task.category}</p>
            <p>{task.year}</p>
          </div>

          {/* Ligne de séparation verticale */}
          <div className="border-l border-gray-300 mx-4"></div>

          {/* Section centrale */}
          <div className="flex-1 flex flex-col justify-between">
            {/* Titre et description */}
            <div>
              <h3 className="text-xl font-semibold text-textDark">{task.title}</h3>
              <p className="text-textLight mt-2">{task.description}</p>
            </div>

            {/* Liens utiles */}
            <div className="mt-4">
              <p className="font-semibold text-left">Liens utiles</p>
              <p className="text-left text-primaryGreen">{task.usefulLinks}</p>
            </div>
          </div>

          {/* Section droite */}
          <div className="flex flex-col items-end">
            <button className="bg-primaryGreen text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-700 mt-auto">
              Démarrer
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
>>>>>>> b1c9f7bd8e0c323d8326d53a76c2b5b147e71050
