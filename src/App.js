
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from "./Composants/ApprenantsComposants/Navbar";
import Sidebar from "./Composants/ApprenantsComposants/Sidebar";
import Dashboard from './Composants/ApprenantsComposants/Dashboard';
import Cours from './Composants/ApprenantsComposants/Cours';
import Livraisons from './Composants/ApprenantsComposants/Livraisons';
import Taches from './Composants/ApprenantsComposants/Taches';

function App() {
  // Déclarez l'état sidebarToggle ici
  const [sidebarToggle, setSidebarToggle] = useState(false);

  return (
    <Router>
      <div className="App">
        {/* Passez setSidebarToggle en tant que prop */}
        <Navbar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
        <div className="main-content">
          <Sidebar sidebarToggle={sidebarToggle} />
          <div className="page-content">
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/cours' element={<Cours />} />
              <Route path='/livraisons' element={<Livraisons />} />
              <Route path='/taches' element={<Taches />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;





// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';
// import Navbar from "./Composants/ApprenantsComposants/Navbar";
// import Sidebar from "./Composants/ApprenantsComposants/Sidebar";
// import Dashboard from './Composants/ApprenantsComposants/Dashboard';
// import Cours from './Composants/ApprenantsComposants/Cours';
// import Livraisons from './Composants/ApprenantsComposants/Livraisons';
// import Taches from './Composants/ApprenantsComposants/Taches';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Navbar/>
//         <div className="main-content">
//           <Sidebar/>
//           <div className="page-content">
//             <Routes>
//               <Route path='/' element={<Dashboard />} />
//               <Route path='/dashboard' element={<Dashboard />} />
//               <Route path='/cours' element={<Cours />} />
//               <Route path='/livraisons' element={<Livraisons />} />
//               <Route path='/taches' element={<Taches />} />
//             </Routes>
//           </div>
//         </div>
//       </div>
//     </Router>
//   );
// }
// export default App;

