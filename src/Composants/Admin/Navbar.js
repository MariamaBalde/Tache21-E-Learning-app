import React from 'react';
import logo from '../../Images/ImagesAdmin/logo2.png';
import Profil from '../Coach/Profil'; 


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

        {/* Actions : Profil */}
        <div className="flex items-center space-x-6">
          <Profil className="text-gray-500" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
