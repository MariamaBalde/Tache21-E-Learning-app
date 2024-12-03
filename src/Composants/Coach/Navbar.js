import React from 'react';
import { Bell, Search } from 'lucide-react';
import { FaEnvelope, FaUserCircle } from 'react-icons/fa';

function Navbar() {
  return (
    <div className="bg-gray-50 shadow-md flex items-center justify-between lg:flex-row md:flex-row sm:flex-row px-6 py-3">
      {/* Barre de recherche */}
      <div className="flex items-center bg-white rounded-full px-4 py-2 lg:w-1/3 sm:w-[10px]">
        <Search className="h-5 w-5 text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Rechercher..."
          className="bg-transparent focus:outline-none "
        />
      </div>

      {/* Icônes de notifications et utilisateur */}
      <div className="flex items-center space-x-4 ">
        <button className="p-2 bg-white rounded-full">
          <Bell className="h-5 w-5 text-gray-600" />
        </button>
        <button className="p-2 bg-white rounded-full">
          <FaEnvelope className="h-5 w-5 text-gray-600" />
        </button>
        <button className="p-2 bg-white rounded-full">
          <FaUserCircle className="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}

export default Navbar;


