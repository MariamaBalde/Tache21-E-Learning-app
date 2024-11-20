import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiBook, FiClipboard, FiTruck, FiSettings, FiMenu } from 'react-icons/fi';

const Layout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-200">
      {/* Sidebar */}
      <aside
        className={`bg-gradient-to-b from-royal-blue to-sky-blue text-white fixed top-0 left-0 h-full transition-transform transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 w-64 p-6`}
      >
        <div className="text-2xl font-semibold mb-6">E-Learning</div>
        <nav className="space-y-4">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? 'bg-white text-royal-blue font-bold p-3 rounded-md block'
                : 'text-blue-100 hover:text-white p-3 rounded-md block'
            }
          >
            <FiHome className="inline-block mr-2" /> Dashboard
          </NavLink>
          <NavLink
            to="/cours"
            className={({ isActive }) =>
              isActive
                ? 'bg-white text-royal-blue font-bold p-3 rounded-md block'
                : 'text-blue-100 hover:text-white p-3 rounded-md block'
            }
          >
            <FiBook className="inline-block mr-2" /> Cours
          </NavLink>
          <NavLink
            to="/taches"
            className={({ isActive }) =>
              isActive
                ? 'bg-white text-royal-blue font-bold p-3 rounded-md block'
                : 'text-blue-100 hover:text-white p-3 rounded-md block'
            }
          >
            <FiClipboard className="inline-block mr-2" /> Tâches
          </NavLink>
          <NavLink
            to="/livraisons"
            className={({ isActive }) =>
              isActive
                ? 'bg-white text-royal-blue font-bold p-3 rounded-md block'
                : 'text-blue-100 hover:text-white p-3 rounded-md block'
            }
          >
            <FiTruck className="inline-block mr-2" /> Livraisons
          </NavLink>
          <NavLink
            to="/parametres"
            className={({ isActive }) =>
              isActive
                ? 'bg-white text-royal-blue font-bold p-3 rounded-md block'
                : 'text-blue-100 hover:text-white p-3 rounded-md block'
            }
          >
            <FiSettings className="inline-block mr-2" /> Paramètres
          </NavLink>
        </nav>
      </aside>

      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 bg-royal-blue text-white p-3 rounded-full shadow-lg z-50"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        <FiMenu size={20} />
      </button>

      {/* Main content */}
      <main className="flex-1 ml-0 md:ml-64 p-8 overflow-auto bg-white shadow-md rounded-lg">
        {children}
      </main>
    </div>
  );
};

export default Layout;
