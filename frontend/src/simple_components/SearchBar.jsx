import React, {useState, useRef} from 'react';
import axios from 'axios';

function SearchBar() {
  const [players, setPlayers] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showContent, setShowContent] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showPlayersDropdown, setShowPlayersDropdown] = useState(true);
  const [showClubsDropdown, setShowClubsDropdown] = useState(true);
  const [showCompetitionsDropdown, setShowCompetitionsDropdown] = useState(true);
  const errorTimeoutRef = useRef(null);
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };


  const handleSearchButton = (e) => {
    e.preventDefault();
    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current);
    }
    if (searchTerm) {
      axios.get(`http://localhost:3000/home/${searchTerm}`)
        .then(response => {
          const [fetchedPlayers, fetchedClubs, fetchedCompetitions] = response.data;
          setPlayers(fetchedPlayers.slice(0, 10));
          setClubs(fetchedClubs.slice(0, 5));
          setCompetitions(fetchedCompetitions.slice(0, 5));
          setShowContent(true);
          setShowError(false);
          setShowPlayersDropdown(fetchedPlayers.length >= 1);
          setShowClubsDropdown(fetchedClubs.length >= 1);
          setShowCompetitionsDropdown(fetchedCompetitions.length >= 1);

        })
        .catch(error => {
          console.error('Error:', error);
          setShowError(true);
          setShowContent(false);
          errorTimeoutRef.current = setTimeout(() => {
            setShowError(false);
          }, 5000);
        });
    }
  };


  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="search-bar-container d-flex align-items-center">
            <form id="searchForm" className="flex-grow-1 d-flex align-items-center" onSubmit={handleSearchButton}>
              <input
                type="text"
                className="form-control"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Search..."
              />
              <button type="submit" className="btn btn-outline-secondary ml-2">Search
              </button>


            </form>
          </div>
          {showContent && (
            <div className="row mt-2">
              {showPlayersDropdown && (
                <div className="col-md-4">
                  <h3>Players</h3>
                  {players.map((player, index) => (
                    <div key={`player-${player.id}-${index}`} className="card card-body p-2">
                      <h6 className="card-title mb-0">{player.name}</h6>
                    </div>
                  ))}
                </div>
              )}

              {showClubsDropdown && (
                <div className="col-md-4">
                  <h3>Clubs</h3>
                  {clubs.map((club, index) => (
                    <div key={`club-${club.id}-${index}`} className="card card-body p-2">
                      <h6 className="card-title mb-0">{club.name}</h6>
                    </div>
                  ))}
                </div>
              )}

              {showCompetitionsDropdown && (
                <div className="col-md-4">
                  <h3>Competitions</h3>
                  {competitions.map((competition, index) => (
                    <div key={`competition-${competition.id}-${index}`} className="card card-body p-2">
                      <h6 className="card-title mb-0">{competition.name}</h6>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {showError && (
            <div className="alert alert-danger">
              Unable to fetch data. Please try again later.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
