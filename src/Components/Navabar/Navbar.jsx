import React from 'react'
import { Link } from 'react-router-dom'
import style from './Navbar.module.scss'


export default function Navbar() {
  return (
  <nav className={`${style.myNav} navbar navbar-expand-lg navbar-dark`}>
  <div className="container">
    <Link to="" className={`${style.brand} navbar-brand`}>
        <img src="images/logo.png" alt="logo" className={`${style.logo}`}/>
    </Link>
  </div>
</nav>

  )
}
