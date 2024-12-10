// The best
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu, FiX, FiHome, FiBookOpen, FiLayers, FiClipboard, FiHelpCircle } from 'react-icons/fi';
import { FaPaperPlane, FaProjectDiagram, FaEnvelope, } from 'react-icons/fa';

import logo from '../../Images/ImagesAdmin/1.png';
const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeLink, setActiveLink] = useState(''); // Ajout d'un état pour le lien actif

    const toggleSidebar = () => setIsOpen(!isOpen);

    // Fonction pour définir le lien actif
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
                className={`fixed top-0 left-0 h-full w-42 p-4 text-white  font-bold bg-[#191970] transform transition-transform duration-300 ease-in-out z-20 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0 lg:static lg:h-screen lg:w-56`}
            >
                <img src={logo} alt="Logo" className="h-16 w-16 mb-6  mr-2" />
                <nav>
                    <ul>
                        <li>
                            <NavLink
                                to="/coach/dashboard"
                                className={`flex items-center py-2 px-3 ${activeLink === '/coach/dashboard' ? 'bg-gray-400' : 'hover:bg-gray-400'} rounded`}
                                onClick={() => handleLinkClick('/coach/dashboard')}
                            >
                                <FiHome className="mr-2" />
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/coach/dashboard/domains"
                                className={`flex items-center py-2 px-3 ${activeLink === '/coach/dashboard/domains' ? 'bg-gray-400' : 'hover:bg-gray-400'} rounded`}
                                onClick={() => handleLinkClick('/coach/dashboard/domains')}
                            >
                                <FiBookOpen className="mr-2" />
                                Domaines
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/coach/dashboard/sous-domaines"
                                className={`flex items-center py-2 px-3 ${activeLink === '/coach/dashboard/sous-domaines' ? 'bg-gray-400' : 'hover:bg-gray-400'} rounded`}
                                onClick={() => handleLinkClick('/coach/dashboard/sous-domaines')}
                            >
                                <FiLayers className="mr-2" />
                                Sous-domaines
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/coach/dashboard/cours"
                                className={`flex items-center py-2 px-3 ${activeLink === '/coach/dashboard/cours' ? 'bg-gray-400' : 'hover:bg-gray-400'} rounded`}
                                onClick={() => handleLinkClick('/coach/dashboard/cours')}
                            >
                                <FiClipboard className="mr-2" />
                                Cours
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/coach/dashboard/livraisons"
                                className={`flex items-center py-2 px-3 ${activeLink === '/coach/dashboard/livraisons' ? 'bg-gray-400' : 'hover:bg-gray-400'} rounded`}
                                onClick={() => handleLinkClick('/coach/dashboard/livraisons')}
                            >
                                <FaPaperPlane className="mr-2" />
                                Livraisons
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/coach/dashboard/quizzes"
                                className={`flex items-center py-2 px-3 ${activeLink === '/coach/dashboard/quizzes' ? 'bg-gray-400' : 'hover:bg-gray-400'} rounded`}
                                onClick={() => handleLinkClick('/coach/dashboard/quizzes')}
                            >
                                <FiHelpCircle className="mr-2" />
                                Quizzes
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/coach/dashboard/projets"
                                className={`flex items-center py-2 px-3 ${activeLink === '/coach/dashboard/projets' ? 'bg-gray-400' : 'hover:bg-gray-400'} rounded`}
                                onClick={() => handleLinkClick('/coach/dashboard/projets')}
                            >
                                <FaProjectDiagram className="mr-2" />
                                Projets
                            </NavLink>
                        </li>
                        {/* <li>
                            <NavLink
                                to="/coach/dashboard/messagerie"
                                className={`flex items-center py-2 px-3 ${activeLink === '/coach/dashboard/messagerie' ? 'bg-gray-400' : 'hover:bg-gray-400'} rounded`}
                                onClick={() => handleLinkClick('/coach/dashboard/messagerie')}
                            >
                                <FaEnvelope className="mr-2" />
                                Messagerie
                            </NavLink>
                        </li> */}
                    </ul>
                </nav>
            </div>
        </>
    );
};


export default Sidebar;

// The best
