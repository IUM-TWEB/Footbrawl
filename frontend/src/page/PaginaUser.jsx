import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useAuth} from '../context/AuthContext';
import {useNavigate} from 'react-router-dom';
import soccerFieldImage from '../img/soccer-green-field.png';

const PaginaUser = () => {
  const {username, favoritePlayers, favoriteClubs, logout} = useAuth();
  const navigate = useNavigate();
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedClub, setSelectedClub] = useState(null);
  const [playerDetails, setPlayerDetails] = useState(null);
  const [clubDetails, setClubDetails] = useState(null);

  const [playerNames, setPlayerNames] = useState([]);
  const [clubNames, setClubNames] = useState([]);
  const [formation, setFormation] = useState('4-4-2');
  const [selectedFormation, setSelectedFormation] = useState({
    forwards: [],
    midfielders: [],
    defenders: [],
    goalkeeper: null
  });

  useEffect(() => {
    if (favoritePlayers.length > 0) {
      // Faccio la fetch dei nomi dei player
      Promise.all(favoritePlayers.map(selectedPlayer =>
        axios.get(`http://localhost:3000/player/${selectedPlayer}`)
          .then(response => response.data)
      ))
        .then(players => {
          setPlayerNames(players);
          setSelectedPlayer(players[0]);
        })
        .catch(error => {
          console.error('Errore nel recuperare i nomi dei giocatori:', error);
        });
    }
  }, [favoritePlayers]);

  useEffect(() => {
    if (favoriteClubs.length > 0) {
      // Faccio la fetch dei nomi dei club
      Promise.all(favoriteClubs.map(selectedClub =>
        axios.get(`http://localhost:3000/club/${selectedClub}`)
          .then(response => response.data)
      ))
        .then(clubs => {
          setClubNames(clubs);
          setSelectedClub(clubs[0]);
        })
        .catch(error => {
          console.error('Errore nel recuperare i nomi dei club:', error);
        });
    }
  }, [favoriteClubs]);

  useEffect(() => {
    if (selectedPlayer && selectedPlayer.playerId) {
      axios.get(`http://localhost:3000/player/${selectedPlayer.playerId}`)
        .then(response => {
          setPlayerDetails(response.data);
        })
        .catch(error => {
          console.error('Errore nel recuperare i dettagli del giocatore:', error);
        });
    }
  }, [selectedPlayer]);

  useEffect(() => {
    if (selectedClub && selectedClub.id) {
      axios.get(`http://localhost:3000/club/${selectedClub.id}`)
        .then(response => {
          setClubDetails(response.data);
        })
        .catch(error => {
          console.error('Errore nel recuperare i dettagli del club:', error);
        });
    }
  }, [selectedClub]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
  };

  const handleClubClick = (club) => {
    setSelectedClub(club);
  };

  const handleFormationChange = (event) => {
    setFormation(event.target.value);
    // Reset della formazione selezionata quando si cambia la formazione
    setSelectedFormation({
      forwards: [],
      midfielders: [],
      defenders: [],
      goalkeeper: null
    });
  };

  const handlePlayerSelection = (player, position) => {
    setSelectedFormation(prevFormation => {
      const newFormation = {...prevFormation};
      switch (position) {
        case 'forward':
          newFormation.forwards = newFormation.forwards.includes(player) ? newFormation.forwards.filter(p => p !== player) : [...newFormation.forwards, player];
          break;
        case 'midfielder':
          newFormation.midfielders = newFormation.midfielders.includes(player) ? newFormation.midfielders.filter(p => p !== player) : [...newFormation.midfielders, player];
          break;
        case 'defender':
          newFormation.defenders = newFormation.defenders.includes(player) ? newFormation.defenders.filter(p => p !== player) : [...newFormation.defenders, player];
          break;
        case 'goalkeeper':
          newFormation.goalkeeper = newFormation.goalkeeper === player ? null : player;
          break;
        default:
          break;
      }
      return newFormation;
    });
  };

  const filterPlayersByPosition = (position) => {
    return playerNames.filter((player) => player.position === position);
  };

  const formatValue = (value) => {
    return value === -1 ? 'non disponibile' : value + ' euro';
  };

  const RowComponent = (elements, h) => {
    const numElements = elements.length;
    const colSize = Math.min(1, 12 / Math.max(1, numElements));

    return (
      <div className={`row flex-grow-1 d-flex justify-content-center align-items-center w-100 mx-0 ${h}`}>
        {elements.map((element, index) => (
          <div key={index} className={`col-md-${colSize + 1} d-flex justify-content-center align-items-center m-3`}>
            <p>{element}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container-fluid mt-5 px-5 pb-5">
      <h1>Utente: {username ? username : 'utente'}</h1>
      {username && (
        <>
          <div className="my-5">
            <h2>Giocatori Preferiti:</h2>
            {favoritePlayers.length > 0 ? (
              <div className="row align-items-center" style={{minHeight: '50vh'}}>
                <div className="col-md-3 border-2 border-end me-4">
                  <ul className="list-group">
                    {playerNames.map((player, index) => (
                      <li
                        className={`list-group-item ${selectedPlayer && selectedPlayer.playerId === player.playerId ? 'active' : ''}`}
                        key={index}
                        onClick={() => handlePlayerClick(player)}
                        style={{
                          cursor: 'pointer',
                          paddingLeft: selectedPlayer && selectedPlayer.playerId === player.playerId ? '20px' : '10px'
                        }}
                        aria-current={selectedPlayer && selectedPlayer.playerId === player.playerId ? 'true' : 'false'}
                      >
                        {player.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-md-8">
                  {selectedPlayer && playerDetails && (
                    <div className="p-3 border border-primary rounded">
                      <div className="row align-items-center">
                        <div>
                          <h3>Giocatore: {playerDetails.name}</h3>
                        </div>
                        <div className="col-md-8 border-2 border-end">
                          <p>Età: {playerDetails.age} anni</p>
                          <p>Altezza: {playerDetails.heightInCm} cm</p>
                          <p>Nazionalità: {playerDetails.countryOfBirth}</p>
                          <p>Posizione: {playerDetails.position}</p>
                          <p>Squadra: {playerDetails.currentClubName}</p>
                          <p>Ultima stagione: {playerDetails.lastSeason}</p>
                          <p>Valore di mercato: {formatValue(playerDetails.marketValue)}</p>
                          <p>Valore di mercato più alto: {formatValue(playerDetails.highestMarketValue)}</p>
                        </div>
                        <div className="col-md-4 text-center">
                          <img src={playerDetails.imageUrl} alt={playerDetails.name} className="img-fluid mb-3"
                               style={{maxWidth: '200px'}}/>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p>Nessun giocatore preferito</p>
            )}
          </div>

          <hr className="my-custom-hr"/>

          <div className="my-5">
            <h2>Club Preferiti:</h2>
            {favoriteClubs.length > 0 ? (
              <div className="row align-items-center" style={{minHeight: '50vh'}}>
                <div className="col-md-3">
                  <ul className="list-group">
                    {clubNames.map((club, index) => (
                      <li
                        className={`list-group-item ${selectedClub && selectedClub.id === club.id ? 'active' : ''}`}
                        key={index}
                        onClick={() => handleClubClick(club)}
                        style={{
                          cursor: 'pointer',
                          paddingLeft: selectedClub && selectedClub.id === club.id ? '20px' : '10px'
                        }}
                        aria-current={selectedClub && selectedClub.id === club.id ? 'true' : 'false'}
                      >
                        {club.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-md-8">
                  {selectedClub && clubDetails && (
                    <div className="p-3 border border-primary rounded">
                      <h3>Club: {clubDetails.name}</h3>
                      <p>Fondato nel: {clubDetails.founded}</p>
                      <p>Stadio: {clubDetails.stadium}</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p>Nessun club preferito</p>
            )}
          </div>

          <hr className="my-custom-hr"/>

          <div className="my-5">
            <h2 className="mb-4">Formazione della squadra preferita:</h2>
            <select value={formation} onChange={handleFormationChange} className="form-select mb-3">
              <option value="4-4-2">4-4-2</option>
              <option value="4-3-3">4-3-3</option>
              <option value="3-5-2">3-5-2</option>
              <option value="3-4-3">3-4-3</option>
              <option value="5-3-2">5-3-2</option>
            </select>

            <div className="row">
              <div className="col-md-4">
                <div className={"text-center"}>
                  <h3>Seleziona i giocatori:</h3>
                  <h4>Attaccanti</h4>
                  <ul className="list-unstyled">
                    {filterPlayersByPosition('Attack').map((player) => (
                      <li key={player.playerId} onClick={() => handlePlayerSelection(player, 'forward')}>
                        {player.name}
                      </li>
                    ))}
                  </ul>
                  <h4>Centrocampisti</h4>
                  <ul className="list-unstyled">
                    {filterPlayersByPosition('Midfield').map((player) => (
                      <li key={player.playerId} onClick={() => handlePlayerSelection(player, 'midfielder')}>
                        {player.name}
                      </li>
                    ))}
                  </ul>
                  <h4>Difensori</h4>
                  <ul className="list-unstyled">
                    {filterPlayersByPosition('Defender').map((player) => (
                      <li key={player.playerId} onClick={() => handlePlayerSelection(player, 'defender')}>
                        {player.name}
                      </li>
                    ))}
                  </ul>
                  <h4>Portieri</h4>
                  <ul className="list-unstyled">
                    {filterPlayersByPosition('Goalkeeper').map((player) => (
                      <li key={player.playerId} onClick={() => handlePlayerSelection(player, 'goalkeeper')}>
                        {player.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className=" col-md-4 d-flex align-items-stretch justify-content-center">
                <div
                  className=" background-image">
                  <div className="container-fluid d-flex flex-column justify-content-between h-100 px-0">
                    {RowComponent([1, 2], '')}
                    {RowComponent([1, 2, 3, 4], '')}
                    {RowComponent([1, 2, 3, 4], 'h-50')}
                    {RowComponent([1], 'h-50')}
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <h3 className="text-center">Giocatori selezionati:</h3>
                <div className="text-center">
                  <h4>Attaccanti</h4>
                  <ul className="list-unstyled">
                    {selectedFormation.forwards.map(player => (
                      <li key={player.playerId}>{player.name}</li>
                    ))}
                  </ul>
                  <h4>Centrocampisti</h4>
                  <ul className="list-unstyled">
                    {selectedFormation.midfielders.map(player => (
                      <li key={player.playerId}>{player.name}</li>
                    ))}
                  </ul>
                  <h4>Difensori</h4>
                  <ul className="list-unstyled">
                    {selectedFormation.defenders.map(player => (
                      <li key={player.playerId}>{player.name}</li>
                    ))}
                  </ul>
                  <h4>Portiere</h4>
                  <ul className="list-unstyled">
                    {selectedFormation.goalkeeper && (
                      <li key={selectedFormation.goalkeeper.playerId}>{selectedFormation.goalkeeper.name}</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>

          </div>

          <div className="d-flex justify-content-end w-100 mt-3">
            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default PaginaUser;
