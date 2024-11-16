import React from 'react';

const UserList = ({ users }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-700">
        Liste des utilisateurs
      </h2>
      <table className="w-full mt-4">
        <thead>
          <tr>
            <th className="text-left p-2">Nom</th>
            <th className="text-left p-2">Rôle</th>
            <th className="text-left p-2">Email</th>
            <th className="text-left p-2">Date d'inscription</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.Role}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
