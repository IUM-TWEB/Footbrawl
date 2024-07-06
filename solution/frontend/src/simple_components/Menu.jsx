import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import biancoSVG from '../img/bianco.svg';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const Menu = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClickLogo = () => {
    navigate('/');
  };

  const getLinkClass = (path) => {
    return location.pathname === path ? 'menu-item active' : 'menu-item';
  };

  return (
    <nav className="menu">
      <div className="row align-items-center">
        {/* Prima colonna: Logo */}
        <div className="col-4 col-md-2">
          <img src={biancoSVG} className="logo img-fluid" alt="Descrizione dell'immagine" onClick={handleClickLogo} />
        </div>

        {/* Seconda colonna: Link */}
        <div className="col-8 col-md-9 text-center div-menu-scritte">
          <Link to="/" className={getLinkClass('/')}>Home</Link>
          <Link to="/news" className={getLinkClass('/news')}>News</Link>
          <Link to="/campionati" className={getLinkClass('/campionati')}>Campionati</Link>
          {isAuthenticated ? (
            <Link to="/paginauser" className={getLinkClass('/paginauser')}>User</Link>
          ) : (
            <Link to="/login" className={getLinkClass('/login')}>Login</Link>
          )}
          {/*<Link to="/chat" className="menu-item">Chat</Link>*/}
        </div>

        {/* Terza colonna: Padding */}
        <div className="col-md-1 d-none d-md-block">&nbsp;</div>
      </div>
    </nav>
  );
};

export default Menu;
