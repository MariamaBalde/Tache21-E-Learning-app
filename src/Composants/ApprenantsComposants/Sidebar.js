import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { FaCog, FaFolder, FaRegFileAlt } from 'react-icons/fa';
import { BsFillGridFill } from 'react-icons/bs';

const Sidebar = () => {
  const menus = [
    { nom: "Dashboard", link: "/", icon: MdOutlineDashboard },
    { nom: "Cours", link: "/cours", icon: FaFolder },
    { nom: "Taches", link: "/taches", icon: BsFillGridFill },
    { nom: "Livraisons", link: "/livraisons", icon: FaRegFileAlt },
    { nom: "Parametre", link: "/settings", icon: FaCog },
  ];

  const [open, setOpen] = useState(true);

  return (
    <section className='flex gap-6'>
      <div className={`bg-[#0e0e0e] min-h-screen ${open ? 'w-72' : 'w-16'} duration-500 px-4 text-gray-100`}>
        <div className='py-3 flex justify-end'>
          <HiMenuAlt3 size={26} className='cursor-pointer' onClick={() => setOpen(!open)} />
        </div>
        <div className='mt-4 flex flex-col gap-4 relative'>
          {menus.map((menu, i) => (
            <Link to={menu.link} key={i} className="group flex items-center text-sm font-medium gap-3.5 text-gray-300 hover:bg-gray-700 rounded-lg px-3 py-2">
              <div>{React.createElement(menu.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${!open ? "opacity-0 translate-x-28 overflow-hidden" : ""}`}
              >
                {menu.nom}
              </h2>

              <h2
                className={`${
                  open ? "hidden" : ""
                } absolute left-[-48px] bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
              >
                {menu.nom}
              </h2>
            </Link>
          ))}
        </div>
      </div>
      <div className='m-3 text-xl text-gray-900 font-semibold'>
        {/* Interface Apprenant */}
      </div>
    </section>

  );
};

export default Sidebar;
