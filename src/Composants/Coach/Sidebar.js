// Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="bg-gray-800 text-white w-64 h-screen p-4">
      <h2 className="text-xl font-bold mb-4">Menu</h2>
      <ul className="space-y-4">
        <li>
          <NavLink
            to="/coach/dashboard"
            className={({ isActive }) =>
              isActive
                ? 'block p-2 bg-blue-600 rounded'
                : 'block p-2 hover:bg-gray-700 rounded'
            }
          >
            Tableau de bord
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/coach/dashboard/domains"
            className={({ isActive }) =>
              isActive
                ? 'block p-2 bg-blue-600 rounded'
                : 'block p-2 hover:bg-gray-700 rounded'
            }
          >
            Domaines
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/coach/dashboard/sous-domaines"
            className={({ isActive }) =>
              isActive
                ? 'block p-2 bg-blue-600 rounded'
                : 'block p-2 hover:bg-gray-700 rounded'
            }
          >
            Sous-domaines
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/coach/dashboard/cours"
            className={({ isActive }) =>
              isActive
                ? 'block p-2 bg-blue-600 rounded'
                : 'block p-2 hover:bg-gray-700 rounded'
            }
          >
            Cours
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/coach/dashboard/quizzes"
            className={({ isActive }) =>
              isActive
                ? 'block p-2 bg-blue-600 rounded'
                : 'block p-2 hover:bg-gray-700 rounded'
            }
          >
            Quizzes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/coach/dashboard/projets"
            className={({ isActive }) =>
              isActive
                ? 'block p-2 bg-blue-600 rounded'
                : 'block p-2 hover:bg-gray-700 rounded'
            }
          >
            Projets
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/coach/dashboard/messagerie"
            className={({ isActive }) =>
              isActive
                ? 'block p-2 bg-blue-600 rounded'
                : 'block p-2 hover:bg-gray-700 rounded'
            }
          >
            Messagerie
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

// components/Sidebar.js
// import React from "react";
// import { NavLink } from "react-router-dom";

// function Sidebar() {
//     return (
//         <div className="bg-gray-800 text-white w-64 h-screen p-4">
//             <h2 className="text-xl font-bold mb-4">Menu</h2>
//             <ul className="space-y-4">
//                 <li>
//                     <NavLink
//                         to="/dashboard"
//                         className={({ isActive }) =>
//                             isActive
//                                 ? "block p-2 bg-blue-600 rounded"
//                                 : "block p-2 hover:bg-gray-700 rounded"
//                         }
//                     >
//                         Tableau de bord
//                     </NavLink>
//                 </li>
//                 <li>
//                     <NavLink
//                         to="/domaines"
//                         className={({ isActive }) =>
//                             isActive
//                                 ? "block p-2 bg-blue-600 rounded"
//                                 : "block p-2 hover:bg-gray-700 rounded"
//                         }
//                     >
//                         Domaines
//                     </NavLink>
//                 </li>
//                 <li>
//                     <NavLink
//                         to="/sous-domaines"
//                         className={({ isActive }) =>
//                             isActive
//                                 ? "block p-2 bg-blue-600 rounded"
//                                 : "block p-2 hover:bg-gray-700 rounded"
//                         }
//                     >
//                         Sous-domaines
//                     </NavLink>
//                 </li>
//                 <li>
//                     <NavLink
//                         to="/cours"
//                         className={({ isActive }) =>
//                             isActive
//                                 ? "block p-2 bg-blue-600 rounded"
//                                 : "block p-2 hover:bg-gray-700 rounded"
//                         }
//                     >
//                         Cours
//                     </NavLink>
//                 </li>
//                 <li>
//                     <NavLink
//                         to="/quizz"
//                         className={({ isActive }) =>
//                             isActive
//                                 ? "block p-2 bg-blue-600 rounded"
//                                 : "block p-2 hover:bg-gray-700 rounded"
//                         }
//                     >
//                         Quizzes
//                     </NavLink>
//                 </li>
//                 <li>
//                     <NavLink
//                         to="/projets"
//                         className={({ isActive }) =>
//                             isActive
//                                 ? "block p-2 bg-blue-600 rounded"
//                                 : "block p-2 hover:bg-gray-700 rounded"
//                         }
//                     >
//                         Projets
//                     </NavLink>
//                 </li>
//                 <li>
//                     <NavLink
//                         to="/messagerie"
//                         className={({ isActive }) =>
//                             isActive
//                                 ? "block p-2 bg-blue-600 rounded"
//                                 : "block p-2 hover:bg-gray-700 rounded"
//                         }
//                     >
//                         Messagerie
//                     </NavLink>
//                 </li>
//                 <li>
//                     <NavLink
//                         to="/notifications"
//                         className={({ isActive }) =>
//                             isActive
//                                 ? "block p-2 bg-blue-600 rounded"
//                                 : "block p-2 hover:bg-gray-700 rounded"
//                         }
//                     >
//                         Notifications
//                     </NavLink>
//                 </li>
//                 <li>
//                     <NavLink
//                         to="/profil"
//                         className={({ isActive }) =>
//                             isActive
//                                 ? "block p-2 bg-blue-600 rounded"
//                                 : "block p-2 hover:bg-gray-700 rounded"
//                         }
//                     >
//                         Mon Profil
//                     </NavLink>
//                 </li>
//             </ul>
//         </div>
//     );
// }

// export default Sidebar;
