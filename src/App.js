import React from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Login from './Composants/Auth/Login';
import AdminDashboard from './Composants/Admin/Dashboard';
import InscrireUtilisateur from './Composants/Admin/InscrireUtilisateur';
import CoachDashboard from './Composants/Coach/CoachDashboard.js';
import StudentDashboard from './Composants/Etudiant/StudentDashboard.js';
import NotFound from './Pages/NotFound.js';
import PrivateRoute from './Utils/PrivateRoute.js';
import Domains from './Composants/Coach/Domains';
import SousDomaines from './Composants/Coach/SousDomaines';
import CoursesList from './Composants/Coach/Cours';
import Quizzes from './Composants/Coach/Quizzes';
import Projets from './Composants/Coach/Projets';
import MessagerieCoach from './Composants/Coach/MessagerieCoach';
import RecupererMotDePasse from './Composants/Auth/RecupererMotDePasse';
import Livraisons from './Composants/Coach/Livraisons';
import LandingPage from './Pages/LandingPage.js';
import DomainsList from './Composants/Admin/DomainsList.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />, // Conteneur pour les routes
    children: [
      { path: '/', element: <LandingPage /> },
      { path: 'login', element: <Login /> },
      { path: 'reset-password', element: <RecupererMotDePasse /> },
      {
        path: 'admin/dashboard',
        element: (
          <PrivateRoute roleRequired="admin">
            <AdminDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: 'admin/inscrire-utilisateur',
        element: (
          <PrivateRoute roleRequired="admin">
            <InscrireUtilisateur />
          </PrivateRoute>
        ),
      },
      {
        path: 'admin/domaine',
        element: (
          <PrivateRoute roleRequired="admin">
            <DomainsList />
          </PrivateRoute>
        ),
      },
      {
        path: 'coach/dashboard',
        element: (
          <PrivateRoute roleRequired="coach">
            <CoachDashboard />
          </PrivateRoute>
        ),
        children: [
          { path: 'domains', element: <Domains /> },
          { path: 'sous-domaines', element: <SousDomaines /> },
          { path: 'cours', element: <CoursesList /> },
          { path: 'livraisons', element: <Livraisons /> },
          { path: 'quizzes', element: <Quizzes /> },
          { path: 'projets', element: <Projets /> },
          { path: 'messagerie', element: <MessagerieCoach /> },
          { path: 'domains/:domaineId', element: <SousDomaines /> },
          {
            path: 'domains/:domaineId/cours/:sousDomaineId',
            element: <CoursesList />,
          },
        ],
      },
      {
        path: 'etudiant/dashboard',
        element: (
          <PrivateRoute roleRequired="etudiant">
            <StudentDashboard />
          </PrivateRoute>
        ),
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
