import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar';
import Navbar from './Navbar';
import { FaSearch } from 'react-icons/fa';

const Dashbord = ({ sidebarToggle, setSidebarToggle }) => {
  const [date, setDate] = useState(null);

  return (
    <div>
      {/* Sidebar et Navbar */}
      <div className={`${sidebarToggle ? 'ml-64' : 'ml-0'} transition-all w-full`}>
        <Navbar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
      </div>

      {/* Contenu principal */}
      <main className={`p-8 mt-20 w-full ${sidebarToggle ? 'ml-64' : 'ml-0'} transition-all`}>
        {/* Section Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          <div className="bg-[#f8492a] rounded-2xl h-40 flex flex-col gap-4 items-center justify-center p-4">
            <h1 className="text-lg font-semibold text-white">Card 1</h1>
          </div>
          <div className="bg-[#478b56] rounded-2xl h-40 flex flex-col gap-4 items-center justify-center p-4">
            <h1 className="text-lg font-semibold text-white">Card 2</h1>
          </div>
          <div className="bg-[#d16923] rounded-2xl h-40 flex flex-col gap-4 items-center justify-center p-4">
            <h1 className="text-lg font-semibold text-white">Card 3</h1>
          </div>
        </div>

        {/* Section Recherche */}
        <div className="bg-[#e2d9d7] w-full mt-7 p-5 rounded-lg">
          <div className="flex flex-col lg:flex-row items-center justify-between space-x-4">
            {/* Partie gauche: Icône et Input */}
            <div className="flex items-center gap-x-3 w-full lg:w-auto mb-4 lg:mb-0">
              <FaSearch className="text-gray-600 w-5 h-5" />
              <input
                type="text"
                className="font-semibold p-2 bg-[#e2d9d7] placeholder-black rounded-md w-full"
                placeholder="Recherche une livraison"
              />
            </div>

            {/* Partie droite: Calendrier */}
            <div className="relative ml-auto w-full lg:w-auto">
              <Calendar
                value={date}
                onChange={(e) => setDate(e.value)}
                showIcon
                className="mt-0 w-full lg:w-auto"
                style={{ display: 'inline-block' }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashbord;
