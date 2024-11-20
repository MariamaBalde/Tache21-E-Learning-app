import React, { useState } from "react";
import { FiBell, FiMessageCircle, FiUser } from "react-icons/fi";

const Dashboard = () => {
  const [isProfileOpen, setProfileOpen] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Barre supérieure */}
      <div className="flex items-center justify-between mb-6">
        {/* Barre de recherche */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full max-w-md px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Icônes à droite */}
        <div className="flex items-center space-x-4 ml-4">
          {/* Notification */}
          <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
            <FiBell size={20} />
          </button>

          {/* Messages */}
          <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
            <FiMessageCircle size={20} />
          </button>

          {/* Profil */}
          <div className="relative">
            <button
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
              onClick={() => setProfileOpen(!isProfileOpen)}
            >
              <FiUser size={20} />
            </button>

            {/* Menu déroulant du profil */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48">
                <ul className="py-2 text-sm text-gray-700">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Voir le profil
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Paramètres
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Se déconnecter
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Section des cartes */}
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Tableau de Bord</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Carte 1 */}
        <div className="bg-gradient-to-r from-blue-500 via-blue-400 to-sky-400 text-white p-6 rounded-lg shadow-lg flex flex-col justify-between">
          <h2 className="text-xl font-semibold mb-4">Cours disponibles</h2>
          <p className="mb-4">10 Cours en cours</p>
          <button className="mt-auto bg-sky-600 py-2 px-4 rounded text-white hover:bg-sky-500 transition">
            Voir les cours
          </button>
        </div>

        {/* Carte 2 */}
        <div className="bg-gradient-to-r from-blue-500 via-blue-400 to-sky-400 text-white p-6 rounded-lg shadow-lg flex flex-col justify-between">
          <h2 className="text-xl font-semibold mb-4">Mes progrès</h2>
          <p className="mb-4">50% complété</p>
          <button className="mt-auto bg-sky-600 py-2 px-4 rounded text-white hover:bg-sky-500 transition">
            Voir mes progrès
          </button>
        </div>

        {/* Carte 3 */}
        <div className="bg-gradient-to-r from-blue-500 via-blue-400 to-sky-400 text-white p-6 rounded-lg shadow-lg flex flex-col justify-between">
          <h2 className="text-xl font-semibold mb-4">Certificats obtenus</h2>
          <p className="mb-4">3 certificats</p>
          <button className="mt-auto bg-sky-600 py-2 px-4 rounded text-white hover:bg-sky-500 transition">
            Voir mes certificats
          </button>
        </div>

        {/* Ajoute d'autres cartes ici si nécessaire */}
      </div>
    </div>
  );
};

export default Dashboard;
