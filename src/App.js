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
import Login from './Composants/Auth/Login';
import EtudiantLogin from './Composants/Auth/EtudiantLogin';
import Inscription from './Composants/Auth/Inscription';
import RecupererMotDePasse from './Composants/Auth/RecupererMotDePasse';
import CreerEtudiant from './Composants/Admin/CreerEtudiant';
import GestionUtilisateurs from './Composants/Admin/GestionUtilisateurs';
import AdminDashboard from './Composants/Admin/AdminDashboard';
import ProtectedRoute from './Utils/ProtectedRoute';

import { db, auth } from './Config/firebaseConfig';

function AppContent() {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const location = useLocation();

  // Pages sans Navbar et Sidebar
  const pagesSansBarre = [
    '/login',
    '/etudiant-login',
    '/inscription',
    '/recuperer-mot-de-passe',
    '/admin/dashboard',
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
          <Route path="/login" element={<Login />} />
          <Route path="/etudiant-login" element={<EtudiantLogin />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route
            path="/recuperer-mot-de-passe"
            element={<RecupererMotDePasse />}
          />
          {/* Routes Admin protégées */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/creer-etudiant"
            element={
              <ProtectedRoute role="admin">
                <CreerEtudiant />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/gestion-utilisateurs"
            element={
              <ProtectedRoute role="admin">
                <GestionUtilisateurs />
              </ProtectedRoute>
            }
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
