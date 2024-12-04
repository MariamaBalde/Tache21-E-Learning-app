import React from 'react';
import { FiBell, FiUser, FiMail } from 'react-icons/fi'; // Import de l'icône de messagerie
function Navbar() {
    return (
        <header className="flex justify-between items-center p-4 bg-white shadow-md">
            <div className="flex-grow sm:max-w-xs ml-10 sm:ml-0">
                <input
                    type="text"
                    placeholder="Search..."
                    className="p-2 rounded-lg border border-gray-300 w-full"
                />
            </div>
            <div className="flex items-center space-x-4 ml-3">
                <FiMail className="text-gray-600" />
                <FiBell className="text-gray-600" />
                <FiUser className="text-gray-600" />
            </div>
        </header>
    );
}

export default Navbar;
