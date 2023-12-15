import React from 'react'
import {NavLink} from 'react-router-dom'

export default function Sidebare() {
  return (
    <div className="sidebar bg-white shadow">
  <NavLink to="/home"><div className='row'><div className='col-3'><i className="fas fa-home"></i></div><div className='col-8'>Home</div></div></NavLink>
  <NavLink to="/stock"><div className='row'><div className='col-3'><i className="fas fa-boxes"></i></div><div className='col-8'>Stock</div></div></NavLink>
  <NavLink to="/outofstock"><div className='row'><div className='col-3'><i className="fas fa-store-slash"></i></div><div className='col-8'>Out of Stock</div></div></NavLink>
  <NavLink to="/tobuy"><div className='row'><div className='col-3'><i className="fas fa-clipboard-list"></i></div><div className='col-8'>To Buy List</div></div></NavLink>
  <NavLink to="/categories"><div className='row'><div className='col-3'><i className="fas fa-layer-group"></i></div><div className='col-8'>Categories</div></div></NavLink>
  <NavLink to="/products"><div className='row'><div className='col-3'><i className="fab fa-dropbox"></i></div><div className='col-8'>Products</div></div></NavLink>
  <NavLink to="/history"><div className='row'><div className='col-3'><i className="fas fa-history"></i></div><div className='col-8'>History</div></div></NavLink>
</div>
  )
}
