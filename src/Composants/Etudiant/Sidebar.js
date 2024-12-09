import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu, FiX, FiHome, FiBookOpen, FiLayers, FiClipboard, FiHelpCircle } from 'react-icons/fi';
import { FaPaperPlane, FaProjectDiagram, FaEnvelope, } from 'react-icons/fa';
import logo from '../../Images/ImagesAdmin/1.png';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  return (
    <>
      {/* Bouton pour ouvrir/fermer la sidebar sur les petits écrans */}
      <button
        className="fixed top-5 left-2 z-20 lg:hidden text-gray-600 focus:outline-none"
        onClick={toggleSidebar}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>
      {/* Overlay pour fermer la sidebar en cliquant en dehors */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-42 p-4 text-gray-100    bg-[#191970] transform transition-transform duration-300 ease-in-out z-20 ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 lg:static lg:h-screen lg:w-56`}
      >
        <img src={logo} alt="Logo" className="h-12 w-12 mb-6 mx-auto" />
        <nav>
          <ul>
            <li>
              <NavLink
                to="/etudiant/dashboard"
                className="flex items-center py-2 px-3 hover:bg-gray-700 rounded"
                activeClassName="bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <FiHome className="mr-2" />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/etudiant/dashboard/coursEtudiant"
                className="flex items-center py-2 px-3 hover:bg-gray-700 rounded"
                activeClassName="bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <FiBookOpen className="mr-2" />
                Cours
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/etudiant/dashboard/tachesEtudiant"
                className="flex items-center py-2 px-3 hover:bg-gray-700 rounded"
                activeClassName="bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <FiLayers className="mr-2" />
                Taches
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/etudiant/dashboard/livraisonsEtudiant"
                className="flex items-center py-2 px-3 hover:bg-gray-700 rounded"
                activeClassName="bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <FiClipboard className="mr-2" />
                Livraisons
              </NavLink>
            </li>
      
            <li>
              <NavLink
                to="/etudiant/dashboard/quizzesEtudiants"
                className="flex items-center py-2 px-3 hover:bg-gray-700 rounded"
                activeClassName="bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <FiHelpCircle className="mr-2" />
                Quizzes
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/etudiant/dashboard/projetsEtudiant"
                className="flex items-center py-2 px-3 hover:bg-gray-700 rounded"
                activeClassName="bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <FaProjectDiagram className="mr-2" />
                Projets
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/etudiant/dashboard/messagerieEtudiant"
                className="flex items-center py-2 px-3 hover:bg-gray-700 rounded"
                activeClassName="bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <FaEnvelope className="mr-2" />
                Messagerie
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
export default Sidebar;