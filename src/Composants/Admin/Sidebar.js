import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-blue-600 h-screen p-4 text-white">
      <ul className="space-y-4">
        <li>
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/admin/inscrire-coach">Inscrire un utilisateur</Link>
        </li>
        {/* <li>
          <Link to="/admin/domaine">All domaines</Link>
        </li> */}
      </ul>
    </div>
  );
};

export default Sidebar;
