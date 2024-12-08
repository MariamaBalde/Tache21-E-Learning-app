// src/Composants/Shared/NavigationButtons.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between mt-6">
      <button
        onClick={() => navigate(-1)} // Retour à la page précédente
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-200"
      >
        Retour
      </button>
      <button
        onClick={() => navigate('/next-page')} // Remplacez par la route de la page suivante
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-200"
      >
        Suivant
      </button>
    </div>
  );
};

export default NavigationButtons;