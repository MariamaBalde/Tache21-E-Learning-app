import React, { useState } from 'react';

const Tache = () => {
  const task = {
    number: "1",
    duration: "168h",
    syllabus: "JavaScript",
    category: "Atelier",
    year: "2022",
    title: "Tâche 00: Manipulation des variables, opérateurs et conditions",
    description: `Ecrire un programme en JavaScript qui demande à l’utilisateur de saisir 5 nombres successivement et qui lui dit ensuite qui est le plus grand, le plus petit et la moyenne.
    Le programme affiche la somme du plus petit et du plus grand nombre puis affiche le produit des trois nombres (le plus grand, le plus petit et la moyenne).`,
    usefulLinks: "undefined",
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="p-6 bg-secondaryGreen min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-primaryGreen mb-4 md:mb-0">Liste de vos tâches</h2>

        {/* Barre de recherche */}
        <div className="flex items-center bg-white rounded-lg shadow-md px-4 py-2 w-full md:w-auto">
          <input
            type="text"
            className="outline-none bg-transparent text-textDark w-full"
            placeholder="Rechercher une tâche..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="bg-buttonYellow text-white font-semibold py-2 px-4 rounded-lg hover:bg-yellow-600 ml-2">
            Rechercher
          </button>
        </div>

        {/* Bouton de validation */}
        <button className="bg-buttonYellow text-white font-semibold py-2 px-4 rounded-lg hover:bg-yellow-600 mt-4 md:mt-0">
          Tâches validées
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {/* Carte de tâche */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/5 text-textDark">
            <p className="text-lg font-bold text-primaryGreen">Tâches N° {task.number}</p>
            <p>Durée: {task.duration}</p>
            <p className="mt-4 font-semibold text-primaryGreen">{task.syllabus}</p>
            <p>{task.category}</p>
            <p>{task.year}</p>
          </div>

          <div className="border-l border-gray-300 mx-4 md:mx-6"></div>

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold text-textDark">{task.title}</h3>
              <p className="text-textLight mt-2">{task.description}</p>
            </div>

            <div className="mt-4">
              <p className="font-semibold text-left">Liens utiles</p>
              <p className="text-left text-primaryGreen">{task.usefulLinks}</p>
            </div>
          </div>

          <div className="flex flex-col items-end">
            {/* Bouton Démarrer avec couleur verte fixe */}
            <button className="bg-green-500 text-white font-semibold py-2 px-6 rounded-lg mt-auto">
              Démarrer
            </button>
          </div>
        </div>

        {/* Section des boutons "Commentaires" et "Livrables" */}
        <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start mt-6 w-full">
          {/* Bouton Commentaires */}
          <button className="bg-buttonYellow text-white font-semibold py-2 px-4 rounded-lg hover:bg-yellow-600 w-full sm:w-auto mb-4 md:mb-0">
            Commentaires
          </button>

          {/* Bouton Livrables */}
          <button className="bg-buttonYellow text-white font-semibold py-2 px-4 rounded-lg hover:bg-yellow-600 w-full sm:w-auto">
            Livrables
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tache;
