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

  const [open, setOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState(""); // Nouvel état pour le menu sélectionné

  return (
    <section className='flex'>
      <div className={`bg-[#191970] min-h-screen ${open ? 'w-72' : 'w-16'} duration-500 px-4 text-gray-100`}>
        {/* <div className='py-3 flex justify-end'>
          <HiMenuAlt3 size={26} className='cursor-pointer' onClick={() => setOpen(!open)} />
        </div> */}
        <div className="mb-6">
          <img src={logo} alt="Logo" className="h-16 w-16" />
        </div>
        <div className='mt-4 flex flex-col gap-4 relative'>
          {menus.map((menu, i) => (
            <Link
              to={menu.link}
              key={i}
              className={`group flex items-center text-sm font-medium gap-3.5 text-gray-300 rounded-lg px-3 py-2 
                ${activeMenu === menu.nom ? 'bg-gray-700' : 'group-hover:bg-gray-700'} 
                ${activeMenu === menu.nom && 'bg-gray-700'}`} // Applique bg-gray-700 si l'élément est actif
              onClick={() => setActiveMenu(menu.nom)} // Lorsqu'un élément est cliqué, il devient actif
            >
              <div>{React.createElement(menu.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${!open ? "opacity-0 translate-x-28 overflow-hidden" : ""}`}
              >
                {menu.nom}
              </h2>

              {/* Tooltip qui s'affiche uniquement lorsque le menu est en mode compact */}
              <h2
                className={`${open ? "hidden" : ""} absolute left-[-48px] bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
              >
                {menu.nom}
              </h2>
            </Link>
          ))}
        </div>
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

//   const [open, setOpen] = useState(false); // État pour ouvrir/fermer la sidebar
  
//   return (
//     <section className='relative'>
//       {/* Sidebar */}
//       <div
//         className={`fixed inset-0 z-50 bg-[#191970] ${open ? 'w-72' : 'w-16'} md:w-72 duration-500 px-4 text-gray-100 
//                     `} // Affichage de la sidebar en superposition
//       >
//         <div className='py-3 flex justify-end'>
//           <HiMenuAlt3 size={26} className='cursor-pointer' onClick={() => setOpen(!open)} />
//         </div>
//         <div className='mt-4 flex flex-col gap-4'>
//           {menus.map((menu, i) => (
//             <Link
//               to={menu.link}
//               key={i}
//               className="group flex items-center text-sm font-medium gap-3.5 text-gray-300 hover:bg-gray-700 rounded-lg px-3 py-2"
//             >
//               <div>{React.createElement(menu.icon, { size: "20" })}</div>
//               <h2
//                 style={{
//                   transitionDelay: `${i + 3}00ms`,
//                 }}
//                 className={`whitespace-pre duration-500 ${!open ? "opacity-0 translate-x-28 overflow-hidden w-72 " : "w-16"} ${open ? 'block' : 'hidden'}`}
//               >
//                 {menu.nom}
//               </h2>
//               <h2
//                 className={`${open ? "hidden" : ""} absolute left-[-48px] bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
//               >
//                 {menu.nom}
//               </h2>
//             </Link>
//           ))}
//         </div>
//       </div>

//       {/* Main content */}
//       <div className='md:ml-72 p-4'>
//         <div className='text-xl text-gray-900 font-semibold'>
//           {/* Interface Coach */}
//         </div>
//       </div>
      
//       {/* Burger menu for small screens */}
//       <div className="md:hidden flex justify-between items-center p-3">
//         <HiMenuAlt3 size={26} className="cursor-pointer" onClick={() => setOpen(!open)} />
//       </div>
//     </section>
//   );
// };

// export default Sidebar;
