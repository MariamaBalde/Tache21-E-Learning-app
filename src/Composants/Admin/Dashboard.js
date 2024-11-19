import React, { useEffect, useState } from 'react';
import { db } from '../../Config/firebaseConfig';
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import Navbar from '../Shared/Navbar';
import Sidebar from '../Shared/Sidebar';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const toggleActivation = async (userId, currentStatus) => {
    try {
      const userDoc = doc(db, 'users', userId);
      await updateDoc(userDoc, { isActive: !currentStatus });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, isActive: !currentStatus } : user
        )
      );
      alert(
        `Utilisateur ${!currentStatus ? 'activé' : 'désactivé'} avec succès !`
      );
    } catch (error) {
      console.error("Erreur lors de l'activation/désactivation :", error);
      alert("Impossible de mettre à jour l'état de l'utilisateur.");
    }
  };

  const deleteUser = async (userId) => {
    if (
      window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')
    ) {
      try {
        const userDoc = doc(db, 'users', userId);
        await deleteDoc(userDoc);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        alert('Utilisateur supprimé avec succès.');
      } catch (error) {
        console.error('Erreur lors de la suppression :', error);
        alert("Impossible de supprimer l'utilisateur.");
      }
    }
  };

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
              <th className="px-4 py-2 text-left">Action</th>
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
                <td className="px-4 py-2">
                  <button
                    onClick={() => toggleActivation(user.id, user.isActive)}
                    className={`px-4 py-2 rounded-lg ${
                      user.isActive ? 'bg-red-500' : 'bg-green-500'
                    } text-white`}
                  >
                    {user.isActive ? 'Désactiver' : 'Activer'}
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="ml-2 px-4 py-2 rounded-lg bg-gray-500 text-white"
                  >
                    Supprimer
                  </button>
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
    <div className="flex flex-col lg:flex-row h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-4 lg:p-8">
          <h1 className="text-2xl font-bold mb-6">Tableau de Bord Admin</h1>

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

          {/* Tableaux par rôle */}
          {renderTable('Étudiants', students)}
          {renderTable('Coachs', coaches)}
          {renderTable('Administrateurs', admins)}

          {/* Notifications */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-bold mb-4">Notifications</h2>
            <p>Aucune nouvelle notification</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
