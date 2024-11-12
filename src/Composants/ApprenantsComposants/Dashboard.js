import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const Dashboard = () => {
  const [date, setDate] = useState(null);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Contenu Principal */}
      <div className="flex-1 min-h-screen ml-0 lg:ml-64 transition-all">
        {/* Contenu Principal du Dashboard */}
        <main className="p-8 mt-20">
          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-[#f8492a] rounded-2xl h-40 flex items-center justify-center p-4">
              <h1 className="text-lg font-semibold text-white">Card 1</h1>
            </div>
            <div className="bg-[#478b56] rounded-2xl h-40 flex items-center justify-center p-4">
              <h1 className="text-lg font-semibold text-white">Card 2</h1>
            </div>
            <div className="bg-[#d16923] rounded-2xl h-40 flex items-center justify-center p-4">
              <h1 className="text-lg font-semibold text-white">Card 3</h1>
            </div>
          </div>

          {/* Recherche Section */}
          <div className="recherche-section bg-[#e2d9d7] mt-7 p-5 rounded-lg">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="flex items-center gap-x-3 w-full lg:w-auto">
                <FaSearch className="text-gray-600 w-5 h-5" />
                <input
                  type="text"
                  className="font-semibold p-2 bg-[#e2d9d7] placeholder-black rounded-md w-full lg:w-auto"
                  placeholder="Recherche une livraison"
                />
              </div>
              <div className="relative w-full lg:w-auto">
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default Dashboard;















