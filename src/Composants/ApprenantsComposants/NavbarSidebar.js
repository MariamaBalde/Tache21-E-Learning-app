import React from 'react'
import Navbar from './Navbar'

const NavbarSidebar = () => {
  return (
    <div>
          <div className="flex flex-col min-h-screen">
              {/* Navbar */}
              <Navbar/>

              <div className="flex flex-1 bg-gray-100">
                  {/* Sidebar */}
                  <div className="w-64 bg-blue-600 text-white p-6 hidden md:block">
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

                  {/* Mobile Sidebar */}
                  <div className="md:hidden bg-blue-600 text-white p-4">
                      <h2 className="text-xl font-bold mb-2">Sidebar</h2>
                      <ul className="space-y-2">
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

                  {/* Main Content */}
                  <div className="flex-1 p-8">
                      <h1 className="text-3xl font-semibold mb-6">Main Content</h1>
                      <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
                          odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
                          quis sem at nibh elementum imperdiet.
                      </p>
                  </div>
              </div>
          </div>
    </div>
  )
}

export default NavbarSidebar
