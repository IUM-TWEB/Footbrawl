import React, {useEffect, useState} from "react";

const FavouriteUserTeam = ({clubs}) => {
  const [selectedClub, setSelectedClub] = useState(null);

  useEffect(() => {
    setSelectedClub(clubs[0])
  }, [clubs]);

  const handleClubClick = (club) => {
    setSelectedClub(club);
  };

  const formatValue = (value) => {
    return value === -1 ? 'non disponibile' : value + ' euro';
  };

  return (
    <div className="my-5">
      <h2>Club Preferiti:</h2>
      {clubs.length > 0 ? (
        <div className="row align-items-center" style={{minHeight: '50vh'}}>
          <div className="col-md-3 border-2 border-end me-4">
            <ul className="list-group">
              {clubs.map((club, index) => (
                <li
                  className={`list-group-item ${selectedClub && selectedClub.clubId === club.clubId ? 'active' : ''}`}
                  key={index}
                  onClick={() => handleClubClick(club)}
                  style={{
                    cursor: 'pointer',
                    paddingLeft: selectedClub && selectedClub.clubId === club.clubId ? '20px' : '10px'
                  }}
                  aria-current={selectedClub && selectedClub.clubId === club.clubId ? 'true' : 'false'}
                >
                  {club.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="col-md-8">
            {selectedClub && (
              <div className="p-3 border border-primary rounded">
                <div className="row align-items-center">
                  <div>
                    <h3>Club: {selectedClub.name}</h3>
                  </div>
                  <div className="col-md-8 border-2 border-end">
                    <p>Campionato in cui gioca: {selectedClub.domesticCompetitionName}</p>
                    <p>Allenatore: {selectedClub.coachName}</p>
                    <p>Stadio: {selectedClub.stadiumName}</p>
                    <p>Posti a sedere dello stadio: {selectedClub.stadiumSeats}</p>
                    <p>Ultima Stagione: {selectedClub.last_season}</p>
                    <p>Valore totale di mercato: {formatValue(selectedClub.totalMarketVal)}</p>
                  </div>
                  <div className="col-md-4 text-center">
                    <img src={`https://tmssl.akamaized.net/images/wappen/head/${selectedClub.clubId}.png`} alt={selectedClub.name} className="img-fluid mb-3"
                         style={{maxWidth: '200px'}}/>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>Nessun club preferito</p>
      )}
    </div>
  )
}

export default FavouriteUserTeam;