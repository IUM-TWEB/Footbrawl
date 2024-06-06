import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useAuth} from '../context/AuthContext';
import {useNavigate} from 'react-router-dom';
import TeamBuilder from "../simple_components/TeamBuilder.jsx";
const PaginaUser = () => {
  const {username, favoritePlayers, favoriteClubs, logout} = useAuth();
  const navigate = useNavigate();
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedClub, setSelectedClub] = useState(null);
  const [playerDetails, setPlayerDetails] = useState(null);
  const [clubDetails, setClubDetails] = useState(null);

  const [playerNames, setPlayerNames] = useState([]);
  const [clubNames, setClubNames] = useState([]);


  useEffect(() => {
    if (favoritePlayers.length > 0) {
      // Faccio la fetch dei nomi dei player
      Promise.all(favoritePlayers.map(selectedPlayer =>
        axios.get(`http://localhost:3000/player/${selectedPlayer}`)
          .then(response => response.data)
      ))
        .then(players => {
          console.log(players)
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

  const formatValue = (value) => {
    return value === -1 ? 'non disponibile' : value + ' euro';
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

          <TeamBuilder favoritePlayers={playerNames}></TeamBuilder>

          <div className="d-flex justify-content-end w-100 mt-3">
            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default PaginaUser;
