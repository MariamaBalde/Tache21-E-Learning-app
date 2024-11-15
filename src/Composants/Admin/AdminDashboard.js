import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../Config/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

function AdminDashboard() {
  const [coaches, setCoaches] = useState(0);
  const [etudiants, setEtudiants] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const coachesData = usersSnapshot.docs.filter(
        (doc) => doc.data().role === 'coach'
      ).length;
      const etudiantsData = usersSnapshot.docs.filter(
        (doc) => doc.data().role === 'student'
      ).length;

      setCoaches(coachesData);
      setEtudiants(etudiantsData);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Tableau de bord Administrateur
      </h1>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-600 mb-2">
            Coaches Inscrits
          </h2>
          <p className="text-3xl font-bold text-blue-500">{coaches}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-600 mb-2">
            Étudiants Inscrits
          </h2>
          <p className="text-3xl font-bold text-green-500">{etudiants}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center space-x-6">
        <Link to="/admin/creer-coach">
          <button className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-600">
            Créer un Coach
          </button>
        </Link>
        <Link to="/admin/creer-etudiant">
          <button className="bg-green-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-600">
            Créer un Étudiant
          </button>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
