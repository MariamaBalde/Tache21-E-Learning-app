import React from 'react'
import  {Link} from 'react-router-dom'

function Sidebar() {
  return (
      <aside className="sidebar">
          <ul>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/livraisons">Livraisons</Link></li>
              <li><Link to="/certificats">Certificats</Link></li>
              <li><Link to="/messagerie">Messagerie</Link></li>
          </ul>
      </aside>
  )
}

export default Sidebar
