import React from 'react'
import Navbar from './Navbar'
import NavbarSidebar from './NavbarSidebar'

const Layout = () => {
  return (
      <div className="flex flex-col min-h-screen">
          {/* Navbar */}
          <Navbar />

          <div className="flex flex-1">
              {/* Sidebar */}
              <NavbarSidebar />

              {/* Main Content */}
              <main className="flex-1 p-8 bg-gray-100">
                  <h1 className="text-3xl font-semibold mb-6">Main Content</h1>
                  <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
                      odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
                      quis sem at nibh elementum imperdiet.
                  </p>
              </main>
          </div>
      </div>
  )
}

export default Layout
