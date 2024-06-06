import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SearchBar({ callback }) {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showContent, setShowContent] = useState(false);
  const [showError, setShowError] = useState(false);
  const searchBarRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setShowContent(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Se c'è un valore, tenta di fetchare i dati
    if (value) {
      fetchData(value);
      setShowContent(true);  // Assicurati che la tendina si riapra quando l'utente digita
    } else {
      setShowContent(false); // Chiudi la tendina se il campo di ricerca è vuoto
    }
  };

  const fetchData = (searchTerm) => {
    axios.get(`http://localhost:3000/home/${searchTerm}`)
      .then(response => {
        const [fetchedPlayers] = response.data;
        setPlayers(fetchedPlayers.slice(0, 10));
        setShowError(false);
      })
      .catch(error => {
        console.error('Error: ', error);
        setShowError(true);
        setShowContent(false);
      });
  };

  return (
    <div className="container" ref={searchBarRef}>
      <div className=" justify-content-center">
        <div className="search-bar-container d-flex align-items-center">
          <form id="searchForm" className="flex-lg-grow-1 d-flex align-items-center">
            <input
              id="searchInput"
              type="text"
              className="form-control"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Search..."
              onFocus={() => searchTerm && setShowContent(true)} // Riapri la tendina quando il campo di input è nuovamente focalizzato e non vuoto
            />
          </form>
        </div>

        {showContent && (
          <div className="position-absolute results-div-2">
            {players.map((player, index) => (
              <div key={`player-${player.player_id}-${index}`}
                   className="card card-body p-2 results-card" onClick={() => callback(player)}>
                <h6 className="card-title mb-0">{player.name}</h6>
              </div>
            ))}
          </div>
        )}
        {showError && (
          <div id="errorMessage" className="alert alert-danger">
            Giocatore non trovato
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
