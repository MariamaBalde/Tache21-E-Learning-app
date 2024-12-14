import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiMenu,
  FiX,
  FiHome,
  FiBookOpen,
  FiLayers,
  FiClipboard,
  FiHelpCircle,
} from 'react-icons/fi';
import { FaPaperPlane, FaProjectDiagram, FaEnvelope } from 'react-icons/fa';
import logo from '../../Images/ImagesAdmin/logo2.png';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(''); // Gestion du lien actif

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsOpen(false); // Fermer la sidebar après un clic
  };

  return (
    <>
      <button
        className="fixed top-5 left-2 z-20 lg:hidden text-gray-600 focus:outline-none"
        onClick={toggleSidebar}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-full w-42 p-4 text-white font-bold bg-[#191970] transform transition-transform duration-300 ease-in-out z-20 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:h-screen lg:w-56`}
      >
        <img src={logo} alt="Logo" className="h-16 w-16 mb-6 mr-2" />
        <nav>
          <ul>
            <li>
              <NavLink
                to="/etudiant/dashboard"
                className={`flex items-center py-2 px-3 ${
                  activeLink === '/etudiant/dashboard'
                    ? 'bg-gray-400'
                    : 'hover:bg-gray-400'
                } rounded`}
                onClick={() => handleLinkClick('/etudiant/dashboard')}
              >
                <FiHome className="mr-2" />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/etudiant/dashboard/coursEtudiant"
                className={`flex items-center py-2 px-3 ${
                  activeLink === '/etudiant/dashboard/coursEtudiant'
                    ? 'bg-gray-400'
                    : 'hover:bg-gray-400'
                } rounded`}
                onClick={() => handleLinkClick('/etudiant/dashboard/coursEtudiant')}
              >
                <FiBookOpen className="mr-2" />
                Cours
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/etudiant/dashboard/tachesEtudiant"
                className={`flex items-center py-2 px-3 ${
                  activeLink === '/etudiant/dashboard/tachesEtudiant'
                    ? 'bg-gray-400'
                    : 'hover:bg-gray-400'
                } rounded`}
                onClick={() => handleLinkClick('/etudiant/dashboard/tachesEtudiant')}
              >
                <FiLayers className="mr-2" />
                Taches
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/etudiant/dashboard/livraisonsEtudiant"
                className={`flex items-center py-2 px-3 ${
                  activeLink === '/etudiant/dashboard/livraisonsEtudiant'
                    ? 'bg-gray-400'
                    : 'hover:bg-gray-400'
                } rounded`}
                onClick={() => handleLinkClick('/etudiant/dashboard/livraisonsEtudiant')}
              >
                <FiClipboard className="mr-2" />
                Livraisons
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/etudiant/dashboard/quizzesEtudiants"
                className={`flex items-center py-2 px-3 ${
                  activeLink === '/etudiant/dashboard/quizzesEtudiants'
                    ? 'bg-gray-400'
                    : 'hover:bg-gray-400'
                } rounded`}
                onClick={() => handleLinkClick('/etudiant/dashboard/quizzesEtudiants')}
              >
                <FiHelpCircle className="mr-2" />
                Quizzes
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/etudiant/dashboard/projetsEtudiant"
                className={`flex items-center py-2 px-3 ${
                  activeLink === '/etudiant/dashboard/projetsEtudiant'
                    ? 'bg-gray-400'
                    : 'hover:bg-gray-400'
                } rounded`}
                onClick={() => handleLinkClick('/etudiant/dashboard/projetsEtudiant')}
              >
                <FaProjectDiagram className="mr-2" />
                Projets
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/etudiant/dashboard/messagerieEtudiant"
                className={`flex items-center py-2 px-3 ${
                  activeLink === '/etudiant/dashboard/messagerieEtudiant'
                    ? 'bg-gray-400'
                    : 'hover:bg-gray-400'
                } rounded`}
                onClick={() => handleLinkClick('/etudiant/dashboard/messagerieEtudiant')}
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
