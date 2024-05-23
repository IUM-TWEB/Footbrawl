import React from 'react';
import {useAuth} from '../context/AuthContext';
import {useNavigate} from 'react-router-dom';

const PaginaUser = () => {
  const {username, favoritePlayers, favoriteClubs, logout} = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="container-fluid mt-5 px-5">
      <h1>Ciao {username ? username : 'utente'}</h1>
      {username && (
        <>
          <div>
            <h2>Giocatori Preferiti:</h2>
            <ul>
              {favoritePlayers.length > 0 ? (
                favoritePlayers.map((player, index) => (
                  <li key={index}>{player}</li>
                ))
              ) : (
                <li>Nessun giocatore preferito trovato</li>
              )}
            </ul>
          </div>
          <div>
            <h2>Club Preferiti:</h2>
            <ul>
              {favoriteClubs.length > 0 ? (
                favoriteClubs.map((club, index) => (
                  <li key={index}>{club}</li>
                ))
              ) : (
                <li>Nessun club preferito trovato</li>
              )}
            </ul>
          </div>
        </>
      )}
      <button onClick={handleLogout} className="btn btn-danger mt-3">Logout</button>
    </div>
  );
}

export default PaginaUser;