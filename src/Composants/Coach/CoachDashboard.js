import React, { useState, useEffect } from 'react';
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
import Loader from '../Shared/Loader'; // Importez votre composant Loader

const CoachDashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulez un délai de chargement
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Temps de chargement simulé (1 seconde)

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader /> {/* Affichez le loader pendant le chargement */}
      </div>
    );
  }

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
            <Route path="quizzes/*" element={<Quizzes />} />
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
            <Route path="projets" element={<Projets  />} />
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
