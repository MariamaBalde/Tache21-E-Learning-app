import React from 'react'

const Navbar = () => {
  return (
    <div>
          <nav className="bg-blue-600 text-white p-4">
              <div className="container mx-auto flex justify-between items-center">
                  <h1 className="text-2xl font-bold">MyApp</h1>
                  <ul className="flex space-x-4">
                      <li className="hover:bg-blue-500 p-2 rounded">
                          <a href="#home">Home</a>
                      </li>
                      <li className="hover:bg-blue-500 p-2 rounded">
                          <a href="#about">About</a>
                      </li>
                      <li className="hover:bg-blue-500 p-2 rounded">
                          <a href="#contact">Contact</a>
                      </li>
                  </ul>
              </div>
          </nav>
    </div>
  )
}

export default Navbar
