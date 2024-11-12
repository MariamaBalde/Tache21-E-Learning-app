import React from 'react'
import { BsFillGridFill } from "react-icons/bs";
import { FaHome, FaFolder, FaFileAlt  } from "react-icons/fa";


const NavbarSidebar = ({ openNavbarSidebar}) => {
  return (
    <aside id='sidebar' className={openNavbarSidebar ? "navbarSidebar-responsive" : ""}>
        <div className='sidebar-title'>
            {/* <div className='sidebar-brand'>
                <BsCart3 className='icon_header'/>SHOP
            </div> */}
            <span className='icon close_icon'>x</span>
        </div>

        <ul className='sidebar-list'>
           <li className='sidebar-list-item'>
           <a href=''>
                <FaHome className='icon' /> Dashboard
            </a>
           </li>

           <li className='sidebar-list-item'>
           <a href=''>
                < FaFileAlt className='icon' /> Cours
            </a>
           </li>
          
           <li className='sidebar-list-item'>
           <a href=''>
                <BsFillGridFill className='icon' /> Taches
            </a>
           </li>
           <li className='sidebar-list-item'>
           <a href=''>
                <FaFolder className='icon' /> Livraison
            </a>
           </li>
        </ul>
    </aside>
  )
}

export default NavbarSidebar