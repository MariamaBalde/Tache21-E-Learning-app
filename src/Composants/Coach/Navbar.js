
import React, { useState } from 'react';
import { FiBell, FiMail } from 'react-icons/fi'; // Icônes de messagerie et notification
import Profil from './Profil'; // Import du composant Profil si nécessaire

function Navbar() {
  
  return (
    <header className="flex justify-end items-center p-4 bg-[#191970] shadow-md relative z-10">
      {/* Icônes de notification et utilisateur */}
      <div className="flex items-center space-x-4">
        
        {/* Icône de notification */}
        <FiBell className="text-white  text-2xl cursor-pointer" />

        {/* Profil (si nécessaire) */}
        <Profil className="text-white" />
      </div>
    </header>
  );
}

export default Navbar;
