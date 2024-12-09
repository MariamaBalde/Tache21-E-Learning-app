import React from 'react';
import Sidebar from './Sidebar'; // Corrige l'importation
import { FiBell, FiUser, FiMail } from 'react-icons/fi';

function Navbar() {
    return (
        <header className="flex justify-between items-center p-4 bg-white shadow-md">
            {/* Champ de recherche */}
            <div className="flex-grow sm:max-w-xs ml-4">
                <input
                    type="text"
                    placeholder="Search..."
                    className="p-2 rounded-lg border border-gray-300 w-full"
                />
            </div>

            {/* Icônes de notification et utilisateur */}
            <div className="flex items-center space-x-4 ml-3">
                <FiMail className="text-gray-600" />
                <FiBell className="text-gray-600" />
                <FiUser className="text-gray-600" />
            </div>
        </header>
    );
}

export default Navbar;
