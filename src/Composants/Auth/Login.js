// src/Composants/Auth/Login.js
import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Logique de connexion ici...
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="flex max-w-4xl w-full shadow-lg bg-white rounded-lg">
        {/* Section gauche pour logo et texte */}
        <div className="w-1/2 p-8 flex flex-col justify-center items-center">
          <img src="path_to_logo" alt="Logo" className="h-24 mb-6" />
          <h2 className="text-3xl font-bold text-gray-700">
            Bienvenue dans l'application
          </h2>
          <p className="text-lg text-gray-500 mt-4">
            Se connecter pour continuer.
          </p>
        </div>

        {/* Section droite pour le formulaire de connexion */}
        <div className="w-1/2 p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Connexion</h2>
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
                placeholder="Entrez votre email"
              />
            </div>

            <div>
              <label
                htmlFor="motDePasse"
                className="block text-sm font-medium text-gray-700"
              >
                Mot de passe
              </label>
              <input
                id="motDePasse"
                type="password"
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
                placeholder="Entrez votre mot de passe"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg mt-4 hover:bg-blue-700"
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
