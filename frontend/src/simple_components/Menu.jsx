import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <nav className="menu">
      <Link to="/" className="menu-item">Home</Link>
      <Link to="/news" className="menu-item">News</Link>
      <Link to="/partite" className="menu-item">Partite</Link>
      <Link to="/campionati" className="menu-item">Campionati</Link>
      <Link to="/club" className="menu-item">Club</Link>
      <Link to="/giocatori" className="menu-item">Giocatori</Link>
      <Link to="/mercato" className="menu-item">Mercato</Link>
      <Link to="/login" className="menu-item">Login</Link>

    </nav>
  );
}

export default Menu;
