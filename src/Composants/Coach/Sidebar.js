import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import logo from '../../Images/ImagesAdmin/1.png';

import {
  FaFileAlt,
  FaBook,
  FaPaperPlane,
  FaQuestionCircle,
  FaProjectDiagram,
  FaEnvelope,
  FaCog
} from 'react-icons/fa';
import { BsFillGridFill } from 'react-icons/bs';

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const menus = [
    { nom: "Dashboard", link: "/coach/dashboard", icon: MdOutlineDashboard },
    { nom: "Domaines", link: "/coach/dashboard/domains", icon: BsFillGridFill },
    { nom: "Sous-Domaines", link: "/coach/dashboard/sous-domaines", icon: FaFileAlt },
    { nom: "Cours", link: "/coach/dashboard/cours", icon: FaBook },
    { nom: "Livraisons", link: "/coach/dashboard/livraisons", icon: FaPaperPlane },
    { nom: "Quizzes", link: "/coach/dashboard/quizzes", icon: FaQuestionCircle },
    { nom: "Projets", link: "/coach/dashboard/projets", icon: FaProjectDiagram },
    { nom: "Messagerie", link: "/coach/dashboard/messagerie", icon: FaEnvelope },
    { nom: "Paramètre", link: "/coach/dashboard/parametre", icon: FaCog },
  ];

  return (
    <section className='flex'>
      <div className={`bg-[#191970] min-h-screen ${open ? 'w-72' : 'w-16'} duration-500 px-4 text-gray-100`}>
        <div className='py-3 flex justify-end'>
          <HiMenuAlt3 size={26} className='cursor-pointer' onClick={() => setOpen(!open)} />
        </div>
        <div className="mb-6">

          {/* <img src={logo} alt="Logo" className="h-16 w-16" /> */}
          
        </div>
        <div className='mt-4 flex flex-col gap-4 relative'>
          {menus.map((menu, i) => (
            <Link to={menu.link} key={i} className="group flex items-center text-sm font-medium gap-3.5 text-gray-300 hover:bg-gray-700 rounded-lg px-3 py-2">
              <div>{React.createElement(menu.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${!open ? "opacity-0 translate-x-28 overflow-hidden" : ""}`}
              >
                {menu.nom}
              </h2>

              <h2
                className={`${open ? "hidden" : ""
                  } absolute left-[-48px] bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
              >
                {menu.nom}
              </h2>
            </Link>
          ))}
        </div>
      </div>
      <div className='m-3 text-xl text-gray-900 font-semibold'>
        {/* Interface Coach */}
      </div>
    </section>
  );
};

export default Sidebar;


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { HiMenuAlt3 } from "react-icons/hi";
// import { MdOutlineDashboard } from "react-icons/md";

// import {
//     FaFileAlt,
//     FaBook,
//     FaPaperPlane,
//     FaQuestionCircle,
//     FaProjectDiagram,
//     FaEnvelope,
//     FaCog
// } from 'react-icons/fa';
// import { BsFillGridFill } from 'react-icons/bs';

// const Sidebar = () => {
//     const [open, setOpen] = useState(true);
//     const [isMobileOpen, setIsMobileOpen] = useState(false); // Nouvel état pour petit écran

//     const menus = [
//         { nom: "Dashboard", link: "/coach/dashboard", icon: MdOutlineDashboard },
//         { nom: "Domaines", link: "/coach/dashboard/domains", icon: BsFillGridFill },
//         { nom: "Sous-Domaines", link: "/coach/dashboard/sous-domaines", icon: FaFileAlt },
//         { nom: "Cours", link: "/coach/dashboard/cours", icon: FaBook },
//         { nom: "Livraisons", link: "/coach/dashboard/livraisons", icon: FaPaperPlane },
//         { nom: "Quizzes", link: "/coach/dashboard/quizzes", icon: FaQuestionCircle },
//         { nom: "Projets", link: "/coach/dashboard/projets", icon: FaProjectDiagram },
//         { nom: "Messagerie", link: "/coach/dashboard/messagerie", icon: FaEnvelope },
//         { nom: "Paramètre", link: "/coach/dashboard/parametre", icon: FaCog },
//     ];

//     return (
//         <>
//             {/* Bouton pour ouvrir la sidebar en mode mobile */}
//             <button
//                 className="fixed top-5 left-2 z-20 lg:hidden text-white"
//                 onClick={() => setIsMobileOpen(!isMobileOpen)}
//             >
//                 {isMobileOpen ? <HiMenuAlt3 size={24} /> : <HiMenuAlt3 size={24} />}
//             </button>

//             {/* Overlay en mode mobile */}
//             {isMobileOpen && (
//                 <div
//                     className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
//                     onClick={() => setIsMobileOpen(false)}
//                 ></div>
//             )}

//             <section className='flex'>
//                 <div
//                     className={`fixed top-0 left-0 min-h-screen bg-[#191970] text-gray-100 z-20 transform transition-transform duration-300 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'
//                         } lg:translate-x-0 lg:static lg:min-h-screen ${open ? 'w-72' : 'w-16'
//                         } duration-500 px-4`}
//                 >
//                     <div className='py-3 flex justify-end'>
//                         <HiMenuAlt3
//                             size={26}
//                             className='cursor-pointer lg:hidden'
//                             onClick={() => setOpen(!open)}
//                         />
//                     </div>
//                     <div className="mb-6">
//                         {/* Logo */}
//                     </div>
//                     <div className='mt-4 flex flex-col gap-4 relative'>
//                         {menus.map((menu, i) => (
//                             <Link
//                                 to={menu.link}
//                                 key={i}
//                                 className="group flex items-center text-sm font-medium gap-3.5 text-gray-300 hover:bg-gray-700 rounded-lg px-3 py-2"
//                                 onClick={() => setIsMobileOpen(false)} // Ferme la sidebar après clic sur mobile
//                             >
//                                 <div>{React.createElement(menu.icon, { size: "20" })}</div>
//                                 <h2
//                                     style={{
//                                         transitionDelay: `${i + 3}00ms`,
//                                     }}
//                                     className={`whitespace-pre duration-500 ${!open ? "opacity-0 translate-x-28 overflow-hidden" : ""
//                                         }`}
//                                 >
//                                     {menu.nom}
//                                 </h2>
//                                 <h2
//                                     className={`${open ? "hidden" : ""
//                                         } absolute left-[-48px] bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
//                                 >
//                                     {menu.nom}
//                                 </h2>
//                             </Link>
//                         ))}
//                     </div>
//                 </div>
//                 <div className='m-3 text-xl text-gray-900 font-semibold'>
//                     {/* Interface Coach */}
//                 </div>
//             </section>
//         </>
//     );
// };

// export default Sidebar;
