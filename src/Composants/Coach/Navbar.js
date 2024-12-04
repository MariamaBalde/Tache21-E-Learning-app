
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

