import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Composants/Auth/Login';
import AdminDashboard from './Composants/Admin/Dashboard';
import InscrireUtilisateur from './Composants/Admin/InscrireUtilisateur';
import CoachDashboard from './Composants/Coach/CoachDashboard';
import StudentDashboard from './Composants/Etudiant/StudentDashboard';
import NotFound from './Pages/NotFound';
import PrivateRoute from './Utils/PrivateRoute';
import Domains from './Composants/Coach/Domains';
import SousDomaines from './Composants/Coach/SousDomaines';
import Cours from './Composants/Coach/Cours';
import Quizzes from './Composants/Coach/Quizzes';
import QuizzDetails from './Composants/Coach/quizz/QuizzDetails'; // Nouveau composant
import AddQuizz from './Composants/Coach/quizz/AddQuizz';
import ListQuizzes from './Composants/Coach/quizz/ListQuizzes';
import HtmlCssQuiz from './Composants/Coach/quizz/HtmlCssQuiz';
import BootstrapQuiz from './Composants/Coach/quizz/BootstrapQuiz';
import JavaScriptQuiz from './Composants/Coach/quizz/JavaScriptQuiz';
import ReactQuiz from './Composants/Coach/quizz/ReactQuiz';
import Projets from './Composants/Coach/Projets';
import MessagerieCoach from './Composants/Coach/MessagerieCoach';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
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
        >
          <Route path="domains" element={<Domains />} />
          <Route path="sous-domaines" element={<SousDomaines />} />
          <Route path="cours" element={<Cours />} />
          <Route path="quizzes" element={<Quizzes />}>
            <Route path="list" element={<ListQuizzes />} />
            <Route path="add" element={<AddQuizz />} />
            <Route path="html-css" element={<HtmlCssQuiz />} />
            <Route path="bootstrap" element={<BootstrapQuiz />} />
            <Route path="javascript" element={<JavaScriptQuiz />} />
            <Route path="react" element={<ReactQuiz />} />
            <Route path=":id" element={<QuizzDetails />} /> {/* Détail du quiz */}
          </Route>
          <Route path="projets" element={<Projets />} />
          <Route path="messagerie" element={<MessagerieCoach />} />
        </Route>
        <Route
          path="/etudiant/dashboard"
          element={
            <PrivateRoute roleRequired="etudiant">
              <StudentDashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
