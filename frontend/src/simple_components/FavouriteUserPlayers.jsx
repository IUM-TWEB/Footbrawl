import React, {useEffect, useState} from "react";

const FavouriteUserPlayers = ({playerNames}) => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);


  useEffect(() => {
    console.log("in fav ",playerNames)
    setSelectedPlayer(playerNames[0])

  }, [playerNames]);

  const handlePlayerClick = (player) => {
    console.log(player)
    setSelectedPlayer(player);
  };


  const formatValue = (value) => {
    return value === -1 ? 'non disponibile' : value + ' euro';
  };


  return (

    <div className="my-5">
      <h2>Giocatori Preferiti:</h2>
      {playerNames.length > 0 ? (
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
            {selectedPlayer && selectedPlayer && (
              <div className="p-3 border border-primary rounded">
                <div className="row align-items-center">
                  <div>
                    <h3>Giocatore: {selectedPlayer.name}</h3>
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