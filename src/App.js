import React from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
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
import RecupererMotDePasse from './Composants/Auth/RecupererMotDePasse'; // Importer le composant de récupération de mot de passe
import Livraisons from './Composants/Coach/Livraisons'; // Importer les composants nécessaires
import Taches from './Composants/Etudiant/Taches'; 
import LandingPage from './Pages/LandingPage';
// import Cours from './Composants/Etudiant/Cours';
// import Livraisons from './Composants/Etudiant/Livraisons';
// import Taches from './Composants/Etudiant/Taches';
import QuizzesEtudiants from './Composants/Etudiant/QuizzesEtudiants';
import ProjetsEtudiant from './Composants/Etudiant/ProjetsEtudiant'





const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />, // Conteneur pour les routes
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "login", element: <Login /> },
      { path: "reset-password", element: <RecupererMotDePasse /> },
      {
        path: "admin/dashboard",
        element: (
          <PrivateRoute roleRequired="admin">
            <AdminDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "admin/inscrire-utilisateur",
        element: (
          <PrivateRoute roleRequired="admin">
            <InscrireUtilisateur />
          </PrivateRoute>
        ),
      },
      {
        path: "coach/dashboard",
        element: (
          <PrivateRoute roleRequired="coach">
            <CoachDashboard />
          </PrivateRoute>
        ),
        children: [
          { path: "domains", element: <Domains /> },
          { path: "sous-domaines", element: <SousDomaines /> },
          { path: "cours", element: <Cours /> },
          { path: "livraisons", element: <Livraisons /> },
          { path: "quizzes", element: <Quizzes /> },
          { path: "projets", element: <Projets /> },
          { path: "messagerie", element: <MessagerieCoach /> },
          { path: "domains/:domaineId", element: <SousDomaines /> },
        ],
      },
      {
        path: "etudiant/dashboard",
        element: (
          <PrivateRoute roleRequired="etudiant">
            <StudentDashboard />
          </PrivateRoute>
        ),
        children: [
          { path: "courses", element: <Cours /> },
          { path: "deliveries", element: <Livraisons /> },
          { path: "tasks", element: <Taches /> },
          { path: "quizzes", element: <QuizzesEtudiants /> },
          { path: "projetsetudiant", element: <ProjetsEtudiant /> },
  
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const App = () => {

  return <RouterProvider router={router} />;
};
export default App;




