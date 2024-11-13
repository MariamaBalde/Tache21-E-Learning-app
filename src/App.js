<<<<<<< HEAD
<<<<<<< HEAD

import './App.css';
import { Taches } from './Composants/ApprenantsComposants/Taches';

function App() {
  return (
    <div className="App">
      <Taches/>
    </div>
=======
import React from 'react';
=======
>>>>>>> e58804233b289104af5a665e1e8287a14ec6cb0b
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from "./Composants/ApprenantsComposants/Navbar";
import Sidebar from "./Composants/ApprenantsComposants/Sidebar";
import Dashboard from './Composants/ApprenantsComposants/Dashboard';
import CoursApp from './Composants/ApprenantsComposants/CoursApp';
import Livraisons from './Composants/ApprenantsComposants/Livraisons';
import Taches from './Composants/ApprenantsComposants/Taches';

function App() { 
  return (
    <Router>
      <div className="App">
        {/* <Navbar/> */}
        <div className="main-content">
          {/* <Sidebar/> */}
          <div className="page-content">
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/coursapp' element={<CoursApp />} />
              <Route path='/livraisons' element={<Livraisons />} />
              <Route path='/taches' element={<Taches />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
<<<<<<< HEAD
>>>>>>> d280d2b8a6f1da271a969441b9fa74b824610e6e
=======
>>>>>>> e58804233b289104af5a665e1e8287a14ec6cb0b
  );
}
export default App;
