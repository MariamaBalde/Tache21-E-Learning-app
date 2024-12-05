import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu, FiX,FiHome, FiBookOpen, FiLayers, FiClipboard, FiHelpCircle } from 'react-icons/fi';
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
                className={`fixed top-0 left-0 h-full w-42 p-4 text-sky-950 text-lg font-bold  bg-gradient-to-b from-white to-blue-800 transform transition-transform duration-300 ease-in-out z-20 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0 lg:static lg:h-screen lg:w-56`}
            >
                <img src={logo} alt="Logo" className="h-12 w-12 mb-6 mx-auto" />
                <nav>
                    <ul>
                        <li>
                            <NavLink
                                to="/coach/dashboard"
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
                                to="/coach/dashboard/domains"
                                className="flex items-center py-2 px-3 hover:bg-gray-700 rounded"
                                activeClassName="bg-gray-700"
                                onClick={() => setIsOpen(false)}
                            >
                                <FiBookOpen className="mr-2" />
                                Domaines
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/coach/dashboard/sous-domaines"
                                className="flex items-center py-2 px-3 hover:bg-gray-700 rounded"
                                activeClassName="bg-gray-700"
                                onClick={() => setIsOpen(false)}
                            >
                                <FiLayers className="mr-2" />
                                Sous-domaines
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/coach/dashboard/cours"
                                className="flex items-center py-2 px-3 hover:bg-gray-700 rounded"
                                activeClassName="bg-gray-700"
                                onClick={() => setIsOpen(false)}
                            >
                                <FiClipboard className="mr-2" />
                                Cours
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/coach/dashboard/livraisons"
                                className="flex items-center py-2 px-3 hover:bg-gray-700 rounded"
                                activeClassName="bg-gray-700"
                                onClick={() => setIsOpen(false)}
                            >
                                <FaPaperPlane className="mr-2" />
                                Livraisons
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/coach/dashboard/quizzes"
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
                                to="/coach/dashboard/projets"
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
                                to="/coach/dashboard/messagerie"
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




// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { HiMenuAlt3 } from "react-icons/hi";
// import { MdOutlineDashboard } from "react-icons/md";
// import logo from '../../Images/ImagesAdmin/1.png';

// import {
//   FaFileAlt,
//   FaBook,
//   FaPaperPlane,
//   FaQuestionCircle,
//   FaProjectDiagram,
//   FaEnvelope,
//   FaCog
// } from 'react-icons/fa';
// import { BsFillGridFill } from 'react-icons/bs';


// const Sidebar = () => {
//   const menus = [
//     { nom: "Dashboard", link: "/coach/dashboard", icon: MdOutlineDashboard },
//     { nom: "Domaines", link: "/coach/dashboard/domains", icon: BsFillGridFill },
//     { nom: "Sous-Domaines", link: "/coach/dashboard/sous-domaines", icon: FaFileAlt },
//     { nom: "Cours", link: "/coach/dashboard/cours", icon: FaBook },
//     { nom: "Livraisons", link: "/coach/dashboard/livraisons", icon: FaPaperPlane },
//     { nom: "Quizzes", link: "/coach/dashboard/quizzes", icon: FaQuestionCircle },
//     { nom: "Projets", link: "/coach/dashboard/projets", icon: FaProjectDiagram },
//     { nom: "Messagerie", link: "/coach/dashboard/messagerie", icon: FaEnvelope },
//     { nom: "Paramètre", link: "/coach/dashboard/parametre", icon: FaCog },
//   ];

//   const [open, setOpen] = useState(true);
//   const [activeMenu, setActiveMenu] = useState(""); // Nouvel état pour le menu sélectionné

//   return (
//     <section className='flex'>
//       <div className={`bg-[#191970] min-h-screen ${open ? 'w-72' : 'w-16'} duration-500 px-4 text-gray-100`}>
//         {/* <div className='py-3 flex justify-end'>
//           <HiMenuAlt3 size={26} className='cursor-pointer' onClick={() => setOpen(!open)} />
//         </div> */}
//         <div className="mb-6">
//           <img src={logo} alt="Logo" className="h-16 w-16" />
//         </div>
//         <div className='mt-4 flex flex-col gap-4 relative'>
//           {menus.map((menu, i) => (
//             <Link
//               to={menu.link}
//               key={i}
//               className={`group flex items-center text-sm font-medium gap-3.5 text-gray-300 rounded-lg px-3 py-2 
//                 ${activeMenu === menu.nom ? 'bg-gray-700' : 'group-hover:bg-gray-700'} 
//                 ${activeMenu === menu.nom && 'bg-gray-700'}`} // Applique bg-gray-700 si l'élément est actif
//               onClick={() => setActiveMenu(menu.nom)} // Lorsqu'un élément est cliqué, il devient actif
//             >
//               <div>{React.createElement(menu.icon, { size: "20" })}</div>
//               <h2
//                 style={{
//                   transitionDelay: `${i + 3}00ms`,
//                 }}
//                 className={`whitespace-pre duration-500 ${!open ? "opacity-0 translate-x-28 overflow-hidden" : ""}`}
//               >
//                 {menu.nom}
//               </h2>

//               {/* Tooltip qui s'affiche uniquement lorsque le menu est en mode compact */}
//               <h2
//                 className={`${open ? "hidden" : ""} absolute left-[-48px] bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
//               >
//                 {menu.nom}
//               </h2>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Sidebar;

