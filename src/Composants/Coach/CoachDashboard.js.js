// CoachDashboard.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../Coach/Sidebar";
import Navbar from "../Coach/Navbar";
import Dashboard from "../Coach/Dashboard";
import Domains from "../Coach/Domains";
import MessagerieCoach from "../Coach/MessagerieCoach";
import SousDomaines from "../Coach/SousDomaines";
import Cours from "../Coach/Cours";
import Quizzes from "../Coach/Quizzes";
import Projets from "../Coach/Projets";


const CoachDashboard = () => {
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
            <Route path="/domains" element={<Domains />} />
            <Route path="/sous-domaines" element={<SousDomaines />} />
            <Route path="/cours" element={<Cours />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/projets" element={<Projets />} />
            <Route path="/messagerie" element={<MessagerieCoach />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default CoachDashboard;



// function CoachDashboard() {
//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Area */}
//       <div className="flex-1 flex flex-col">
//         {/* Navbar */}
//         <Navbar />

//         {/* Dynamic Content */}
//         <div className="flex-1 bg-gray-50 overflow-y-auto">
//           <Dashboard />
//           <Domains />
//           <MessagerieCoach />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CoachDashboard;




