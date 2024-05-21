import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SearchBar({ setOpacity }) {
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
  const navigate = useNavigate();



  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    fetchData(value);
  };

  const handleClickClean = () => {
    setShowPlayersDropdown(false);
    setShowCompetitionsDropdown(false);
    setShowClubsDropdown(false);
    setShowContent(false);
    setOpacity(false);
  };

  const fetchData = (searchTerm) => {

    if(searchTerm==='')
      handleClickClean()
    else
      axios.get(`http://localhost:3000/home/${searchTerm}`)
        .then(response => {
          const [fetchedPlayers, fetchedClubs, fetchedCompetitions] = response.data;
          setPlayers(fetchedPlayers.slice(0, 10));
          setClubs(fetchedClubs.slice(0, 10));
          setCompetitions(fetchedCompetitions.slice(0, 10));
          setShowContent(true);
          setShowError(false);
          setOpacity(true);
          setShowPlayersDropdown(fetchedPlayers.length >= 1);
          setShowClubsDropdown(fetchedClubs.length >= 1);
          setShowCompetitionsDropdown(fetchedCompetitions.length >= 1);
        })
        .catch(error => {
          console.error('Error: ' , error);
          setShowError(true);
          setShowContent(false);
          setOpacity(false);
          errorTimeoutRef.current = setTimeout(() => {
            setShowError(false);
          }, 5000);
        });
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="search-bar-container d-flex align-items-center">
            <form id="searchForm" className="flex-grow-1 d-flex align-items-center" >
              <input
                id="searchInput"
                type="text"
                className="form-control"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Search..."
              />
              {/*<button type="button" className="btn btn-outline-secondary ml-2" onChange={handleSubmit}>Search</button>
              <button type="button" className="btn btn-outline-secondary ml-2" onClick={handleClickClean}>Clean</button>*/}
            </form>
          </div>

            {showContent && (
              <div className="position-absolute results-div">
              <div className="row mt-2">
                {showPlayersDropdown && (
                  <div className="col-md-4">
                    <h3>Players</h3>
                    {players.map((player, index) => (
                      <div key={`player-${player.player_id}-${index}`}
                           className="card card-body p-2 results-card" onClick={() => navigate(`/giocatori/${player.playerId}`)}>
                        <h6 className="card-title mb-0">{player.name}</h6>
                      </div>
                    ))}
                  </div>
                )}
                {showClubsDropdown && (
                  <div className="col-md-4">
                    <h3>Clubs</h3>
                    {clubs.map((club, index) => (
                      <div key={`club-${club.club_id}-${index}`}
                           className="card card-body p-2 results-card" onClick={() => navigate(`/club/${club.clubId}`)}>
                        <h6 className="card-title mb-0">{club.name}</h6>
                      </div>
                    ))}
                  </div>
                )}
                {showCompetitionsDropdown && (
                  <div className="col-md-4">
                    <h3>Competitions</h3>
                    {competitions.map((competition, index) => (
                      <div key={`competition-${competition.competition_id}-${index}`}
                           className="card card-body p-2 results-card" onClick={() => navigate(`/club/${competition.competitionId}`)}>
                        <h6 className="card-title mb-0">{competition.name}</h6>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              </div>
            )}
            {showError && (
              <div id="errorMessage" className="alert alert-danger">
                Mi dispiace, il termine che hai inserito non si trova nel nostro database
              </div>
            )}
          </div>
        </div>
      </div>

  );
}

export default SearchBar;
