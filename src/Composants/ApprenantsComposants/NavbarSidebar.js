import { useState } from "react";

const NavbarSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
  return (
      <>
          {/* Toggle button for mobile */}
          <button
              className="md:hidden bg-blue-600 text-white p-2"
              onClick={toggleSidebar}
          >
              {isOpen ? "Close" : "Menu"}
          </button>

          {/* Sidebar */}
          <div
              className={`fixed md:relative top-0 left-0 w-64 bg-blue-600 text-white p-6 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                  } md:translate-x-0 transition-transform duration-200 ease-in-out`}
          >
              <h2 className="text-2xl font-bold mb-4">Sidebar</h2>
              <ul className="space-y-4">
                  <li className="hover:bg-blue-500 p-2 rounded">
                      <a href="#dashboard">Dashboard</a>
                  </li>
                  <li className="hover:bg-blue-500 p-2 rounded">
                      <a href="#profile">Profile</a>
                  </li>
                  <li className="hover:bg-blue-500 p-2 rounded">
                      <a href="#settings">Settings</a>
                  </li>
              </ul>
          </div>
      </>
  )
}

export default NavbarSidebar
