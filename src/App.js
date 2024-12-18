import React, { useEffect, useState } from 'react';
import { createBrowserRouter, Outlet, RouterProvider, useNavigation } from 'react-router-dom';
import Loader from './Composants/Shared/Loader';
import Login from './Composants/Auth/Login';
import AdminDashboard from './Composants/Admin/Dashboard';
import InscrireUtilisateur from './Composants/Admin/InscrireUtilisateur';
import CoachDashboard from './Composants/Coach/CoachDashboard';
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
import AddQuiz from './Composants/Coach/quizz/AddQuiz.js';
import QuizDetails from './Composants/Coach/quizz/QuizDetails.js';
import EditQuiz from './Composants/Coach/quizz/EditQuiz.js';
import PlayQuiz from './Composants/Coach/quizz/PlayQuiz.js';
import CoursEtudiant from './Composants/Etudiant/CoursEtudiant.js';
import TachesEtudiant from './Composants/Etudiant/TachesEtudiant.js';
import LivraisonsEtudiant from './Composants/Etudiant/LivraisonsEtudiant.js';
import QuizzesEtudiants from './Composants/Etudiant/QuizzesEtudiants.js';
import MessagerieEtudiant from './Composants/Etudiant/MessagerieEtudiant.js';
import ProjetsEtudiant from './Composants/Etudiant/ProjetsEtudiant.js';
import DomainsList from './Composants/Admin/DomainsList.js';
import { ToastContainer } from 'react-toastify'; // Importer le ToastContainer pour gérer les notifications
import 'react-toastify/dist/ReactToastify.css'; // Import des styles Toastify


// Composant de Layout pour gérer le Loader pendant les transitions et au démarrage
const AppLayout = () => {
  const navigation = useNavigation();
  const [initialLoading, setInitialLoading] = useState(true);

  // Simule un temps de chargement initial
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false); // Désactive le chargement initial après 1 seconde
    }, 1000);

    return () => clearTimeout(timer); // Nettoyage du timer
  }, []);

  // Le Loader est actif si le chargement initial ou une navigation est en cours
  const isLoading = initialLoading || navigation.state === 'loading';

  return (
    <>
    <ToastContainer />

      {isLoading && <Loader />}
      <Outlet />
    </>
  );
};

// Définition des routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
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
          { path: 'cours', element: <Cours /> },
          { path: 'livraisons', element: <Livraisons /> },
          { path: 'quizzes', element: <Quizzes /> },
          { path: 'quizzes/add-quiz', element: <AddQuiz /> },
          { path: 'quizzes/quiz-details/:quizId', element: <QuizDetails /> },
          { path: 'quizzes/edit-quiz/:quizId', element: <EditQuiz /> },
          { path: 'quizzes/edit-quiz/:id', element: <EditQuiz /> },
          {
            path: 'quizzes/quiz-details/:quizId/play-quiz/:playQuizId',
            element: <PlayQuiz />,
          },
          { path: 'projets', element: <Projets /> },
          { path: 'messagerie', element: <MessagerieCoach /> },
          { path: 'domains/:domaineId', element: <SousDomaines /> },
          {
            path: 'domains/:domaineId/sous-domaines/:sousDomaineId/cours',
            element: <Cours />,
          },
          {
            path: 'domains/:domaineId/sous-domaines/:sousDomaineId/cours/play-quiz/:quizId',
            element: <PlayQuiz />,
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
        children: [
          { path: 'coursEtudiant', element: <CoursEtudiant /> },
          { path: 'tachesEtudiant', element: <TachesEtudiant /> },
          { path: 'livraisonsEtudiant', element: <LivraisonsEtudiant /> },
          { path: 'quizzesEtudiants', element: <QuizzesEtudiants /> },
          { path: 'projetsEtudiant', element: <ProjetsEtudiant /> },
          { path: 'messagerieEtudiant', element: <MessagerieEtudiant /> },
        ],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;


