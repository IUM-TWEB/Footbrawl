import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import axios from 'axios';

const PaginaClub = () => {
  const { clubId } = useParams();
  const [clubData, setClubData] = useState(null);
  const [players, setPlayers] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { username, password, setNewClub, favoriteClubs, removeClub } = useAuth();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [hover, setHover] = useState(false);
  const [hoveredHomeTeam, setHoveredHomeTeam] = useState(null);
  const [hoveredAwayTeam, setHoveredAwayTeam] = useState(null);

  const formatCompetitionName = (name) => {
    if (!name) return "";
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  useEffect(() => {
    const fetchClubData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/club/${clubId}`);
        setClubData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClubData();
  }, [clubId]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/club/playersOfClubLastSeason/${clubId}`);
        setPlayers(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (clubId) {
      fetchPlayers();
    }
  }, [clubId]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/competition/last_game_by_club/${clubId}`);
        setGames(response.data.data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (clubId) {
      fetchGames();
    }
  }, [clubId]);

  useEffect(() => {
    setIsFavorite(favoriteClubs.includes(clubId));
  }, [favoriteClubs, clubId]);

  const handleFavorite = () => {
    if (!favoriteClubs.includes(clubId)) {
      setNewClub(clubId);
      axios.post("http://localhost:3000/users/favteam", { username, pwd: password, teamId: clubId })
        .then(res => {
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      removeClub(clubId);
      axios.post("http://localhost:3000/users/removeTeam", { username, pwd: password, teamId: clubId })
        .then(res => {
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  const svgSelector = (position) => {
    // [SVG code as in your original snippet]
  };

  const renderPlayer = (player) => {
    return (
      <div className="col-md-6 p-1" key={player.playerId}>
        <div className="h-100 border border-dark p-2 btn custom-button"
             onClick={() => navigate(`/giocatori/${player.playerId}`)}>
          <div className="row">
            <div className="col-md-3">
              <img src={`${player.imageUrl}`} alt="immagine giocatore" className="img-fluid" style={{ maxWidth: '90%' }}></img>
            </div>
            <div className="col-md-8 d-flex align-items-center justify-content-center">
              <div className="row">
                <h6 className="card-title">{player.name}</h6>
                <p className="mb-0">{player.countryOfBirth ? `${player.countryOfBirth}, ${player.age} anni` : `${player.age} anni`}</p>
              </div>
            </div>
            <div className="col-md-1 d-flex align-items-center justify-content-center">
              {svgSelector(player.position)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleChatClick = (nameRoom) => {
    if (localStorage.getItem("username")) {
      navigate(`/chat/${nameRoom}`);
    } else {
      navigate('/login');
    }
  };

  const handleMouseEnterHome = (index) => {
    setHoveredHomeTeam(index);
  };

  const handleMouseLeaveHome = () => {
    setHoveredHomeTeam(null);
  };

  const handleMouseEnterAway = (index) => {
    setHoveredAwayTeam(index);
  };

  const handleMouseLeaveAway = () => {
    setHoveredAwayTeam(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container-fluid">
      {clubData && (
        <div className="mt-4 mx-4 mb-4 flex-grow-1">
          <div className="row">
            <h2 className="col-md-7 mb-4">{clubData.name}</h2>
            <div className="col-md-5 h-50 d-flex justify-content-end">
              <button
                key={clubData.name}
                onClick={() => handleChatClick(clubData.name)}
                aria-label="chat button"
                className="btn btn-primary mb-2"
              >
                {"Unisciti alla chat di " + clubData.name}
              </button>
            </div>
          </div>

          <hr className="mb-4" />
          <div className="col-md-1 px-1">
            <button
              className={`mt-2 center-block btn w-50 ${isFavorite ? (hover ? 'btn-danger' : 'btn-success') : 'btn-outline-dark'}`}
              onClick={handleFavorite}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              <i className={`fas ${isFavorite ? (hover ? 'fa-times' : 'fa-check text-white') : 'fa-heart'}`}></i>
            </button>
          </div>
          <div className="row">

            <div className="col-md-3 d-flex flex-column align-items-center">

              <div className="mb-3">
                <img src={`https://tmssl.akamaized.net/images/wappen/head/${clubData.clubId}.png`} alt={'club logo'} />
              </div>
              <div className="text-center mt-2">
                <hr />
                <div className="border border-light-subtle p-2 btn custom-button" onClick={() => {
                  navigate(`/campionati/${clubData.domesticCompetitionId}`)
                }}>
                  <p className="h6">Competizione in cui gioca il club</p>
                  <p className="mb-1">{formatCompetitionName(clubData.domesticCompetitionName)}</p>
                </div>
                <hr />
                <p className="h6">Numero di giocatori</p>
                <p>{clubData.squadSize}</p>
                <hr />
                <p className="h6">Numero di giocatori stranieri</p>
                <p>{clubData.foreignersNumber}</p>
                <hr />
                <p className="h6">Percentuale di giocatori stranieri</p>
                <p>{clubData.foreignersPercentage + "%"}</p>
                <hr />
                <p className="h6">Età media dei giocatori</p>
                <p>{clubData.averageAge}</p>
                <hr />
                <p className="h6">Allenatore</p>
                <p>{clubData.coachName}</p>
                <hr />
                <p className="h6">Stadio in cui gioca il club</p>
                <p>{clubData.stadiumName}</p>
                <hr />
                <p className="h6">Capienza dello stadio</p>
                <p>{clubData.stadiumSeats} posti</p>
                <hr />
                <p className="h6">Valore di mercato totale del club</p>
                <p>{clubData.totalMarketVal + " euro"}</p>
                <hr />
                <p className="h6">Record di trasferimento del club</p>
                <p>{clubData.netTransferRec + " euro"}</p>
                <hr />
              </div>
            </div>

            <div className="col-md-6 d-flex flex-column align-items-center">
              <h2 className="d-flex flex-column align-items-center">Giocatori</h2>
              {players.length > 0 ? (
                <div className="container">
                  <div className="row">
                    {players.map((player) => renderPlayer(player))}
                  </div>
                </div>
              ) : (
                <p>Non sono stati trovati giocatori per questo club.</p>
              )}
            </div>

            <div className="col-md-3 d-flex flex-column align-items-center">
              <h2 className="mb-4 d-flex flex-column align-items-center">Ultime Partite</h2>
              {games.length > 0 ? (
                games.map((game, index) => (
                  <div
                    className="mb-4 p-2 border border-light-subtle rounded"
                    style={{
                      width: '100%',
                      maxWidth: '300px',
                      minHeight: '100px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1rem'
                    }}
                    key={index}
                  >
                    <p className="text-center mb-0">
                      <div
                        className="fw-semibold"
                        onClick={() => navigate(`/club/${game.home_club_id}`)}
                        onMouseEnter={() => handleMouseEnterHome(index)}
                        onMouseLeave={handleMouseLeaveHome}
                        style={{
                          cursor: 'pointer',
                          textDecoration: hoveredHomeTeam === index ? 'underline' : 'none'
                        }}
                      >
                        {game.home_club_name}
                      </div>
                      {game.home_club_goals} - {game.away_club_goals}
                      <div
                        className="fw-semibold"
                        onClick={() => navigate(`/club/${game.away_club_id}`)}
                        onMouseEnter={() => handleMouseEnterAway(index)}
                        onMouseLeave={handleMouseLeaveAway}
                        style={{
                          cursor: 'pointer',
                          textDecoration: hoveredAwayTeam === index ? 'underline' : 'none'
                        }}
                      >
                        {game.away_club_name}
                      </div>
                    </p>
                  </div>
                ))
              ) : (
                <p>Ultime partite non disponibili</p>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default PaginaClub;
