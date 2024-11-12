import React from 'react';
import { FaCog, FaHome, FaFolder, FaRegEnvelope, FaRegFileAlt } from "react-icons/fa";
import { BsFillGridFill } from "react-icons/bs";

const Sidebar = ({ sidebarToggle }) => {
  return (
    <div className={`${sidebarToggle ? "block" : "hidden"} md:block w-64 bg-gray-800 fixed h-full px-4 py-2 transition-all duration-300`}>
      
      
      <div className='my-2 mb-4'>
        <h1 className='text-2xl text-white font-bold'>Admin Apprenant</h1>
      </div>

      <hr />
      
      {/* Sidebar Links */}
      <ul className='mt-3 text-white font-bold'>
        
        <li className='mb-2 rounded py-2 hover:shadow hover:bg-blue-500'>
          <a href='' className='px-3'>
            <FaHome className='inline-block w-6 h-6 mr-2 mt-2' />
            Dhasbord
          </a>
        </li>
        
        <li className='mb-2 rounded py-2 hover:shadow hover:bg-blue-500'>
          <a href='' className='px-3'>
            <FaRegFileAlt className='inline-block w-6 h-6 mr-2 mt-2' />
            Cours
          </a>
        </li>

        <li className='mb-2 rounded py-2 hover:shadow hover:bg-blue-500'>
          <a href='' className='px-3'>
            <FaFolder className='inline-block w-6 h-6 mr-2 mt-2' />
            Livraison
          </a>
        </li>

        <li className='mb-2 rounded py-2 hover:shadow hover:bg-blue-500'>
          <a href='' className='px-3'>
            <BsFillGridFill className='inline-block w-6 h-6 mr-2 mt-2' />
            Taches
          </a>
        </li>

        <li className='mb-2 rounded py-2 hover:shadow hover:bg-blue-500'>
          <a href='' className='px-3'>
            <FaCog className='inline-block w-6 h-6 mr-2 mt-2' />
            Setting
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;