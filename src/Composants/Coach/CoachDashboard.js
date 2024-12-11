// src/Composants/Coach/CoachDashboard.js
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import Domains from './Domains';
import MessagerieCoach from './MessagerieCoach';
import SousDomaines from './SousDomaines';
import Cours from './Cours';
import Quizzes from './Quizzes';
import Projets from './Projets';
import Livraisons from './Livraisons';
import PlayQuiz from './quizz/PlayQuiz';
import AddQuiz from './quizz/AddQuiz';
import QuizDetails from './quizz/QuizDetails';

const CoachDashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 bg-gray-50 overflow-y-auto p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="domains" element={<Domains />} />
            <Route path="domains/:domaineId" element={<SousDomaines />} />
            <Route
              path="domains/:domaineId/sous-domaines/:sousDomaineId/cours"
              element={<Cours />}
            />
            <Route path="sous-domaines" element={<SousDomaines />} />
            <Route path="cours" element={<Cours />} />
            <Route path="livraisons" element={<Livraisons />} />
            <Route path="quizzes/*" element={<Quizzes />} />{' '}
            {/* Gestion des quizzes */}
            <Route path="quizzes" element={<Quizzes />} />
            <Route path="quizzes" element={<Quizzes />} />
            <Route path="quizzes/add-quiz" element={<AddQuiz />} />
            <Route
              path="quizzes/quiz-details/:quizId"
              element={<QuizDetails />}
            />
            <Route
              path="quizzes/quiz-details/:quizId/play-quiz/:playQuizId"
              element={<PlayQuiz />}
            />
            {/* Route pour gérer les quizzes */}
            <Route path="projets" element={<Projets />} />
            <Route path="messagerie" element={<MessagerieCoach />} />
            <Route
              path="/coach/dashboard/messagerie"
              element={<MessagerieCoach />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};
export default CoachDashboard;
