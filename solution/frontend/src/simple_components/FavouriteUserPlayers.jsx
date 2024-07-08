import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const FavouriteUserPlayers = ({Players}) => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    setSelectedPlayer(Players[0])
  }, [Players]);

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
  };


  const formatValue = (value) => {
    return value === -1 ? 'non disponibile' : value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' euro';
  };

  return (
    <div className="my-5">
      <h2>Giocatori Preferiti:</h2>
      {Players.length > 0 ? (
        <div className="row align-items-center" style={{minHeight: '50vh'}}>
          <div className="col-md-3 border-2 border-end me-4">
            <ul className="list-group">
              {Players.map((player, index) => (
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
            {selectedPlayer && selectedPlayer && (
              <div className="p-3 border border-primary rounded">
                <div className="row align-items-center">
                  <div className="pe-0">
                    <div className="row">
                      <div className="h3 col-sm-11">Giocatore: {selectedPlayer.name}</div>
                      <div className="col-sm-1">
                        <button
                          className="fa-solid fa-up-right-from-square border-0 rounded-5 mt-0 mx-2 p-2 bottone-info"
                          style={{marginTop: '3%'}}
                          onClick={() => {
                            navigate(`/giocatori/${selectedPlayer.playerId}`)
                          }}
                          title="Dettagli club">
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8 border-2 border-end">
                    <p>Età: {selectedPlayer.age} anni</p>
                    <p>Altezza: {selectedPlayer.heightInCm} cm</p>
                    <p>Nazionalità: {selectedPlayer.countryOfBirth}</p>
                    <p>Posizione: {selectedPlayer.position}</p>
                    <p>Squadra: {selectedPlayer.currentClubName}</p>
                    <p>Ultima stagione: {selectedPlayer.lastSeason}</p>
                    <p>Valore di mercato: {formatValue(selectedPlayer.marketValue)}</p>
                    <p>Valore di mercato più alto: {formatValue(selectedPlayer.highestMarketValue)}</p>
                  </div>
                  <div className="col-md-4 text-center">
                    <img src={selectedPlayer.imageUrl} alt={selectedPlayer.name} className="img-fluid mb-3"
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

  )
}

export default FavouriteUserPlayers;
