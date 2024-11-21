<<<<<<< HEAD
=======
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Composants/Auth/Login';
import AdminDashboard from './Composants/Admin/Dashboard';
import InscrireUtilisateur from './Composants/Admin/InscrireUtilisateur';
import CoachDashboard from './Composants/Coach/CoachDashboard.js';
import StudentDashboard from './Composants/Etudiant/StudentDashboard.js';
import NotFound from './Pages/NotFound.js';
import PrivateRoute from './Utils/PrivateRoute.js';
import Domains from './Composants/Coach/Domains'; // Importer les composants nécessaires
import SousDomaines from './Composants/Coach/SousDomaines'; // Importer les composants nécessaires
import Cours from './Composants/Coach/Cours'; // Importer les composants nécessaires
import Quizzes from './Composants/Coach/Quizzes'; // Importer les composants nécessaires
import Projets from './Composants/Coach/Projets'; // Importer les composants nécessaires
import MessagerieCoach from './Composants/Coach/MessagerieCoach'; // Importer les composants nécessaires

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
        <Route
          path="/admin/inscrire-utilisateur"
          element={<InscrireUtilisateur />}
        />

        <Route
          path="/coach/dashboard"
          element={
            <PrivateRoute roleRequired="coach">
              <CoachDashboard />
            </PrivateRoute>
          }
        >
          {/* Définir ici les sous-routes */}
          <Route path="domains" element={<Domains />} />
          <Route path="sous-domaines" element={<SousDomaines />} />
          <Route path="cours" element={<Cours />} />
          <Route path="quizzes" element={<Quizzes />} />
          <Route path="projets" element={<Projets />} />
          <Route path="messagerie" element={<MessagerieCoach />} />{' '}
        </Route>
        <Route
          path="/etudiant/dashboard"
          element={
            <PrivateRoute roleRequired="etudiant">
              <StudentDashboard />
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
>>>>>>> 725b4029256aa7330dd96e67edfaa848ec238ba6
