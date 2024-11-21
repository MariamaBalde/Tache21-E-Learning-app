import React from 'react';

import { FaBell, FaUserCircle, FaSearch } from 'react-icons/fa';



const Navbar = () => {
  return (
    <nav className="p-4 border-b border-gray-200">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 3v11.25M3.75 14.25h10.5M12 6.75l-2.25 2.25M14.25 3.75L12 6M17.25 8.25h-4.5m7.5 6h-3.75M3.75 20.25L8.25 16m8.25 4.5l4.5-4.5M12 16.5l-2.25 2.25m4.5-2.25L12 20.25"
              />
            </svg>
            {/* <img
              src="" // Remplacez par le chemin de votre logo
              alt="Logo"
              className="w-8 h-8 object-cover"
            /> */}
          </div>
        </div>

        {/* Barre de recherche */}
        <div className="flex items-center space-x-4 flex-grow mx-4">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full bg-gray-100 rounded-full px-4 py-2 pl-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>

        {/* Actions : Notifications et Profil */}
        <div className="flex items-center space-x-6">
          <button className="relative">
            <FaBell className="text-gray-600 text-2xl hover:text-gray-900" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">3</span>
          </button>
          <button>
            <FaUserCircle className="text-gray-600 text-2xl hover:text-gray-900" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


// const Navbar = () => {
//   return (
//     <nav className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg p-4">
//       <div className="container mx-auto flex items-center justify-between">
//         {/* Logo */}
//         <div className="flex items-center space-x-2">
//           <div className="bg-white text-blue-500 p-2 rounded-full">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth="2"
//               stroke="currentColor"
//               className="w-6 h-6"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M3.75 3v11.25M3.75 14.25h10.5M12 6.75l-2.25 2.25M14.25 3.75L12 6M17.25 8.25h-4.5m7.5 6h-3.75M3.75 20.25L8.25 16m8.25 4.5l4.5-4.5M12 16.5l-2.25 2.25m4.5-2.25L12 20.25"
//               />
//             </svg>
//           </div>
//         </div>

//         {/* Barre de recherche */}
//         <div className="flex items-center space-x-4 flex-grow mx-4">
//           <div className="relative w-full max-w-md">
//             <input
//               type="text"
//               placeholder="Rechercher..."
//               className="w-full bg-white rounded-full px-4 py-2 pl-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
//             />
//             <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
//           </div>
//         </div>

//         {/* Actions : Notifications et Profil */}
//         <div className="flex items-center space-x-6">
//           <button className="relative">
//             <FaBell className="text-white text-2xl hover:text-gray-300" />
//             <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">3</span>
//           </button>
//           <button>
//             <FaUserCircle className="text-white text-2xl hover:text-gray-300" />
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


