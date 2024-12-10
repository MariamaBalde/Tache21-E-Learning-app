
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
    <header className="flex justify-between items-center p-4 bg-white shadow-md relative z-10">
      <div className="flex-grow sm:max-w-xs ml-10 sm:ml-0">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 rounded-lg border border-gray-300 w-full"
        />
      </div>

      {/* Icônes de notification et utilisateur */}
      <div className="flex items-center space-x-4 ml-3 relative">
        {/* Icône de messagerie avec badge */}
        <div className="relative">
          <FiMail className="text-gray-600 cursor-pointer" onClick={handleNewMessage} />
          {/* Affichage de la notification avec le nombre de messages non lus */}
          {unreadMessages > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              {unreadMessages}
            </span>
          )}
        </div>

        {/* Icône de notification (sans badge ici) */}
        <FiBell className="text-gray-600 cursor-pointer" />

        {/* Profil (si nécessaire) */}
        <Profil className="text-gray-500" />
      </div>
    </header>
  );
}

export default Navbar;
