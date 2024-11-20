import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { FaCog, FaFolder } from 'react-icons/fa';
import { BsFillGridFill } from 'react-icons/bs';

const Sidebar = () => {
  const menus = [
    { nom: "Dashboard", link: "/", icon: MdOutlineDashboard },
    { nom: "Domaines", link: "/domaines", icon: BsFillGridFill },
    { nom: "SousDomaines", link: "/sousDomaines", icon: BsFillGridFill },
    { nom: "Cours", link: "/cours", icon: FaFolder },
    { nom: "Quizzes", link: "/quizzes", icon: FaFolder },
    { nom: "Paramètre", link: "/parametre", icon: FaCog },
  ];

  const [open, setOpen] = useState(true);

  return (
    <section className="flex">
      {/* Sidebar */}
      <div className={`bg-[#0e0e0e] min-h-screen ${open ? 'w-72' : 'w-16'} duration-300 px-4 text-gray-100`}>
        {/* Toggle Button for Sidebar */}
        <div className="py-3 flex justify-end">
          <HiMenuAlt3 size={26} className="cursor-pointer" onClick={() => setOpen(!open)} />
        </div>

        {/* Menu Links */}
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus.map((menu, index) => (
            <Link
              to={menu.link}
              key={index}
              className="group flex items-center text-sm font-medium gap-3.5 text-gray-300 hover:bg-gray-700 rounded-lg px-3 py-2"
            >
              {/* Icon */}
              <div>{React.createElement(menu.icon, { size: "20" })}</div>

              {/* Menu Name (Hide if the sidebar is closed) */}
              <h2
                className={`whitespace-nowrap duration-300 ${!open ? "opacity-0 translate-x-28 overflow-hidden" : ""}`}
                style={{ transitionDelay: `${index + 3}00ms` }}
              >
                {menu.nom}
              </h2>

              {/* Tooltip on Hover (only visible when sidebar is closed) */}
              <h2
                className={`${
                  open ? "hidden" : ""
                } absolute left-[-48px] bg-white text-gray-900 font-semibold whitespace-nowrap rounded-md drop-shadow-lg px-2 py-1 w-fit opacity-0 group-hover:opacity-100 group-hover:left-14 group-hover:duration-300`}
              >
                {menu.nom}
              </h2>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content Section */}
      <div className="flex-grow m-3 text-xl text-gray-900 font-semibold">
        {/* Contenu principal */}
      </div>
    </section>
  );
};

export default Sidebar;
