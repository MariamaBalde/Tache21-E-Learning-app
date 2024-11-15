// src/Composants/Admin/GestionUtilisateurs.js
import React, { useState, useEffect } from 'react';
import { db } from '../../Config/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const GestionUtilisateurs = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUtilisateurs = async () => {
      try {
        // Récupérer les utilisateurs de Firestore
        const usersRef = collection(db, 'users'); // Assuming 'users' collection
        const snapshot = await getDocs(usersRef);
        const usersList = snapshot.docs.map((doc) => doc.data());
        setUtilisateurs(usersList);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUtilisateurs();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Gérer les Utilisateurs</h2>
      {error && <p className="text-red-500">{error}</p>}
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Nom</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Rôle</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {utilisateurs.map((utilisateur, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{utilisateur.nom}</td>
              <td className="border px-4 py-2">{utilisateur.email}</td>
              <td className="border px-4 py-2">{utilisateur.role}</td>
              <td className="border px-4 py-2">
                <button className="btn-danger">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GestionUtilisateurs;
