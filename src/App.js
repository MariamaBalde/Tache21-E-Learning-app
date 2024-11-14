// src/App.js
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "./Composants/ApprenantsComposants/Dashboard";
// src/App.js


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Dashboard />
      </div>
    </BrowserRouter>
  );
}

export default App;


// 3
// // src/App.js
// import React from 'react';
// import Dashboard from './Composants/ApprenantsComposants/Dashboard';

// function App() {
//   return (
//     <div className="App">
//       <Dashboard />
//     </div>
//   );
// }

// export default App;



// src/components/Sidebar.js
// import React from 'react';
// import { CalendarIcon, CogIcon, BookOpenIcon, LogoutIcon } from '@heroicons/react/outline';

// const Sidebar = () => {
//   return (
//     <div className="w-64 h-full bg-gradient-to-b from-gray-900 to-gray-800 p-4 text-white">
//       <div className="mb-10">
//         <h1 className="text-2xl font-bold">Logo</h1>
//       </div>
//       <nav className="flex flex-col space-y-4">
//         <a href="#dashboard" className="flex items-center space-x-2">
//           <CalendarIcon className="h-6 w-6" />
//           <span>Dashboard</span>
//         </a>
//         <a href="#explore" className="flex items-center space-x-2">
//           <BookOpenIcon className="h-6 w-6" />
//           <span>Explore</span>
//         </a>
//         <a href="#settings" className="flex items-center space-x-2">
//           <CogIcon className="h-6 w-6" />
//           <span>Settings</span>
//         </a>
//         <a href="#logout" className="flex items-center space-x-2">
//           <LogoutIcon className="h-6 w-6" />
//           <span>Log Out</span>
//         </a>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;



// import React from 'react';
// import Sidebar from './Composants/ApprenantsComposants/Sidebar';
// import Navbar from './Composants/ApprenantsComposants/Navbar';
// import Dashboard from './Composants/ApprenantsComposants/Dashboard';

// function App() {
//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar />
//       <div className="flex-1 flex flex-col">
//         <Navbar />
//         <Dashboard />
//       </div>
//     </div>
//   );
// }
// export default App;



// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Sidebar from './Composants/ApprenantsComposants/Sidebar';
// import Navbar from './Composants/ApprenantsComposants/Navbar';
// import Dashboard from './Composants/ApprenantsComposants/Dashboard';
// import Livraisons from './Composants/ApprenantsComposants/Livraisons';
// import Certificats from './Composants/ApprenantsComposants/Certificats';

// const App = () => {
//   return (
//     <Router>
//       <div className="flex">
//         <Sidebar />
//         <div className="flex flex-col w-full">
//           <Navbar />
//           <main className="p-4">
//             <Routes>
//               <Route path="/dashboard" element={<Dashboard />} />
//               <Route path="/livraisons" element={<Livraisons />} />
//               <Route path="/certificats" element={<Certificats />} />
//             </Routes>
//           </main>
//         </div>
//       </div>
//     </Router>
//   );
// };
// export default App;







