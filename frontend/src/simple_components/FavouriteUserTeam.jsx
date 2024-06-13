import React, {useEffect, useState} from "react";


const FavouriteUserTeam = ({clubNames}) => {
  const [selectedClub, setSelectedClub] = useState(null);
  const [clubDetails, setClubDetails] = useState(null);

  useEffect(() => {
    setSelectedClub(clubNames[0])

  }, [clubNames]);

  const handleClubClick = (club) => {
    setSelectedClub(club);
  };


  return (
    <div className="my-5">
      <h2>Club Preferiti:</h2>
      {clubNames.length > 0 ? (
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
  )
}

export default FavouriteUserTeam;