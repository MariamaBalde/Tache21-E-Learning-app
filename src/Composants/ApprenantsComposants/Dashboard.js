import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar';
import Navbar from './Navbar';
import { FaSearch } from 'react-icons/fa'; // Icône de recherche

const Dashbord = ({ sidebarToggle, setSidebarToggle }) => {
  const [date, setDate] = useState(null);

  return (
    <div>
      <div className={`${sidebarToggle ? 'ml-64' : ''} w-full`}>
        <Navbar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
      </div>
      {/* Main Content */}
      <main className="flex-1 p-8 mt-20 ml-80 w-full">
        {/* Dashboard Section */}
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-[#f8492a] rounded-2xl w-full h-40 flex flex-col gap-4 items-center justify-center p-4">
            <h1 className="text-lg font-semibold">Card 1</h1>
          </div>
          <div className="bg-[#478b56] rounded-2xl w-full h-40 flex flex-col gap-4 items-center justify-center p-4">
            <h1 className="text-lg font-semibold">Card 2</h1>
          </div>
          <div className="bg-[#d16923] rounded-2xl w-full h-40 flex flex-col gap-4 items-center justify-center p-4">
            <h1 className="text-lg font-semibold">Card 3</h1>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-[#e2d9d7] w-full mt-7 p-5 rounded-lg">
          <div className="flex flex-col lg:flex-row items-center justify-between space-x-4">
            {/* Left side: Icon and Input */}
            <div className="flex items-center gap-x-3 w-full lg:w-auto mb-4 lg:mb-0">
              <FaSearch className="text-gray-600 w-5 h-5" />
              <input
                type="text"
                className="font-semibold p-2 bg-[#e2d9d7] placeholder-black rounded-md w-full"
                placeholder="Recherche une livraison"
              />
            </div>
            {/* Right side: Calendar */}
            <div className="relative ml-auto w-full lg:w-auto">
              <Calendar
                value={date}
                onChange={(e) => setDate(e.value)}
                showIcon
                className="mt-0 w-full lg:w-auto"
                style={{ display: 'inline-block' }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashbord;


// import React, { useState } from 'react';
// import { Calendar } from 'primereact/calendar';
// import Navbar from './Navbar';
// import { FaSearch } from 'react-icons/fa'; // Icône de recherche

// const Dashbord = ({ sidebarToggle, setSidebarToggle }) => {
//   const [date, setDate] = useState(null);

//   return (
//     <div>
//       <div className={`${sidebarToggle ? 'ml-64' : ''} w-full`}>
//         <Navbar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
//       </div>
//       {/* Main Content */}
//       <main className="flex-1 p-8 mt-20 ml-80 w-full">
//         {/* Dashboard Section */}
//         <div className="grid lg:grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           <div className="bg-[#f8492a] rounded-2xl w-full h-40 flex flex-col gap-4 items-center justify-center p-4">
//             <h1 className="text-lg font-semibold"></h1>
//           </div>
//           <div className="bg-[#478b56] rounded-2xl w-full h-40 flex flex-col gap-4 items-center justify-center p-4">
//             <h1 className="text-lg font-semibold"></h1>
//           </div>
//           <div className="bg-[#d16923] rounded-2xl w-full h-40 flex flex-col gap-4 items-center justify-center p-4">
//             <h1 className="text-lg font-semibold"></h1>
//           </div>
//         </div>

//         {/* Search Section */}
//         <div className="bg-[#e2d9d7] w-full mt-7 p-5 rounded-lg">
//           <div className="flex items-center justify-between space-x-4">
//             {/* Left side: Icon and Input */}
//             <div className="flex items-center gap-x-3">
//               <FaSearch className="text-gray-600 w-5 h-5" />
//               <input
//                 type="text"
//                 className="font-semibold p-2 bg-[#e2d9d7] placeholder-black rounded-md"
//                 placeholder="Recherche une livraison"
//               />
//             </div>
//             {/* Right side: Calendar */}
//             <div className="relative flex ml-auto">
//             <p>jj/mm/aaaa</p>
//               <Calendar
//                 value={date}
//                 onChange={(e) => setDate(e.value)}
//                 showIcon
//                 className="mt-0"
//                 style={{ display: 'inline-block' }}
//               />
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashbord;



// import React, { useState } from 'react'
// import { Calendar } from 'primereact/calendar';
// import Navbar from './Navbar';


// const Dashbord = ({sidebarToggle, setSidebarToggle}) => {
//     const [date, setDate] = useState(null);
//   return (
//     <div>
//         <div className={`${sidebarToggle ? "ml-64" : ""}w-full`}>
//         <Navbar
//         sidebarToggle={sidebarToggle}
//         setSidebarToggle={setSidebarToggle} />
//         </div>
//     {/* Dhasbord */}
//         <div className='container p-10 pt-16 mt-5 ml-64'>
//     <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-72'>
//         <div
//             className='bg-[#f8492a] rounded-2xl w-64 h-40 flex flex-col gap-4 items-center justify-center p-4 py-7'>
//             <div className='text-4xl mb-4'></div>
//             <h1 className='text-lg font-semibold text-center px-3'>
//             </h1>
//         </div>
//         <div
//             className='bg-[#478b56] rounded-2xl w-64 h-40 flex flex-col gap-4 items-center justify-center p-4 py-7'>
//             <div className='text-4xl mb-4'></div>
//             <h1 className='text-lg font-semibold text-center px-3'>
//             </h1>
//         </div>
//         <div
//             className='bg-[#d16923] rounded-2xl w-64 h-40 flex flex-col gap-4 items-center justify-center p-4 py-7'>
//             <div className='text-4xl mb-4'></div>
//             <h1 className='text-lg font-semibold text-center px-3'>
//             </h1>
//         </div>
//     </div>

//     <div className="bg-[#e2d9d7] w-full mt-7 p-3">
//     <div className="flex items-center justify-between space-x-4">
//     <h1 className='text-lg font-semibold p-3'>
//          <span className="pi pi-search"></span> Recherche une livraison
//          </h1>
//     <div className="relative">
//              <Calendar
//           value={date}
//           onChange={(e) => setDate(e.value)}
//           showIcon
//           className="mt-0"
//           style={{ display: 'inline-block' }} />
//         </div>
//     </div>
//     </div>

//   </div>
//   </div>
    
//   )
// }

// export default Dashbord







// import React, { useState } from 'react';
// import { Calendar } from 'primereact/calendar';
// import Navbar from './Navbar';
// import { FaSearch } from 'react-icons/fa';

// const Dashbord = ({ sidebarToggle, setSidebarToggle }) => {
//   const [date, setDate] = useState(null);

//   return (
//     <div>
//       <div className={`${sidebarToggle ? 'ml-64' : ''} w-full`}>
//         <Navbar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
//       </div>
//       {/* Main Content */}
//       <main className="flex-1 p-8 mt-20 ml-80 w-92">
//         {/* Dashboard Section */}
//         <div className="grid lg:grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           <div className="bg-[#f8492a] rounded-2xl w-full h-40 flex flex-col gap-4 items-center justify-center p-4">
//             <h1 className="text-lg font-semibold">Card 1</h1>
//           </div>
//           <div className="bg-[#478b56] rounded-2xl w-full h-40 flex flex-col gap-4 items-center justify-center p-4">
//             <h1 className="text-lg font-semibold">Card 2</h1>
//           </div>
//           <div className="bg-[#d16923] rounded-2xl w-full h-40 flex flex-col gap-4 items-center justify-center p-4">
//             <h1 className="text-lg font-semibold">Card 3</h1>
//           </div>
//         </div>

//         {/* Search Section */}
//         <div className="bg-[#e2d9d7] w-full mt-7 p-5 rounded-lg">
//           <div className="flex flex-col lg:flex-row items-center justify-between space-x-4">
//             {/* Left side: Icon and Input */}
//             <div className="flex items-center gap-x-3 w-full lg:w-auto mb-4 lg:mb-0">
//               <FaSearch className="text-gray-600 w-5 h-5" />
//               <input
//                 type="text"
//                 className="font-semibold p-2 bg-[#e2d9d7] placeholder-black rounded-md w-full"
//                 placeholder="Recherche une livraison"
//               />
//             </div>
//             {/* Right side: Calendar */}
//             <div className="relative ml-auto w-full lg:w-auto">
//               <Calendar
//                 value={date}
//                 onChange={(e) => setDate(e.value)}
//                 showIcon
//                 className="mt-0 w-full lg:w-auto"
//                 style={{ display: 'inline-block' }}
//               />
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashbord;


