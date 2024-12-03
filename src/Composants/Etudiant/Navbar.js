import React from 'react';
import { ChevronLeft, ChevronRight, Search, Bell } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="flex justify-between items-center mb-8 px-4 sm:px-6 lg:px-8">
      {/* Navigation controls */}
      <div className="flex items-center space-x-2">
        <ChevronLeft className="w-6 h-6 text-gray-500" />
        <ChevronRight className="w-6 h-6 text-gray-500" />
      </div>

      {/* Search bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="bg-white rounded-full py-2 px-4 pl-10 w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:w-48 md:w-64"
        />
        <Search className="w-5 h-5 text-gray-500 absolute left-3 top-2.5" />
      </div>

      {/* Profile and notification icons */}
      <div className="flex items-center space-x-4">
        <button className="text-gray-500">
          <Bell className="w-6 h-6" />
        </button>
        <button className="w-8 h-8 bg-gray-200 rounded-full"></button>
      </div>
    </header>
  );
}
