import React, { useState, useEffect } from 'react';
import { FiBell, FiMail, FiX } from 'react-icons/fi'; // Icônes de messagerie et de fermeture
import MessagerieCoach from './MessagerieCoach'; // Import du composant MessagerieCoach
import Profil from './Profil'; // Import du composant Profil si nécessaire

function Navbar() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  // État pour contrôler l'affichage du modal de messagerie
  const [showMessagerie, setShowMessagerie] = useState(false);
  // Fonction pour basculer l'affichage du modal
  const toggleMessagerie = () => {
    setShowMessagerie(!showMessagerie); // Inverse l'état de showMessagerie
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md relative z-10">
      <div className="flex-grow sm:max-w-xs ml-10 sm:ml-0">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 rounded-lg border border-gray-300 w-full"
        />
      </div>

      {/* Icônes de notification et utilisateur */}
      <div className="flex items-center space-x-4 ml-3">
        {/* Icône de messagerie qui déclenche l'ouverture du modal MessagerieCoach */}
        <FiMail
          className="text-gray-600 cursor-pointer"
          onClick={toggleMessagerie}
        />

        {/* Icône de notification */}
        <FiBell className="text-gray-600" />

        {/* Profil (si nécessaire) */}
        <Profil userData={userData} className="text-gray-500" />
      </div>

      {/* Modal affiché si l'état showMessagerie est true */}
      {showMessagerie && (
        <div className="fixed inset-0 bg-gray-100 bg-opacity-75 z-50 flex justify-center items-center">
          <div className="relative w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
            {/* Bouton de fermeture du modal */}
            <button
              className="absolute top-4 right-4 text-gray-500"
              onClick={toggleMessagerie} // Ferme le modal
            >
              <FiX className="text-xl" />
            </button>

            {/* Contenu du modal : composant MessagerieCoach */}
            <MessagerieCoach />
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
// original

