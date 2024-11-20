// src/Composants/ApprenantsComposants/Parametres.js
import React from 'react';

const Parametres = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold">Paramètres du profil</h2>
      <form className="mt-6 space-y-4">
        <div>
          <label htmlFor="nom" className="block text-gray-700">Nom</label>
          <input type="text" id="nom" className="mt-2 w-full p-3 border rounded" />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input type="email" id="email" className="mt-2 w-full p-3 border rounded" />
        </div>
        <button type="submit" className="mt-4 bg-blue-600 text-white py-2 px-4 rounded">Sauvegarder</button>
      </form>
    </div>
  );
};

export default Parametres;
