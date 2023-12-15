// @ts-nocheck
import React from 'react'
import { Link } from 'react-router-dom'
import './Navbare.css'

export default function Navbare() {
    const toggleSidebar = (e)=>{
        e.persist();
        document.body.classList.toggle('sidenav-toggled');
        localStorage.setItem('sidebar-toggle', document.body.classList.contains('sidenav-toggled'));
    }
  return (
    <div>
        <nav className="navbar navbar-white bg-white px-3 shadow">
          
        {/*<button className="btn btn-link btn-sm order-1 order-lg-0 me-3" id="sidebarToggle" to="#!" onClick={toggleSidebar}><i className="fas fa-bars"></i></button>
  <Link className="nav-item ms-4" to="/home">
    <img src="/logo-andalus.png" width="30" height="30" alt=""/>
  </Link>
*/}
<Link className="navbar-brand text-dark" to="#">Inventory Management App</Link>
</nav>
    </div>
  )
}
