import React, { useState } from "react";

const Modal = ({ show, onClose, taskTitle, onSubmitComment }) => {
  const [comment, setComment] = useState("");

  if (!show) return null;

  const handleSubmit = () => {
    onSubmitComment(comment);
    setComment("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">{taskTitle || "Titre de la tâche"}</h2>
        <textarea
          className="w-full h-32 p-2 border border-gray-300 rounded mb-4"
          placeholder="Écrivez votre commentaire ici..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-green-600"
          >
            Soumettre
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

