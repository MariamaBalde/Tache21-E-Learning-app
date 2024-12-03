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
import RecupererMotDePasse from './Composants/Auth/RecupererMotDePasse'; // Importer le composant de récupération de mot de passe
import Livraisons from './Composants/Coach/Livraisons'; // Importer les composants nécessaires


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route de connexion */}
        <Route path="/" element={<Login />} />
        {/* Route de récupération du mot de passe */}
        <Route path="/reset-password" element={<RecupererMotDePasse />} />
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
          <Route path="livraisons" element={<Livraisons />} />
          <Route path="quizzes" element={<Quizzes />} />
          <Route path="projets" element={<Projets />} />
          <Route path="messagerie" element={<MessagerieCoach />} />{' '}
          <Route
            path="/coach/dashboard/domains/:domaineId"
            element={<SousDomaines />}
          />
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

