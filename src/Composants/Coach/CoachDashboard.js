import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import Domains from './Domains';
import MessagerieCoach from './MessagerieCoach';
import SousDomaines from './SousDomaines';
import Cours from './Cours';
import Quizzes from './Quizzes';
import Projets from './Projets';
import ListQuizzes from './quizz/ListQuizzes';
import AddQuizz from './quizz/AddQuizz';
import HtmlCssQuiz from './quizz/HtmlCssQuiz';
import BootstrapQuiz from './quizz/BootstrapQuiz';
import JavaScriptQuiz from './quizz/JavaScriptQuiz';
import ReactQuiz from './quizz/ReactQuiz';
import QuizzDetails from './quizz/QuizzDetails';

const CoachDashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        <div className="flex-1 bg-gray-50 overflow-y-auto p-4">
          {/* Routes pour les sous-sections */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
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
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default CoachDashboard;
