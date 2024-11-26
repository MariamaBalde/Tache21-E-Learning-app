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

