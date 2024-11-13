
import React from 'react';
import { FaBars, FaBell, FaUserCircle, FaEnvelope } from 'react-icons/fa';

const Navbar = ({ sidebarToggle, setSidebarToggle }) => {
  return (
    <nav className="bg-gray-800 fixed top-0 left-0 w-full z-10 flex justify-between items-center px-4 py-3">
      <div className="flex items-center text-xl">
        {/* Bouton hamburger visible en petit écran */}
        <FaBars
          className="text-white cursor-pointer lg:hidden"
          onClick={() => setSidebarToggle(!sidebarToggle)}
        />
        <span className="text-white font-semibold ml-2">Interface Etudiant</span>
      </div>
      <div className="flex items-center gap-x-5">
        <button className="bg-yellow-600 rounded p-2 text-white hidden md:block">Envoyez mon travail</button>
        <FaEnvelope className="text-white w-6 h-6" />
        <FaBell className="text-white w-6 h-6" />
        <button className="text-white">
          <FaUserCircle className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

