import React from 'react';
import { Link } from 'react-router-dom';
import { FaCog, FaHome, FaFolder, FaRegEnvelope, FaRegFileAlt } from "react-icons/fa";
import { BsFillGridFill } from "react-icons/bs";

const Sidebar = ({ sidebarToggle }) => {
  return (
    <div className={`${sidebarToggle ? "block" : "hidden"} lg:block w-64 bg-gray-800 fixed h-full px-4 py-2 transition-all duration-300`}>
      <div className="my-2 mb-4">
        <h1 className="text-2xl text-white font-bold">Admin Apprenant</h1>
      </div>
      <hr />

      {/* Sidebar Links */}
      <ul className="mt-3 text-white font-bold">
        <li className="mb-2 rounded py-2 hover:shadow hover:bg-blue-500">
          <Link className="px-3" to="/dashboard">
            <FaHome className="inline-block w-6 h-6 mr-2 mt-2" />
          Dashboard</Link>
        </li>
        <li className="mb-2 rounded py-2 hover:shadow hover:bg-blue-500">
          <Link to="/coursapp" className="px-3">
            <FaRegFileAlt className="inline-block w-6 h-6 mr-2 mt-2" />
            Cours
          </Link>
        </li>
        <li className="mb-2 rounded py-2 hover:shadow hover:bg-blue-500">
          <Link to="/livraisons" className="px-3">
            <FaFolder className="inline-block w-6 h-6 mr-2 mt-2" />
            Livraison
          </Link>
        </li>
        <li className="mb-2 rounded py-2 hover:shadow hover:bg-blue-500">
          <Link to="/taches" href="" className="px-3">
            <BsFillGridFill className="inline-block w-6 h-6 mr-2 mt-2" />
            Tâches
          </Link>
        </li>
        <li className="mb-2 rounded py-2 hover:shadow hover:bg-blue-500">
          <a href="" className="px-3">
            <FaCog className="inline-block w-6 h-6 mr-2 mt-2" />
            Paramètres
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

