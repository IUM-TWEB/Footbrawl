import React from 'react';
import {Link} from 'react-router-dom';
import {useAuth} from '../context/AuthContext.jsx';
import biancoSVG from '../img/bianco.svg';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
  const {isAuthenticated} = useAuth();
  const navigate = useNavigate();

  const handleClickLogo = () => {
    navigate('/');
  };

  return (
    <nav className="menu">

      <img src={biancoSVG} className="logo" alt="Descrizione dell'immagine" onClick={handleClickLogo} />
      <Link to="/" className="menu-item">Home</Link>
      <Link to="/news" className="menu-item">News</Link>
      <Link to="/campionati" className="menu-item">Campionati</Link>
      {isAuthenticated ? (<Link to="/paginauser" className="menu-item">User</Link>
      ) : (
        <Link to="/login" className="menu-item">Login</Link>
      )}
      {/*<Link to="/chat" className="menu-item">Chat</Link>*/}

    </nav>
  );
}

export default Menu;
