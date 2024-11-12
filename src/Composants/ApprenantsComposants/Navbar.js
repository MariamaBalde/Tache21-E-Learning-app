
import React from 'react';
import { FaBars, FaBell, FaUserCircle } from 'react-icons/fa';

const Navbar = ({ sidebarToggle, setSidebarToggle }) => {
  return (
    <div className='w-full'>
      <nav className='bg-gray-800 px-4 py-3 flex justify-between items-center fixed top-0 left-0 w-full z-10'>
    
        {/* Left Side - Hamburger menu and logo */}
        <div className='flex items-center text-xl'>
          <FaBars 
            className='text-white cursor-pointer lg:hidden' 
            onClick={() => setSidebarToggle(!sidebarToggle)} 
          />
          <span className='text-white font-semibold'>E-Learning</span>
        </div>
        
        {/* Right Side - Buttons and User menu */}
        <div className='flex items-center gap-x-5'>
          {/* Button "Envoyez mon travail" */}
          <div className='relative hidden md:block'>
            <button className="bg-yellow-600 rounded p-2 text-white">Envoyez mon travail</button>
          </div>

          {/* Bell Icon */}
          <div className='text-white'>
            <FaBell className='w-6 h-6' />
          </div>

          {/* User Menu */}
          <div className='relative'>
            <button className='text-white group'>
              <FaUserCircle className='w-6 h-6 mt-1' />
              {/* Dropdown Menu */}
              <div className='z-10 hidden absolute bg-white rounded-lg shadow w-32 group-focus:block top-full right-0'>
                <ul className='py-2 text-sm text-gray-950'>
                  <li><a href=''>Profil</a></li>
                  <li><a href=''>Settings</a></li>
                  <li><a href=''>Déconnecter</a></li>
                </ul>
              </div>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;


// import React from 'react';
// import { FaBars, FaBell, FaUserCircle } from 'react-icons/fa';

// const Navbar = ({ sidebarToggle, setSidebarToggle }) => {
//   return (
//     <div className='w-full'>
//       <nav className='bg-gray-800 px-4 py-3 flex justify-between items-center fixed top-0 left-0 w-full z-10'>
    
//         <div className='flex items-center text-xl'>
//           <FaBars 
//             className='text-white me-4 cursor-pointer' 
//             onClick={() => setSidebarToggle(!sidebarToggle)} 
//           />
//           <span className='text-white font-semibold'>E-Learning</span>
//         </div>
        
//         <div className='flex items-center gap-x-5'>
//           <div className='relative md:w-65'>
//             <button className="bg-yellow-600 rounded p-2 text-white">Envoyez mon travail</button>
//           </div>
//           <div className='text-white'>
//             <FaBell className='w-6 h-6' />
//           </div>

//           <div className='relative'>
//             <button className='text-white group'>
//               <FaUserCircle className='w-6 h-6 mt-1' />
//               <div className='z-10 hidden absolute bg-white rounded-lg shadow w-32 group-focus:block top-full right-0'>
//                 <ul className='py-2 text-sm text-gray-950'>
//                   <li><a href=''>Profil</a></li>
//                   <li><a href=''>Settings</a></li>
//                   <li><a href=''>Déconnecter</a></li>
//                 </ul>
//               </div>
//             </button>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;


// import React from 'react';
// import { FaBars, FaBell, FaUserCircle, FaEnvelope } from 'react-icons/fa';

// const Navbar = ({ sidebarToggle, setSidebarToggle }) => {
//   return (
//     <div className='w-full'>
//       <nav className='bg-gray-800 px-4 py-3 flex justify-between items-center fixed top-0 left-0 w-full z-10'>
    
//         <div className='flex items-center text-xl'>
//           <FaBars 
//             className='text-white cursor-pointer lg:hidden' 
//             onClick={() => setSidebarToggle(!sidebarToggle)} 
//           />
//           <span className='text-white font-semibold'>Interface Etudiant</span>
//         </div>
        
//         <div className='flex items-center gap-x-5'>
//           <div className='relative hidden md:block'>
//             <button className="bg-yellow-600 rounded p-2 text-white">Envoyez mon travail</button>
//           </div>

//           <div className='text-white'>
//             <FaEnvelope className='w-6 h-6' />
//           </div>
          
//           <div className='text-white'>
//             <FaBell className='w-6 h-6' />
//           </div>

          
//           <div className='relative'>
//             <button className='text-white group'>
//               <FaUserCircle className='w-6 h-6 mt-1' />
              
//               <div className='z-10 hidden absolute bg-white rounded-lg shadow w-32 group-focus:block top-full right-0'>
//                 <ul className='py-2 text-sm text-gray-950'>
//                   <li><a href=''>Profil</a></li>
//                   <li><a href=''>Settings</a></li>
//                   <li><a href=''>Déconnecter</a></li>
//                 </ul>
//               </div>
//             </button>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;