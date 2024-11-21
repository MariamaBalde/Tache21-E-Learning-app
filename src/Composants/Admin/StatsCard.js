import React from 'react';

const StatsCard = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-700">Statistiques</h2>
      <div className="mt-2">
        <p className="text-xl font-bold text-gray-800">Nombre d'utilisateurs</p>
        <p className="text-gray-600">120 utilisateurs</p>
      </div>
    </div>
  );
};

export default StatsCard;
