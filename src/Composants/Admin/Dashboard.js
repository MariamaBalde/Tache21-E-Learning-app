import React, { useEffect, useState } from 'react';
import { db } from '../../Config/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import Navbar from '../Shared/Navbar';
import Sidebar from '../Shared/Sidebar';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, 'users');
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs.map((doc) => {
        const data = { id: doc.id, ...doc.data() };
        if (data.createdAt && typeof data.createdAt.toDate === 'function') {
          data.createdAt = data.createdAt.toDate().toLocaleString();
        }
        return data;
      });
      setUsers(userList);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  const renderTable = (title, userList) => (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Nom</th>
              <th className="px-4 py-2 text-left">Prénom</th>
              <th className="px-4 py-2 text-left">E-mail</th>
              <th className="px-4 py-2 text-left">Date d'inscription</th>
              <th className="px-4 py-2 text-left">Statut</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-2">{user.nom}</td>
                <td className="px-4 py-2">{user.prenom}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.createdAt}</td>
                <td className="px-4 py-2">
                  {user.isActive ? (
                    <span className="text-green-500 font-bold">Actif</span>
                  ) : (
                    <span className="text-red-500 font-bold">Inactif</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Chargement...
      </div>
    );
  }

  const students = users.filter((user) => user.role === 'etudiant');
  const coaches = users.filter((user) => user.role === 'coach');
  const admins = users.filter((user) => user.role === 'admin');

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 bg-gray-800 text-white w-64 h-full transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="fixed top-0 w-full bg-white shadow z-10 flex items-center px-4 py-2">
          <button
            className="lg:hidden mr-4 text-gray-800"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <Navbar />
        </div>

        {/* Dashboard content */}
        <div className="mt-16 lg:mt-0 lg:ml-64 flex-1 p-4 lg:p-8">
          <h1 className="text-2xl font-bold mb-6">Tableau de Bord Admin</h1>

          {/* Bouton pour inscrire un utilisateur */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <button
              onClick={() => navigate('/inscrire')}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Inscrire un utilisateur
            </button>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-500 text-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-bold">Total Utilisateurs</h2>
              <p className="text-4xl font-bold mt-2">{users.length}</p>
            </div>
            <div className="bg-green-500 text-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-bold">Étudiants</h2>
              <p className="text-4xl font-bold mt-2">{students.length}</p>
            </div>
            <div className="bg-yellow-500 text-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-bold">Coachs</h2>
              <p className="text-4xl font-bold mt-2">{coaches.length}</p>
            </div>
          </div>

          {/* Tables */}
          {renderTable('Étudiants', students)}
          {renderTable('Coachs', coaches)}
          {renderTable('Administrateurs', admins)}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
