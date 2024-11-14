// src/Composants/Auth/Inscription.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../Config/firebaseConfig'; // Import de la configuration Firebase

const Inscription = () => {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [error, setError] = useState('');

  const handleInscription = async (e) => {
    e.preventDefault();

    try {
      // Créer un utilisateur avec email et mot de passe via Firebase Authentication
      const utilisateur = await createUserWithEmailAndPassword(
        auth,
        email,
        motDePasse
      );

      // Ajouter les informations du coach dans Firestore
      const coachRef = doc(db, 'coachs', utilisateur.user.uid); // UID unique du coach
      await setDoc(coachRef, {
        prenom: prenom,
        nom: nom,
        email: email,
        createdAt: new Date(), // Ajoute la date de création
      });

      console.log('Coach inscrit avec succès');
      // Rediriger ou afficher un message de succès
    } catch (error) {
      setError(error.message);
      console.error("Erreur lors de l'inscription du coach : ", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleInscription}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Inscription Coach
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 font-medium" htmlFor="prenom">
            Prénom
          </label>
          <input
            type="text"
            id="prenom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            placeholder="Entrez votre prénom"
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium" htmlFor="nom">
            Nom
          </label>
          <input
            type="text"
            id="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Entrez votre nom"
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium" htmlFor="email">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Entrez votre e-mail"
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 font-medium"
            htmlFor="motDePasse"
          >
            Mot de passe
          </label>
          <input
            type="password"
            id="motDePasse"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            placeholder="Entrez votre mot de passe"
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          S'inscrire
        </button>
      </form>
    </div>
  );
};

export default Inscription;
