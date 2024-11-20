import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Composants/CoachComposants/Dashboard';
import Sidebar from './Composants/CoachComposants/Sidebar';
import Cours from './Composants/CoachComposants/Cours';
import Domaines from './Composants/CoachComposants/Domaines';
import SousDomaines from './Composants/CoachComposants/SousDomaines';
import Quizzes from './Composants/CoachComposants/Quizzes';
import Parametre from './Composants/CoachComposants/Parametre';

function App() {
  return (
    <Router>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main content container */}
        <div className="flex-grow p-6">
          {/* Définir les routes pour les différentes pages */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            {/* Ajoutez d'autres routes ici si nécessaire */}
            <Route path='/cours' element={<Cours />} />
            <Route path='/domaines' element={<Domaines />} />
            <Route path='/sousDomaines' element={<SousDomaines />} />
            <Route path='/quizzes' element={<Quizzes />} />
            <Route path='/parametre' element={<Parametre />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;




// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';
// import Navbar from "./Composants/ApprenantsComposants/Navbar";
// import Sidebar from "./Composants/ApprenantsComposants/Sidebar";
// import Dashboard from './Composants/ApprenantsComposants/Dashboard';
// import CoursApp from './Composants/ApprenantsComposants/CoursApp';
// import Livraisons from './Composants/ApprenantsComposants/Livraisons';
// import Taches from './Composants/ApprenantsComposants/Taches';

// function App() {
//   // Déclarez l'état sidebarToggle ici
//   const [sidebarToggle, setSidebarToggle] = useState(false);

//   return (
//     <Router>
//       <div className="App">
//         {/* Passez setSidebarToggle en tant que prop */}
//         <Navbar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
//         <div className="main-content">
//           <Sidebar sidebarToggle={sidebarToggle} />
//           <div className="page-content">
//             <Routes>
//               <Route path='/' element={<Dashboard />} />
//               <Route path='/dashboard' element={<Dashboard />} />
//               <Route path='/coursapp' element={<CoursApp />} />
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




