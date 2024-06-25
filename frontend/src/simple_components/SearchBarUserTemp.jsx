import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PopupPlayer from "./PopupPlayer.jsx";

function SearchBar({ callback }) {
  const [popupsOpen, setPopupsOpen] = useState({});
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showContent, setShowContent] = useState(false);
  const [showError, setShowError] = useState(false);
  const searchBarRef = useRef(null);

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

  const togglePopup = (id) => {
    setPopupsOpen(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

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
          <div className="position-absolute results-div-2" style={{backgroundColor:"rgb(255,255,255,100%)", borderRadius:"2%", marginTop:"10px"}}>
            {players.map((player, index) => (
              <div key={`player-${player.player_id}-${index}`}
                   style={{margin:"2px"}}
                   className="card card-body p-2 results-card" onClick={() => {callback(player); setShowContent(false); setSearchTerm('')}}>
                <button
                  style={{height:"20px"}}
                  className={"player-Usr"}
                  onMouseOver={() => togglePopup(player.playerId)}
                  onMouseLeave={() => togglePopup(player.playerId)}
                >
                  {player.name}
                </button>
                {popupsOpen[player.playerId] && <PopupPlayer isOpen={true} player={player}/>}
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
