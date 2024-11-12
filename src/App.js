import { useState } from 'react';
import './App.css';
import Dashbord from './Composants/ApprenantsComposants/Dashboard';
import NavbarSidebar from './Composants/ApprenantsComposants/NavbarSidebar';
import Header from './Composants/ApprenantsComposants/Header';


function App() {
  const [OpenNavbarSidebarToggle, setOpenNavbarSidebarToggle] = useState(false)

  const OpenNavbarSidebar = () => {
    setOpenNavbarSidebarToggle(!OpenNavbarSidebarToggle)
  }
  return (
     <div className='grid-container'>
     <NavbarSidebar />
     <Header />
     <Dashbord OpenNavbarSidebar = {OpenNavbarSidebar} />
     </div>
  );
}

export default App;
