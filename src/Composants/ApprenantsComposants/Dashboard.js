// src/Dashboard.js
import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiBook, FiCalendar, FiSettings, FiLogOut } from "react-icons/fi";
import StatisticsChart from "./StatisticsChart"; // Importer StatisticsChart

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-purple-900 text-white p-6 space-y-6">
        <div className="text-2xl font-semibold">Dashboard</div>
        <nav className="space-y-4">
          <Link to="/Dashboard" className="flex items-center gap-2 text-gray-300 hover:text-white">
            <FiHome /> Dashboard
          </Link>
          <Link to="/explore" className="flex items-center gap-2 text-gray-300 hover:text-white">
            <FiBook /> Explore
          </Link>
          <Link to="/schedule" className="flex items-center gap-2 text-gray-300 hover:text-white">
            <FiCalendar /> Schedule
          </Link>
          <Link to="/settings" className="flex items-center gap-2 text-gray-300 hover:text-white">
            <FiSettings /> Settings
          </Link>
          <Link to="/logout" className="flex items-center gap-2 text-gray-300 hover:text-white">
            <FiLogOut /> Log Out
          </Link>
        </nav>
        <button className="mt-auto bg-purple-700 text-white py-2 px-4 rounded-lg">
          Upgrade to PRO
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-8">
        {/* Search Bar */}
        <div className="flex items-center justify-between">
          <input
            type="text"
            placeholder="Search..."
            className="w-1/2 p-2 rounded-lg bg-white border border-gray-300 focus:outline-none"
          />
        </div>

        {/* Word Sets Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Word Sets</h2>
          <div className="flex space-x-4">
            <div className="bg-gradient-to-r from-purple-400 to-pink-300 p-4 rounded-lg text-white">
              <p>Books and Library</p>
            </div>
            <div className="bg-gradient-to-r from-purple-400 to-blue-400 p-4 rounded-lg text-white">
              <p>Countries and cities</p>
            </div>
            <div className="bg-gradient-to-r from-blue-400 to-purple-400 p-4 rounded-lg text-white">
              <p>What is o'clock now?</p>
            </div>
          </div>
        </section>

        {/* Flex container for Statistics and Quick Start */}
        <div className="flex space-x-6">
          {/* Statistics Section */}
          <div className="flex-1 min-w-0 bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4">Statistics</h2>
            <StatisticsChart /> {/* Affichage du composant StatisticsChart */}
          </div>

          {/* Quick Start Section */}
          <div className="w-64 bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4">Quick Start</h2>
            <div className="flex space-x-4">
              <div className="p-4 bg-pink-100 rounded-lg text-pink-800">
                <p>Exam - 20 min</p>
              </div>
              <div className="p-4 bg-blue-100 rounded-lg text-blue-800">
                <p>Writing - 15 min</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

