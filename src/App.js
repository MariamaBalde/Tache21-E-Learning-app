import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Composants/Auth/Login';
import AdminDashboard from './Composants/Admin/Dashboard';
import InscrireUtilisateur from './Composants/Admin/InscrireUtilisateur';
import CoachDashboard from './Composants/Coach/CoachDashboard.js';
import EtudiantDashboard from './Composants/Etudiant/Dashboard';
import NotFound from './pages/NotFound';
import PrivateRoute from './utils/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route de connexion */}
        <Route path="/" element={<Login />} />

        {/* Routes sécurisées avec PrivateRoute */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute roleRequired="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route path="/admin/inscrire-utilisateur" element={<InscrireUtilisateur />} />

        <Route
          path="/coach/dashboard"
          element={
            <PrivateRoute roleRequired="coach">
              <CoachDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/etudiant/dashboard"
          element={
            <PrivateRoute roleRequired="etudiant">
              <EtudiantDashboard />
            </PrivateRoute>
          }
        />

        {/* Page introuvable */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;

