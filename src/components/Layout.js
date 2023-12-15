import React, { useEffect } from 'react'
import Navbare from './Navbare'
import Sidebare from './Sidebare'
import {Outlet} from 'react-router-dom'
import {useNavigate} from 'react-router'

export default function Layout() {
    const  navigate  = useNavigate()

useEffect(() => {
 if(window.location.pathname=='/'){
     navigate('/home');
 }

}, [])
  return (
    <div>
    <Navbare/>
            <Sidebare/>
           <div className='content'>
            <Outlet/>
            </div>
</div>
  )
}
