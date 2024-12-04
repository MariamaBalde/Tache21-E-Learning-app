import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, BookOpen, Clipboard, List, HelpCircle } from 'lucide-react'; // Changement d'icône pour les livraisons

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  const menus = [
    { name: "Dashboard", link: "etudiant/dashboard", icon: <Home className="w-5 h-5" /> },
    { name: "Cours", link: "etudiant/dashboard/courses", icon: <BookOpen className="w-5 h-5" /> }, // Icône de livre pour les cours
    { name: "Livraisons", link: "etudiant/dashboard/deliveries", icon: <Clipboard className="w-5 h-5" /> }, // Icône de clipboard pour les livraisons de cours
    { name: "Taches", link: "etudiant/dashboard/tasks", icon: <List className="w-5 h-5" /> }, // Icône de liste
    { name: "Quizzes", link: "etudiant/dashboard/quizzes", icon: <HelpCircle className="w-5 h-5" /> }, // Icône de question
  ];

  return (
    <div className={`bg-indigo-900 min-h-screen ${open ? 'w-64' : 'w-16'} sm:w-64 transition-all duration-300`}>
      {/* Sidebar Toggle Button for mobile */}
      <div className="flex justify-end py-3 px-4 sm:hidden">
        <button onClick={() => setOpen(!open)} className="text-white">
          {open ? "<<" : ">>"}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-8 px-4 mt-20">
        <div className="space-y-2">
          {menus.map((menu, index) => (
            <NavItem key={index} icon={menu.icon} text={menu.name} link={menu.link} open={open} />
          ))}
        </div>
      </nav>
    </div>
  );
}

function NavItem({ icon, text, link, open }) {
  return (
    <Link
      to={link}
      className={`group flex items-center text-sm font-medium gap-4 px-3 py-2 rounded-lg text-gray-300 hover:bg-indigo-800 ${!open ? 'justify-center' : ''}`}
    >
      {icon}
      <span className={`whitespace-pre duration-300 ${!open ? 'opacity-0 overflow-hidden' : ''}`}>
        {text}
      </span>

      {/* Tooltip for closed state */}
      {!open && (
        <span className="absolute left-16 bg-white text-gray-900 px-2 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-100 duration-300">
          {text}
        </span>
      )}
    </Link>
  );
}
