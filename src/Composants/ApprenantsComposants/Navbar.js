import React, { useState } from 'react'

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
  return (
      <nav className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
              {/* Logo */}
              <h1 className="text-2xl font-bold">MyApp</h1>

              {/* Hamburger Menu Icon for Mobile */}
              <button
                  className="md:hidden block focus:outline-none"
                  onClick={toggleMenu}
              >
                  <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                      />
                  </svg>
              </button>

              {/* Navigation Links */}
              <ul
                  className={`md:flex md:space-x-4 md:static absolute top-full left-0 w-full bg-blue-600 md:bg-transparent ${isOpen ? "block" : "hidden"
                      } md:block`}
              >
                  <li className="hover:bg-blue-500 p-2 rounded md:inline-block">
                      <a href="#home">Home</a>
                  </li>
                  <li className="hover:bg-blue-500 p-2 rounded md:inline-block">
                      <a href="#about">About</a>
                  </li>
                  <li className="hover:bg-blue-500 p-2 rounded md:inline-block">
                      <a href="#contact">Contact</a>
                  </li>
              </ul>
          </div>
      </nav>
  )
}

export default Navbar
