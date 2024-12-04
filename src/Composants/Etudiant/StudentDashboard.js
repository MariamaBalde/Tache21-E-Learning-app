
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import Cours from './Cours';
import Taches from './Taches';
import MessagerieEtudiant from './MessagerieEtudiant';
import QuizzesEtudiants from './QuizzesEtudiants';
import ProjetsEtudiant from './ProjetsEtudiant';
import Livraisons from './Livraisons';
const StudentDashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Routes pour les sous-sections */}
        <div className="flex-1 bg-gray-50 overflow-y-auto p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="domains" element={<Cours />} />
            <Route path="Taches" element={<Taches />} />
            <Route path="livraisons" element={<Livraisons />} />
            <Route path="quizzes" element={<QuizzesEtudiants />} />
            <Route path="projets" element={<ProjetsEtudiant />} />
            <Route path="messagerie" element={<MessagerieEtudiant />} />
            

          </Routes>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;