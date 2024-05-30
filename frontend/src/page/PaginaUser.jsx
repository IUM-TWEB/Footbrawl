import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const PaginaUser = () => {
  const { username, favoritePlayers, favoriteClubs, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  useEffect(() => {
    if (favoritePlayers.length > 0) {
      setSelectedPlayer(favoritePlayers[0]);
    }
  }, [favoritePlayers]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
  };

  return (
    <div className="container-fluid mt-5 px-5">
      <h1>Ciao {username ? username : 'utente'}</h1>
      {username && (
        <>
          <div>
            <h2>Giocatori Preferiti:</h2>
            {favoritePlayers.length > 0 ? (
              <>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                      {favoritePlayers.map((player, index) => (
                        <li
                          className={`nav-item ${selectedPlayer === player ? 'active' : ''}`}
                          key={index}
                          onClick={() => handlePlayerClick(player)}
                          style={{ cursor: 'pointer' }}
                        >
                          <span className={`nav-link ${selectedPlayer === player ? 'active' : ''}`}>{player}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </nav>
                {selectedPlayer && (
                  <div className="mt-3 p-3 border border-primary rounded">
                    <h3>Selected Player: {selectedPlayer}</h3>
                  </div>
                )}
              </>
            ) : (
              <p>Nessun giocatore preferito trovato</p>
            )}
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
};

export default PaginaUser;
