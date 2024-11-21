import React from 'react';

const UserList = ({ users, handleToggleStatus }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-700">
        Liste des utilisateurs
      </h2>
      <table className="w-full mt-4">
        <thead>
          <tr>
            <th className="text-left p-2">Nom</th>
            <th className="text-left p-2">Prénom</th>
            <th className="text-left p-2">Rôle</th>
            <th className="text-left p-2">Email</th>
            <th className="text-left p-2">Date d'inscription</th>
            <th className="text-left p-2">Statut</th>
            <th className="text-left p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td className="p-2">{user.nom}</td>
              <td className="p-2">{user.prenom}</td>
              <td className="p-2">{user.role}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.createdAt}</td>
              <td className="p-2">
                <span
                  className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                    user.status === 'activé'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {user.status === 'activé' ? 'Activé' : 'Désactivé'}
                </span>
              </td>
              <td className="p-2">
                <button
                  onClick={() => handleToggleStatus(user.id, user.status)}
                  className={`px-4 py-2 rounded-md text-white ${
                    user.status === 'activé' ? 'bg-red-500' : 'bg-green-500'
                  }`}
                >
                  {user.status === 'activé' ? 'Désactiver' : 'Activer'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
