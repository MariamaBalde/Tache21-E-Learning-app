import React from 'react';
import { FaBell, FaUserCircle, FaSearch } from 'react-icons/fa';
import logo from '../../Images/ImagesAdmin/logo2.png';
import Profil from '../Coach/Profil'; // Import du composant Profil si nécessaire


const Navbar = () => {
  return (
    <nav className="bg-blue-800 shadow-lg px-4 py-0">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className=" text-blue-500 p-2">
            <img src={logo} alt="Logo" className="h-16 w-16" />
            
          </div>
        </div>

        {/* Actions : Notifications et Profil */}
        <div className="flex items-center space-x-6">
          <button className="relative">
            <FaBell className="text-white text-2xl hover:text-gray-300" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
              3
            </span>
          </button>
          {/* <button> */}
            {/* <FaUserCircle className="text-white text-2xl hover:text-gray-300" /> */}
          <Profil className="text-gray-500" />
          {/* </button> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
