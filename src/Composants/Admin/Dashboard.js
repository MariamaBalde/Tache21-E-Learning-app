import React, { useEffect, useState } from 'react';
import { db } from '../../Config/firebaseConfig';
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import Navbar from '../Admin/Navbar';
import { useNavigate } from 'react-router-dom';
import GradientCard from '../Coach/GradientCard';
import { Users, GraduationCap, UserCheck } from 'lucide-react';


const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
      return;
    }
    try {
      await deleteDoc(doc(db, 'users', id));
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      // Message de confirmation
      alert("Utilisateur supprimé avec succès !");
    } catch (error) {
      console.error('Erreur lors de la suppression de l’utilisateur :', error);
      alert("Une erreur est survenue lors de la suppression. Veuillez réessayer.");
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const userDoc = doc(db, 'users', id);
      await updateDoc(userDoc, {
        isActive: !currentStatus,
      });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, isActive: !currentStatus } : user
        )
      );
    } catch (error) {
      console.error(
        'Erreur lors de la modification du statut de l’utilisateur :',
        error
      );
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
              <th className="px-4 py-2 text-left">Actions</th>
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
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 mr-2"
                  >
                    Supprimer
                  </button>
                  <button
                    onClick={() => handleToggleStatus(user.id, user.isActive)}
                    className={`${user.isActive ? 'bg-gray-500' : 'bg-green-500'
                      } text-white px-2 py-1 rounded hover:bg-green-600`}
                  >
                    {user.isActive ? 'Désactiver' : 'Activer'}
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
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <div className="">
        <Navbar />
      </div>

      {/* Main content */}
      <div className="mt-16 p-4 lg:p-8 flex-1 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Tableau de Bord Admin</h1>

        {/* Bouton pour inscrire un utilisateur */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <button
            onClick={() => navigate('/admin/inscrire-utilisateur')} // Assurez-vous que le chemin est correct
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Inscrire un utilisateur
          </button>

          <button
            onClick={() => navigate('/admin/domaine')} // Assurez-vous que le chemin est correct
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 ml-5"
          >
            All domaines
          </button>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <GradientCard
            title={`Total Utilisateurs
               ${users.length}`}
            icon={Users}
            gradient="bg-gradient-to-br from-blue-600 to-blue-300"
          />
          <GradientCard
            title={`Étudiants
               ${students.length}`}
            icon={GraduationCap}
            gradient="bg-gradient-to-br from-blue-300 to-[#FF66FF]"
          />
          <GradientCard
            title={`Coachs
               ${coaches.length}`}
            icon={UserCheck}
            gradient="bg-gradient-to-br from-white to-blue-800"
          />
        </div>

        {/* Tables */}
        {renderTable('Étudiants', students)}
        {renderTable('Coachs', coaches)}
        {renderTable('Administrateurs', admins)}
      </div>
    </div>
  );
};


export default AdminDashboard;
