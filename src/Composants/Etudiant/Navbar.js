import React, { useState, useEffect } from "react";
import { FiBell, FiMail, FiX, FiSend } from "react-icons/fi";
import Profil from "../Coach/Profil";

const Navbar = ({ onAddTask }) => {
  const [userData, setUserData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("profileData");
    if (storedUserData) {
      try {
        const parsedData = JSON.parse(storedUserData);
        setUserData(parsedData);
      } catch (error) {
        console.error("Erreur lors de la lecture des données utilisateur :", error);
      }
    }
  }, []);

  const toggleModal = () => setShowModal(!showModal);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedTask || !description) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    onAddTask({
      task: selectedTask,
      description,
      file: file ? file.name : "Aucun fichier",
      date: new Date().toLocaleDateString(),
    });

    setSelectedTask("");
    setDescription("");
    setFile(null);

    toggleModal();
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      {/* Bouton "Envoyer mon travail" centré */}
      <div className="flex-grow flex justify-center">
        <button
          onClick={toggleModal}
          className="flex items-center space-x-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <FiSend className="text-lg" />
          <span>Envoyer mon travail</span>
        </button>
      </div>

      {/* Icônes de messagerie, notification et profil utilisateur */}
      <div className="flex items-center space-x-4">
        <FiMail
          className="text-gray-600 cursor-pointer"
          onClick={() => console.log("Messagerie ouverte")}
        />
        <FiBell className="text-gray-600" />
        <Profil className="text-gray-500" />
      </div>

      {/* Modal pour soumettre une tâche */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-100 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-md">
            <button
              onClick={toggleModal}
              className="absolute top-4 right-4 text-gray-500"
            >
              <FiX className="text-xl" />
            </button>
            <h2 className="text-xl font-bold mb-6">Envoyer mon travail</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Choisir une tâche</label>
                <select
                  value={selectedTask}
                  onChange={(e) => setSelectedTask(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="">-- Sélectionnez une tâche --</option>
                  <option value="Tâche 1">Tâche 1</option>
                  <option value="Tâche 2">Tâche 2</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">
                  Description des livrables
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  rows="4"
                  placeholder="Décrivez les livrables..."
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Ajouter des images</label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
              >
                Envoyer
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
