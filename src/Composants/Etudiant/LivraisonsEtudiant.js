import React, { useState } from "react";
import Modal from "./Modal";

const LivraisonsEtudiant = () => {
  // Génération de 6 tâches avec des titres et des descriptions personnalisés
  const initialTasks = [
    { id: 1, titleText: "Tâche 1 : SQL", description: "Les Bases de SQL", comments: [] },
    { id: 2, titleText: "Tâche 2 : Firebase", description: "Les bases de Firebase", comments: [] },
    { id: 3, titleText: "Tâche 3 : Laravel", description: "Découverte du framework PHP Laravel", comments: [] },
    { id: 4, titleText: "Tâche 4 : Github", description: "Comment travailler avec GitHub", comments: [] },
    { id: 5, titleText: "Tâche 5 : Javascript", description: "Apprendre le JavaScript", comments: [] },
    { id: 6, titleText: "Tâche 6 : React", description: "Apprendre le React", comments: [] },
  ];

  const [tasks, setTasks] = useState(initialTasks);
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

  const handleSubmitComment = (comment) => {
    if (selectedTask) {
      const updatedTasks = tasks.map(task =>
        task.id === selectedTask.id
          ? { ...task, comments: [...task.comments, comment] }
          : task
      );
      setTasks(updatedTasks);
      handleModalClose();
    }
  };

  return (
    <div className="p-8 bg-blue-50 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white rounded-xl shadow-md p-6 border border-gray-200 flex flex-col justify-between"
          >
            <h3 className="text-lg font-bold text-center text-gray-800 mb-4">
              {task.titleText}
            </h3>
            <div className="flex justify-center mb-4">
              <img
                src="bine.jpg "
                alt="Tâche visuel"
                className="rounded-md border border-gray-300 w-full h-36 object-cover"
              />
            </div>
            <p className="text-gray-600 text-center mb-6">{task.description}</p>
            <div className="flex justify-between  items-end mt-auto">
              <button
                onClick={() => handleModalOpen(task)}
                className="py-2  bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
              >
                commentaire 
              </button>
              <button
                className="py-2  bg-indigo-700 text-white font-semibold rounded-lg hover:bg-indigo-800 transition duration-300"
              >
                Livrables
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        show={showModal}
        onClose={handleModalClose}
        taskTitle={selectedTask?.titleText}
        onSubmitComment={handleSubmitComment}
      />
    </div>
  );
};

export default LivraisonsEtudiant;