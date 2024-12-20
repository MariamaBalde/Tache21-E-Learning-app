import React from 'react';
import { FiBell } from 'react-icons/fi'; // Icônes de notification
import Profil from './Profil'; // Import du composant Profil

function Navbar() {
  return (
    <header className="flex justify-between items-center p-4 bg-[#191970] shadow-md relative z-10">
      {/* Nom du projet avec animation */}
      <div className="text-white text-xl ml-7 font-bold transition-transform duration-300 hover:scale-105">
        AAR DIANGUE
      </div>

      {/* Icônes de notification et profil */}
      <div className="flex items-center space-x-4">
        {/* Icône de notification */}
        <FiBell className="text-white text-2xl cursor-pointer hover:text-gray-300 transition" />

        {/* Profil (si nécessaire) */}
        <Profil className="text-white" />
      </div>
    </header>
  );
}

export default Navbar;