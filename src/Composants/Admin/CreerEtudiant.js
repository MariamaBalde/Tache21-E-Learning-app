// src/Composants/Admin/CreerEtudiant.js
import React, { useState } from 'react';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../Config/firebaseConfig';

const CreerEtudiant = () => {
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [error, setError] = useState('');

  const handleCreerEtudiant = async (e) => {
    e.preventDefault();
    try {
      // Ajouter l'étudiant dans Firestore
      const etudiantRef = doc(db, 'etudiants', email);
      await setDoc(etudiantRef, {
        prenom,
        nom,
        email,
        motDePasse,
        createdAt: new Date(),
      });
      alert('Étudiant créé avec succès');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form
        onSubmit={handleCreerEtudiant}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl font-bold mb-4">Créer un Étudiant</h2>
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
        <input
          type="text"
          placeholder="Prénom"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="input-field"
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="btn-primary">
          Créer
        </button>
      </form>
    </div>
  );
};

export default CreerEtudiant;
