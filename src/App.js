import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import './App.css';
import Navbar from './Composants/ApprenantsComposants/Navbar';
import Sidebar from './Composants/ApprenantsComposants/Sidebar';
import Dashboard from './Composants/ApprenantsComposants/Dashboard';
import CoursApp from './Composants/ApprenantsComposants/CoursApp';
import Livraisons from './Composants/ApprenantsComposants/Livraisons';
import Taches from './Composants/ApprenantsComposants/Taches';
import CoachLogin from './Composants/Auth/CoachLogin';
import EtudiantLogin from './Composants/Auth/EtudiantLogin';
import Inscription from './Composants/Auth/Inscription';
import RecupererMotDePasse from './Composants/Auth/RecupererMotDePasse';

function AppContent() {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const location = useLocation();

  // Pages sans Navbar et Sidebar
  const pagesSansBarre = [
    '/coach-login',
    '/etudiant-login',
    '/inscription',
    '/recuperer-mot-de-passe',
  ];
  const estPageSansBarre = pagesSansBarre.includes(location.pathname);

  return (
    <div className="App">
      {!estPageSansBarre && (
        <>
          <Navbar
            sidebarToggle={sidebarToggle}
            setSidebarToggle={setSidebarToggle}
          />
          <Sidebar sidebarToggle={sidebarToggle} />
        </>
      )}
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/coursapp" element={<CoursApp />} />
          <Route path="/livraisons" element={<Livraisons />} />
          <Route path="/taches" element={<Taches />} />
          <Route path="/coach-login" element={<CoachLogin />} />
          <Route path="/etudiant-login" element={<EtudiantLogin />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route
            path="/recuperer-mot-de-passe"
            element={<RecupererMotDePasse />}
          />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
