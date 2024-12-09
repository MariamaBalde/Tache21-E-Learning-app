import React, { useState, useEffect } from "react";
import { FiBell, FiMail, FiX, FiSend } from "react-icons/fi";

function Navbar() {
  const [userData, setUserData] = useState({}); // Stocke les données utilisateur
  const [showModal, setShowModal] = useState(false); // État pour afficher le modal
  const [showMessagerie, setShowMessagerie] = useState(false); // État pour afficher la messagerie

  // Récupérer les données utilisateur depuis localStorage
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  // Fonction pour basculer l'affichage du modal de messagerie
  const toggleMessagerie = () => {
    setShowMessagerie(!showMessagerie);
  };

  // Fonction pour afficher/masquer le modal "Envoyer mon travail"
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md relative z-10">
      {/* Bouton "Envoyer mon travail" */}
      <button
        onClick={toggleModal}
        className="flex items-center space-x-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        <FiSend className="text-lg" />
        <span>Envoyer mon travail</span>
      </button>

      {/* Icônes de notification et profil */}
      <div className="flex items-center space-x-4 ml-3">
        {/* Icône de messagerie */}
        <FiMail
          className="text-gray-600 cursor-pointer"
          onClick={toggleMessagerie}
        />
        {/* Icône de notification */}
        <FiBell className="text-gray-600" />
        {/* Profil utilisateur */}
        <span className="text-gray-500">{userData.name || "Utilisateur"}</span>
      </div>

      {/* Modal "Envoyer mon travail" */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-100 bg-opacity-75 z-50 flex justify-center items-center">
          <div className="relative w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
            {/* Bouton de fermeture */}
            <button
              className="absolute top-4 right-4 text-gray-500"
              onClick={toggleModal}
            >
              <FiX className="text-xl" />
            </button>

            {/* Contenu du modal */}
            <h2 className="text-xl font-bold text-center mb-6">Envoyer mon travail</h2>
            <form>
              {/* Sélecteur de tâche */}
              <div className="mb-4">
                <label className="block text-gray-700">Choisir une tâche</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">-- Sélectionnez une tâche --</option>
                  <option value="1">Tâche 1</option>
                  <option value="2">Tâche 2</option>
                </select>
              </div>

              {/* Description des livrables */}
              <div className="mb-4">
                <label className="block text-gray-700">Description des livrables</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows="4"
                  placeholder="Décrivez les livrables..."
                  required
                ></textarea>
              </div>

              {/* Ajout d'images */}
              <div className="mb-4">
                <label className="block text-gray-700">Ajouter des images</label>
                <input
                  type="file"
                  className="block w-full p-2 border border-gray-300 rounded-md"
                  accept="image/*"
                  multiple
                />
              </div>

              {/* Bouton d'envoi */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-green-600"
              >
                Envoyer
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal affiché si showMessagerie est true */}
      {showMessagerie && (
        <div className="fixed inset-0 bg-gray-100 bg-opacity-75 z-50 flex justify-center items-center">
          <div className="relative w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
            {/* Bouton de fermeture */}
            <button
              className="absolute top-4 right-4 text-gray-500"
              onClick={toggleMessagerie}
            >
              <FiX className="text-xl" />
            </button>
            {/* Contenu du modal */}
            <p>Contenu de la messagerie</p>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
