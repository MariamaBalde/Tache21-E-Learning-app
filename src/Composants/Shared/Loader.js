// src/Composants/Shared/Loader.js
import React from "react";
import { FaSpinner } from "react-icons/fa"; // Utilise react-icons pour un spinner sympa

const Loader = () => {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-gray-100 bg-opacity-50 flex items-center justify-center z-50">
        <div className="spinner border-t-4 border-blue-800 rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  };

export default Loader;