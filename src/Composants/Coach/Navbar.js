
import React from 'react';
import { Bell, Search } from 'lucide-react';
import { FaEnvelope, FaUserCircle } from 'react-icons/fa';


function Navbar() {
  return (
    <div className="bg-white shadow-md flex items-center justify-between px-6 py-3">
      {/* Logo */}
      {/* <div className="text-xl font-bold text-gray-800">E-Learning</div> */}

      {/* Search Bar */}
      {/* <input
        type="text"
        placeholder="Rechercher..."
        className="flex-grow mx-6 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      /> */}

<div className="flex items-center bg-white rounded-full px-4 py-2 w-1/2">
            <Search className="h-5 w-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="bg-transparent focus:outline-none flex-1"
            />
          </div>

      {/* Icons */}
      {/* <div className="flex items-center space-x-4">
        <i className="cursor-pointer text-gray-600 hover:text-blue-600">🔔</i>
        <i className="cursor-pointer text-gray-600 hover:text-blue-600">✉️</i>
        <div className="cursor-pointer text-gray-600 hover:text-blue-600">
          👤
        </div>
      </div> */}

<div className="flex items-center space-x-4">
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

