import React from 'react';

function Navbar() {
  return (
    <div className="bg-white shadow-md flex items-center justify-between px-6 py-3">
      {/* Logo */}
      <div className="text-xl font-bold text-gray-800">E-Learning</div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Rechercher..."
        className="flex-grow mx-6 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Icons */}
      <div className="flex items-center space-x-4">
        <i className="cursor-pointer text-gray-600 hover:text-blue-600">🔔</i>
        <i className="cursor-pointer text-gray-600 hover:text-blue-600">✉️</i>
        <div className="cursor-pointer text-gray-600 hover:text-blue-600">
          👤
        </div>
      </div>
    </div>
  );
}

export default Navbar;
