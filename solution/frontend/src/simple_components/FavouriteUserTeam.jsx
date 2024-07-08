import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const FavouriteUserTeam = ({clubs}) => {
  const [selectedClub, setSelectedClub] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (clubs && clubs.length > 0) {
      setSelectedClub(clubs[0]);
    }
  }, [clubs]);

  const handleClubClick = (club) => {
    setSelectedClub(club);
  };

  const formatValue = (value) => {
    return value === -1 ? 'non disponibile' : value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' euro';
  };

  const transformCompetitionName = (name) => {
    if (!name) return 'non disponibile';
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <div className="my-5">
      <h2>Club Preferiti:</h2>
      {clubs && clubs.length > 0 ? (
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
                  <div className="pe-0">
                    <div className="row">
                      <div className="h3 col-sm-11">Club: {selectedClub.name}</div>
                      <div className="col-sm-1">
                        <button
                          className="fa-solid fa-up-right-from-square border-0 rounded-5 mt-0 mx-2 p-2 bottone-info"
                          style={{marginTop: '3%'}}
                          onClick={() => {
                            navigate(`/club/${selectedClub.clubId}`)
                          }}
                          title="Dettagli club">
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8 border-2 border-end">
                    <p>Campionato in cui gioca: {transformCompetitionName(selectedClub.domesticCompetitionName)}</p>
                    <p>Allenatore: {selectedClub.coachName || 'non disponibile'}</p>
                    <p>Stadio: {selectedClub.stadiumName || 'non disponibile'}</p>
                    <p>Posti a sedere dello stadio: {(selectedClub.stadiumSeats).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
                    <p>Ultima Stagione: {selectedClub.last_season || 'non disponibile'}</p>
                    <p>Valore totale di mercato: {formatValue(selectedClub.totalMarketVal)}</p>
                  </div>
                  <div className="col-md-4 text-center">
                    <img src={`https://tmssl.akamaized.net/images/wappen/head/${selectedClub.clubId}.png`}
                         alt={selectedClub.name} className="img-fluid mb-3"
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
  );
};

export default FavouriteUserTeam;
