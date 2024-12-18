import React, { useState } from 'react';

// Modal Component
const Modal = ({ show, onClose, taskTitle }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-1/2 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-3xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center text-blue-900">{taskTitle}</h2>
        <textarea
          className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-500"
          rows="4"
          placeholder="Votre commentaire..."
        />
        <div className="flex justify-center mt-4">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
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
  ];

  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleModalOpen = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedTask(null);
  };

  return (
    <div className="p-8 bg-blue-50 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white rounded-lg shadow-lg p-4 border-t-4 border-blue-900 flex flex-col justify-between"
          >
            {/* Header */}
            <h3 className="text-lg font-bold text-center text-blue-900 mb-4">{task.titleText}</h3>

            {/* Image placeholder */}
            <div className="flex justify-center mb-4">
              <img
                src="https://via.placeholder.com/150"
                alt="Icon"
                className="w-16 h-16"
              />
            </div>

            {/* Task Description */}
            <p className="text-gray-600 text-center mb-6">{task.description}</p>

            {/* Buttons */}
            <div className="flex justify-between">
              <button
                onClick={() => handleModalOpen(task)}
                className="w-1/2 py-2 mx-1 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Commentaires
              </button>
              <button
                className="w-1/2 py-2 mx-1 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Livrables
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal show={showModal} onClose={handleModalClose} taskTitle={selectedTask?.titleText} />
    </div>
  );
};

export default LivraisonsEtudiant;
