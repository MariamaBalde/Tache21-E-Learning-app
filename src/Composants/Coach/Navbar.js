
import React, { useState } from 'react';
import { FiBell, FiMail } from 'react-icons/fi'; // Icônes de messagerie et notification
import Profil from './Profil'; // Import du composant Profil si nécessaire

function Navbar({ initialUnreadMessages = 0, onMessageSend }) {
  const [unreadMessages, setUnreadMessages] = useState(initialUnreadMessages);

  // Simule l'envoi d'un message (remplacer par votre logique réelle)
  const handleNewMessage = () => {
    setUnreadMessages((prev) => prev + 1); // Incrémente les messages non lus
    if (onMessageSend) onMessageSend(); // Appeler une fonction parent si nécessaire
  };

  return (
    <header className="flex justify-end items-center p-4 bg-[#191970] shadow-md relative z-10">
      {/* Icônes de notification et utilisateur */}
      <div className="flex items-center space-x-4">
        {/* Icône de messagerie avec badge */}
        <div className="relative">
          <FiMail
            className="text-white  text-3xl cursor-pointer"
            onClick={handleNewMessage}
          />
          {/* Affichage de la notification avec le nombre de messages non lus */}
          {unreadMessages > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              {unreadMessages}
            </span>
          )}
        </div>

        {/* Icône de notification */}
        <FiBell className="text-white  text-3xl cursor-pointer" />

        {/* Profil (si nécessaire) */}
        <Profil className="text-white" />
      </div>
    </header>
  );
}

export default Navbar;
