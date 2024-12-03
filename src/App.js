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
import Cours from './Composants/Coach/Cours';
import Quizzes from './Composants/Coach/Quizzes';
import Projets from './Composants/Coach/Projets';
import MessagerieCoach from './Composants/Coach/MessagerieCoach';
import RecupererMotDePasse from './Composants/Auth/RecupererMotDePasse';
import Livraisons from './Composants/Coach/Livraisons';
import LandingPage from './Pages/LandingPage.js';


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
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;



// // src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './Composants/Auth/Login';
// import RecupererMotDePasse from './Composants/Auth/RecupererMotDePasse';
// import AdminDashboard from './Composants/Admin/Dashboard';
// import InscrireUtilisateur from './Composants/Admin/InscrireUtilisateur';
// import CoachDashboard from './Composants/Coach/CoachDashboard';
// import StudentDashboard from './Composants/Etudiant/StudentDashboard';
// import NotFound from './Pages/NotFound';
// import PrivateRoute from './utils/ProtectedRoute'; // Assurez-vous que ce fichier est correctement configuré

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* Routes publiques */}
//         <Route path="/" element={<Login />} />
//         <Route path="/reset-password" element={<RecupererMotDePasse />} />

//         {/* Routes Admin */}
//         <Route path="/admin/dashboard" element={<PrivateRoute roleRequired="admin"><AdminDashboard /></PrivateRoute>} />
//         <Route path="/admin/inscrire-utilisateur" element={<PrivateRoute roleRequired="admin"><InscrireUtilisateur /></PrivateRoute>} />

//         {/* Routes Coach */}
//         <Route path="/coach/*" element={<PrivateRoute roleRequired="coach"><CoachDashboard /></PrivateRoute>} />

//         {/* Routes Étudiant */}
//         <Route path="/etudiant/dashboard" element={<PrivateRoute roleRequired="etudiant"><StudentDashboard /></PrivateRoute>} />

//         {/* Route 404 */}
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

