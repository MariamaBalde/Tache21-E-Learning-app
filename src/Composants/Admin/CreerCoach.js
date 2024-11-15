import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../Config/firebaseConfig'; // Import Firebase config
import { collection, getDocs } from 'firebase/firestore';

const AdminDashboard = () => {
  const [coachs, setCoachs] = useState(0);
  const [etudiants, setEtudiants] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Récupère les coachs et étudiants à partir de Firestore
    const fetchData = async () => {
      const coachRef = collection(db, 'users'); // Assumes 'users' collection has role field
      const snapshot = await getDocs(coachRef);
      const users = snapshot.docs.map((doc) => doc.data());

      const coachsCount = users.filter((user) => user.role === 'admin').length;
      const etudiantsCount = users.filter(
        (user) => user.role === 'student'
      ).length;

      setCoachs(coachsCount);
      setEtudiants(etudiantsCount);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-700 mb-8">
        Tableau de Bord Admin
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <button
          onClick={() => navigate('/admin/creer-coach')}
          className="w-64 bg-blue-500 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Inscrire un Coach
        </button>

        <button
          onClick={() => navigate('/admin/creer-etudiant')}
          className="w-64 bg-green-500 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
        >
          Inscrire un Étudiant
        </button>
      </div>

      <div className="mt-10 bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Statistiques</h2>
        <p className="text-gray-600">
          Utilisateurs inscrits : {coachs + etudiants}
        </p>
        <p className="text-gray-600">Coachs inscrits : {coachs}</p>
        <p className="text-gray-600">Étudiants inscrits : {etudiants}</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
