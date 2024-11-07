import React from 'react';

const Cours = ({ title, description, image }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white hover:bg-gray-100 transition duration-300">
      <img src={image} alt={title} className="w-full h-40 object-cover mb-4" /> {/* Affichage de l'image */}
      <div className="font-bold text-xl mb-2">{title}</div>
      <p className="text-gray-700 text-base mb-4">
        {description}
      </p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Démarrer
      </button>
    </div>
  );
};

export default Cours;
