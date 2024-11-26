import React from 'react';
import { FaCalendar, FaRunning, FaCog, FaUtensils, FaBook } from 'react-icons/fa';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <FaCalendar className="icon" />
      <FaRunning className="icon" />
      <FaCog className="icon" />
      <FaUtensils className="icon" />
      <FaBook className="icon" />
    </div>
  );
}

export default Sidebar;
