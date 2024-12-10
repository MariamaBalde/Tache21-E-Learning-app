import React from 'react';

const CoursEtudiant = ({ title, description, image }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white hover:bg-gray-100 transition duration-300 flex flex-col justify-between">
            {/* Affichage de l'image */}
            <img src={image} alt={title} className="w-full h-48 object-cover mb-4" />

            {/* Titre et description */}
            <div className="flex-grow">
                <h2 className="font-bold text-xl mb-2">{title}</h2>
                <p className="text-gray-700 text-base mb-4">{description}</p>
            </div>

            {/* Progress bar et bouton d'action */}
            <div className="mt-auto">
                <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                    <div className="bg-blue-600 h-4 rounded-full" style={{ width: '0%' }}></div>
                </div>
                <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Démarrer
                </button>
            </div>
        </div>
    );
};

export default CoursEtudiant;