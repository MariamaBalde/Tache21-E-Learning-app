
// src/Composants/Coach/CoachDashboard.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import MessagerieEtudiant from './MessagerieEtudiant';
import CoursEtudiant from './CoursEtudiant';
import TachesEtudiant from './TachesEtudiant';
import QuizzesEtudiants from './QuizzesEtudiants';
import ProjetsEtudiant from './ProjetsEtudiant';
import LivraisonsEtudiant from './LivraisonsEtudiant';


const StudentDashboard = () => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <div className="flex-1 bg-gray-50 overflow-y-auto p-4">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="coursEtudiant" element={<CoursEtudiant />} />
                        {/* <Route path="domains/:domaineId" element={<SousDomaines />} /> */}
                        {/* <Route
                            path="domains/:domaineId/sous-domaines/:sousDomaineId/cours"
                            element={<Cours />}
                        /> */}
                        <Route path="tachesEtudiant" element={<TachesEtudiant />} />

                        <Route path="livraisonsEtudiant" element={<LivraisonsEtudiant />} />
                        <Route path="quizzesEtudiants" element={<QuizzesEtudiants />} />{' '}
                        {/* Gestion des quizzes */}
                        {/* <Route path="quizzes" element={<Quizzes />} />
                        <Route path="quizzes" element={<Quizzes />} />
                        <Route path="quizzes/add-quiz" element={<AddQuiz />} />
                        <Route
                            path="quizzes/quiz-details/:quizId"
                            element={<QuizDetails />}
                        />
                        <Route
                            path="quizzes/quiz-details/:quizId/play-quiz/:playQuizId"
                            element={<PlayQuiz />}
                        /> */}
                        {/* Route pour gérer les quizzes */}
                        <Route path="projetsEtudiant" element={<ProjetsEtudiant />} />
                        <Route path="messagerieEtudiant" element={<MessagerieEtudiant />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
