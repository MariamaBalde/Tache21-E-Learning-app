import React from 'react';
import { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import Domains from './Domains';
import MessagerieCoach from './MessagerieCoach';
import SousDomaines from './SousDomaines';
import Cours from './Cours';
import Livraisons from './Livraisons';
import Quizzes from './Quizzes';
import Projets from './Projets';

const CoachDashboard = () => {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    // Simuler une API pour récupérer les notifications
    const fetchNotifications = async () => {
      const data = [
        {
          id: 1,
          message: "Nouvelle livraison de Marie cisse.",
          date: "2024-11-21",
        },
        {
          id: 2,
          message: "Nouvelle livraison de Mohamed fall.",
          date: "2024-11-22",
        },
      ];
      setNotifications(data);
    };

    fetchNotifications();
  }, []);
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar notifications={notifications} />

        {/* Routes pour les sous-sections */}
        <div className="flex-1 bg-gray-50 overflow-y-auto p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="domains" element={<Domains />} />
            <Route path="domains/:domaineId" element={<SousDomaines />} />
            <Route path="sous-domaines" element={<SousDomaines />} />
            <Route path="cours" element={<Cours />} />
            <Route path="livraisons" element={<Livraisons />} />
            <Route path="quizzes" element={<Quizzes />} />
            <Route path="projets" element={<Projets />} />
            <Route path="messagerie" element={<MessagerieCoach />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default CoachDashboard;
