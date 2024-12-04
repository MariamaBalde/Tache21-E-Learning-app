
// import React from 'react';

// import  { useState } from "react";

// function Navbar({ notifications }) {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => setIsOpen(!isOpen);

//   return (
//     <div className="bg-white shadow-md flex items-center justify-between px-6 py-3">
//       {/* Logo */}
//       <div className="text-xl font-bold text-gray-800">E-Learning</div>

//       {/* Search Bar */}
//       <input
//         type="text"
//         placeholder="Rechercher..."
//         className="flex-grow mx-6 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />

//       {/* Icons */}
//       <div className="flex items-center space-x-4 relative">
//         {/* Icone de Notification */}
//         <div
//           className="relative cursor-pointer text-gray-600 hover:text-blue-600"
//           onClick={toggleMenu}
//         >
//           🔔
//           {/* Badge de notification */}
//           {notifications.length > 0 && (
//             <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//               {notifications.length}
//             </span>
//           )}
//         </div>

//         {/* Menu déroulant */}
//         {isOpen && (
//           <div className="absolute top-10 right-0 bg-white shadow-lg border rounded-lg w-64">
//             <ul className="p-4 space-y-2">
//               {notifications.map((notification) => (
//                 <li
//                   key={notification.id}
//                   className="text-gray-700 hover:bg-gray-100 p-2 rounded"
//                 >
//                   <p>{notification.message}</p>
//                   <small className="text-gray-500">{notification.date}</small>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* Autres icônes */}
//         <i className="cursor-pointer text-gray-600 hover:text-blue-600">✉️</i>
//         <div className="cursor-pointer text-gray-600 hover:text-blue-600">
//           👤
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;


// // function Navbar() {
// //   return (
// //     <div className="bg-white shadow-md flex items-center justify-between px-6 py-3">
// //       {/* Logo */}
// //       <div className="text-xl font-bold text-gray-800">E-Learning</div>

// //       {/* Search Bar */}
// //       <input
// //         type="text"
// //         placeholder="Rechercher..."
// //         className="flex-grow mx-6 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
// //       />

// //       {/* Icons */}
// //       <div className="flex items-center space-x-4">
// //         <i className="cursor-pointer text-gray-600 hover:text-blue-600">🔔</i>
// //         <i className="cursor-pointer text-gray-600 hover:text-blue-600">✉️</i>
// //         <div className="cursor-pointer text-gray-600 hover:text-blue-600">
// //           👤
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Navbar;


import React from 'react';
import { Bell, Search} from 'lucide-react';
import { FaEnvelope } from "react-icons/fa";

import Profil from './Profil';



function Navbar() {
  return (
    <div className="bg-white shadow-md flex items-center justify-between px-6 py-3">

<div className="flex items-center bg-white rounded-full px-4 py-2 w-1/2">
            <Search className="h-5 w-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="bg-transparent focus:outline-none flex-1"
            />
          </div>
<div className="flex items-center space-x-4">
            <button className="p-2 bg-white rounded-full">
              <Bell className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 bg-white rounded-full">      <FaEnvelope className="h-5 w-5 text-gray-600" />

            </button>
            <button className="p-2 bg-white rounded-full">
             <Profil className="h-5 w-5 text-gray-600" />
           </button>
          </div>
    </div>
  );
}

export default Navbar;


<<<<<<< HEAD

// import React from 'react';
// import { Bell, Search } from 'lucide-react';
// import { FaEnvelope, FaUserCircle } from 'react-icons/fa';



// function Navbar() {
//   return (
//     <div className="bg-white shadow-md flex items-center justify-between px-6 py-3">

// <div className="flex items-center bg-white rounded-full px-4 py-2 w-1/2">
//             <Search className="h-5 w-5 text-gray-400 mr-2" />
//             <input
//               type="text"
//               placeholder="Rechercher..."
//               className="bg-transparent focus:outline-none flex-1"
//             />
//           </div>
// <div className="flex items-center space-x-4">
//             <button className="p-2 bg-white rounded-full">
//               <Bell className="h-5 w-5 text-gray-600" />
//             </button>
//             <button className="p-2 bg-white rounded-full">
//               <FaEnvelope className="h-5 w-5 text-gray-600" />
//             </button>
//             <button className="p-2 bg-white rounded-full">
//              <FaUserCircle className="h-5 w-5 text-gray-600" />
             
//            </button>
//           </div>
//     </div>
//   );
// }

// export default Navbar;
=======
>>>>>>> e5baf145465b5712423f8bad44e829df944cd4b5
