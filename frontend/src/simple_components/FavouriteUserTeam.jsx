import React, {useEffect, useState} from "react";


const FavouriteUserTeam = ({clubs}) => {
  const [selectedClub, setSelectedClub] = useState(null);


  useEffect(() => {
    setSelectedClub(clubs[0])

  }, [clubs]);

  const handleClubClick = (club) => {
    setSelectedClub(club);
  };


  return (
    <div className="my-5">
      <h2>Club Preferiti:</h2>
      {clubs.length > 0 ? (
        <div className="row align-items-center" style={{minHeight: '50vh'}}>
          <div className="col-md-3">
            <ul className="list-group">
              {clubs.map((club, index) => (
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
            {selectedClub && (
              <div className="p-3 border border-primary rounded">
                <h3>Club: {selectedClub.name}</h3>
                <p>Fondato nel: {selectedClub.founded}</p>
                <p>Stadio: {selectedClub.stadiumName}</p>
                <p>Ultima Stagione: {selectedClub.last_season}</p>
                <p>Valore di mercato: {selectedClub.totalMarketVal}</p>
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