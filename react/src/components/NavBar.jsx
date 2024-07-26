import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import './styles/NavBar.css';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className='navbar'>
      <div className="logo">
        <Link to="/"><img src={logo} alt="Logo" /></Link>
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        <i className={menuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
      </div>
      <div className={`links ${menuOpen ? 'active' : ''}`}>
        <Link to="/cargar">Nuevo personaje</Link>
        <Link to="/marvel">Marvel</Link>
        <Link to="/dc">DC</Link>
      </div>
    </div>
  );
}

export default NavBar;

