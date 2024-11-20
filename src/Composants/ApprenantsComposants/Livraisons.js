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
            className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Soumettre
          </button>
        </div>
      </div>
    </div>
  );
};

const Livraisons = () => {
  const tasks = [
    { id: 1, title: "Tâche 01", description: "Apprendre la structure de base d'une page web avec HTML." },
    { id: 2, title: "Tâche 02", description: "Découvrir les styles et la mise en page avec CSS." },
    { id: 3, title: "Tâche 03", description: "Comprendre les bases de la programmation avec JavaScript." },
    { id: 4, title: "Tâche 04", description: "Initier le développement d'applications avec React." },
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
            {task.title}
          </h3>

          <div className="flex justify-center mb-4">
            <img
              src="https://via.placeholder.com/40"  
              alt=""
              className="w-10 h-10"
            />
          </div>

          <p className="text-gray-600 text-center mb-6">{task.description}</p>

          {/* Conteneur des boutons côte à côte */}
          <div className="flex flex-row justify-center gap-4 mt-4">
            <button
              onClick={() => handleModalOpen(task)}
              className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg w-full max-w-xs text-center"
            >
              Commentaires
            </button>
            <button
              className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg w-full max-w-xs text-center"
            >
              Livrables
            </button>
          </div>
        </div>
      ))}
      {/* Le modal sera rendu conditionnellement si showModal est true */}
      {selectedTask && (
        <Modal
          show={showModal}
          onClose={handleModalClose}
          taskTitle={selectedTask.title}
        />
      )}
    </div>
  );
};

export default Livraisons;
