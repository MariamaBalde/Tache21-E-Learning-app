import React, { useEffect, useState } from 'react';
import { db } from '../../Config/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import Navbar from '../Shared/Navbar';
import Sidebar from '../Shared/Sidebar';
import StatsCard from './StatsCard';
import UserList from './UserList';
import Notifications from './Notifications';
import Settings from './Settings';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, 'users');
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs.map((doc) => doc.data());
      setUsers(userList);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-8">
          <h1 className="text-2xl font-bold text-gray-700 mb-4">
            Tableau de Bord Admin
          </h1>
          <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            <Link to="/admin/inscrire-coach">Inscrire un utilisateur</Link>
          </button>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <StatsCard />
            <UserList users={users} />
            <Notifications />
            <Settings />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
