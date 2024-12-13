import React, { useState } from 'react';

// Modal Component
const Modal = ({ show, onClose, taskTitle }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-1/2 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center">{taskTitle}</h2>
        <p className="text-gray-700 mb-4 text-center">Écrivez votre commentaire ci-dessous:</p>
        <textarea
          className="w-full p-2 border rounded-md focus:outline-none focus:border-orange-500"
          rows="4"
          placeholder="Votre commentaire..."
        />
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-300"
          >
            Soumettre
          </button>
        </div>
      </div>
    </div>
  );
};

const LivraisonsEtudiant = () => {
  const tasks = [
    { id: 1, titleText: "Tâche 01", description: "Apprendre la structure de base d'une page web avec HTML." },
    { id: 2, titleText: "Tâche 02", description: "Découvrir les styles et la mise en page avec CSS." },
    { id: 3, titleText: "Tâche 03", description: "Comprendre les bases de la programmation avec JavaScript." },
    { id: 4, titleText: "Tâche 04", description: "Initier le développement d'applications avec React." },
    { id: 5, titleText: "Tâche 05", description: "Apprendre à gérer l'état global d'une application avec Redux." },
    { id: 6, titleText: "Tâche 06", description: "Utiliser TypeScript pour ajouter des types à JavaScript." },
    { id: 7, titleText: "Tâche 07", description: "Configurer Tailwind CSS pour styliser vos composants." },
    { id: 8, titleText: "Tâche 08", description: "Développer des composants React modulaires et réutilisables." },
    { id: 9, titleText: "Tâche 09", description: "Apprendre à consommer des API RESTful dans votre application." },
    { id: 10, titleText: "Tâche 10", description: "Créer et valider des formulaires utilisateurs efficaces." },
    { id: 11, titleText: "Tâche 11", description: "Implémenter des systèmes de connexion sécurisés." },
    { id: 12, titleText: "Tâche 12", description: "Améliorer les performances de votre application React." },
    { id: 13, titleText: "Tâche 13", description: "Écrire des tests unitaires pour assurer la qualité du code." },
    { id: 14, titleText: "Tâche 14", description: "Déployer votre application React sur Netlify." },
    { id: 15, titleText: "Tâche 15", description: "Mettre en place une gestion efficace des erreurs." },
    { id: 16, titleText: "Tâche 16", description: "Intégrer GraphQL pour des requêtes de données flexibles." },
    { id: 17, titleText: "Tâche 17", description: "Ajouter la prise en charge de plusieurs langues dans votre application." },
    { id: 18, titleText: "Tâche 18", description: "Rendre votre application accessible à tous les utilisateurs." },
    { id: 19, titleText: "Tâche 19", description: "Ajouter des animations fluides à vos composants avec Framer Motion." },
    { id: 20, titleText: "Tâche 20", description: "Configurer la surveillance et les logs pour votre application." },
  ];

  const [clickedHeaders, setClickedHeaders] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleHeaderClick = (id) => {
    setClickedHeaders((prevState) => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const handleModalOpen = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedTask(null);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {tasks.map((task) => (
        <div key={task.id} className="bg-white border rounded-lg shadow-md p-4 flex flex-col justify-between">
          <h3
            className={`text-lg font-semibold mb-4 text-center border-2 rounded-md py-2 px-4 cursor-pointer ${clickedHeaders[task.id] ? 'bg-orange-500 text-white' : 'bg-white text-black'
              }`}
            onClick={() => handleHeaderClick(task.id)}
          >
            {task.titleText}
          </h3>

          <div className="flex justify-center mb-4">
            <img
              src="URL_TO_YOUR_IMAGE"
              alt="Delivery icon"
              className="w-10 h-10"
            />
          </div>

          <p className="text-gray-600 text-center mb-6">{task.description}</p>

          <div className="border-2 rounded-md py-2 px-4 mt-4 flex justify-between items-center">
            <button
              onClick={() => handleModalOpen(task)}
              className="bg-white text-black font-semibold py-2 px-4 rounded-lg hover:bg-orange-500 hover:text-white transition duration-300"
            >
              Commentaires
            </button>
            <button
              className="bg-white text-black font-semibold py-2 px-4 rounded-lg hover:bg-green-500 hover:text-white transition duration-300"
            >
              Livrables
            </button>
          </div>
        </div>
      ))}
      <Modal show={showModal} onClose={handleModalClose} taskTitle={selectedTask?.titleText} />
    </div>
  );
};


export default LivraisonsEtudiant;