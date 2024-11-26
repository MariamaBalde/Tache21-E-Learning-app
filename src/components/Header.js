import React from 'react';
import { FaBell, FaSearch, FaUserCircle, FaCog } from 'react-icons/fa';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <h1>Wellife</h1>
      <div className="header-icons">
        <FaSearch className="header-icon" />
        <FaBell className="header-icon" />
        <FaCog className="header-icon" />
        <FaUserCircle className="header-icon" />
      </div>
    </header>
  );
}

export default Header;
