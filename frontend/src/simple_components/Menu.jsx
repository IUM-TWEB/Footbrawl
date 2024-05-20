import React from 'react';
import { Link } from 'react-router-dom';
import biancoSVG from '../img/bianco.svg'; // Importa il file SVG

const Menu = () => {
  return (
    <nav className="menu">

      <img src={biancoSVG} className="logo" alt="Descrizione dell'immagine" />
      <Link to="/" className="menu-item">Home</Link>
      <Link to="/news" className="menu-item">News</Link>
      <Link to="/partite" className="menu-item">Partite</Link>
      <Link to="/campionati" className="menu-item">Campionati</Link>
      <Link to="/club" className="menu-item">Club</Link>
      <Link to="/giocatori" className="menu-item">Giocatori</Link>
      <Link to="/mercato" className="menu-item">Mercato</Link>
      <Link to="/login" className="menu-item">Login</Link>
      <Link to="/chat" className="menu-item">Chat</Link>

    </nav>
  );
}

export default Menu;
