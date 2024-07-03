import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx";
import axios from 'axios';

const PaginaClub = () => {
  const {clubId} = useParams();
  const [clubData, setClubData] = useState(null);
  const [players, setPlayers] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {username, password, setNewClub, favoriteClubs, removeClub} = useAuth();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [hover, setHover] = useState(false);

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
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      document.querySelector('.parallax-slow').style.transform = `translateY(${scrollTop * 0.3}px)`;
      document.querySelector('.parallax-medium').style.transform = `translateY(${scrollTop * 0.5}px)`;
      document.querySelector('.parallax-fast').style.transform = `translateY(${scrollTop * 0.7}px)`;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Controlla se il club è tra i preferiti quando il componente viene montato
  useEffect(() => {
    setIsFavorite(favoriteClubs.includes(clubId));
  }, [favoriteClubs, clubId]);

  const handleFavorite = () => {
    if (!favoriteClubs.includes(clubId)) {
      console.log("non contenuto")
      setNewClub(clubId)
      axios.post("http://localhost:3000/users/favteam", {username: username, pwd: password, teamId: clubId})
        .then(res => {
          console.log(res)
        })
        .catch(e => {
          console.log(e)
        })
    } else {
      console.log(" contenuto")
      removeClub(clubId)
      axios.post("http://localhost:3000/users/removeTeam", {username: username, pwd: password, teamId: clubId})
        .then(res => {
          console.log(res)
        })
        .catch(e => {
          console.log(e)
        })
    }
  }

  const svgSelector = (position) => {
    switch (position) {
      case 'Attack':
        return (
          <div className={'col-1'} style={{marginBottom: '1%'}} title="Attaccante">
            <svg id="Layer_1" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"
                 data-name="Layer 1">
              <path
                d="m23.414.587a2.022 2.022 0 0 0 -1.941-.513 16.461 16.461 0 0 0 -6.479 3.983l-9.476 9.475a14.58 14.58 0 0 0 -4.376-1.522 1 1 0 0 0 -.286 1.979 12.632 12.632 0 0 1 5.353 2.387l-3.709 3.71-.793-.793a1 1 0 1 0 -1.414 1.414l3 3a1 1 0 1 0 1.414-1.414l-.793-.793 3.709-3.71a12.609 12.609 0 0 1 2.387 5.354 1 1 0 0 0 .99.856.881.881 0 0 0 .144-.011 1 1 0 0 0 .847-1.13 14.515 14.515 0 0 0 -1.522-4.376l9.475-9.476a16.52 16.52 0 0 0 4.01-6.574 1.994 1.994 0 0 0 -.54-1.846zm-4.885 7.005-9.167 9.168a11.15 11.15 0 0 0 -.988-1.134 11.36 11.36 0 0 0 -1.133-.988l9.167-9.167a14.384 14.384 0 0 1 5.584-3.464 14.453 14.453 0 0 1 -3.463 5.585z"/>
            </svg>
          </div>
        );
      case 'Defender':
        return (
          <div className={'col-1'} style={{marginBottom: '1%'}} title="Difensore">

            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" height="20" viewBox="0 0 24 24"
                 width="20">
              <path
                d="m11,0v23.94c-2.1-1.062-9-5.046-9-11.565v-7.225c0-1.293.828-2.441,2.056-2.848L11,0Zm8.944,2.302L13,0v24c2.207-.905,9-4.282,9-11.625v-7.225c0-1.293-.828-2.441-2.056-2.848Z"/>
            </svg>
          </div>

        );
      case 'Goalkeeper':
        return (
          <div className={'col-1'} style={{marginBottom: '1%'}} title="portiere">
            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" height="20" viewBox="0 0 24 24"
                 width="20">
              <path
                d="M19,0H5C2.243,0,0,2.243,0,5v14c0,2.757,2.243,5,5,5h14c2.757,0,5-2.243,5-5V5c0-2.757-2.243-5-5-5ZM8,17v-4h8v4H8Zm5-6V7h9v4H13Zm-5-6V2h8v3H8Zm3,2v4H2V7H11ZM2,13H6v4H2v-4Zm16,0h4v4h-4v-4Zm4-8h-4V2h1c1.654,0,3,1.346,3,3ZM5,2h1v3H2c0-1.654,1.346-3,3-3ZM2,19H11v3H5c-1.654,0-3-1.346-3-3Zm17,3h-6v-3h9c0,1.654-1.346,3-3,3Z"/>
            </svg>
          </div>
        )

      case 'Midfield':
        return (
          <div className={'col-1'} style={{marginBottom: '1%'}} title="Centrocampista">

            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" height="20" viewBox="0 0 24 24"
                 width="20">
              <path
                d="M23.7,1.715l.008-.008-.026-.026A2.994,2.994,0,0,0,22.319.319L22.293.293,22.285.3A2.951,2.951,0,0,0,21,0H18V2h2.586L17.6,4.989A12.507,12.507,0,0,0,.667,5.66l-.708.707,8.13,8.13L4.586,18H0v2H2.586L.293,22.293l1.414,1.414L4,21.414V24H6V19.414l3.5-3.5,8.13,8.13.707-.708A12.505,12.505,0,0,0,19.011,6.4L22,3.414V6h2V3A2.951,2.951,0,0,0,23.7,1.715ZM2.821,6.4a10.518,10.518,0,0,1,13.364,0L9.5,13.083ZM17.6,21.179,10.917,14.5,17.6,7.815A10.518,10.518,0,0,1,17.6,21.179Z"/>
            </svg>

          </div>
        )

    }
  }

  const renderPlayer = (player) => {
    return (
      <div className="col-md-6 p-1" key={player.playerId}>
        <div className="h-100 border border-dark p-2 btn custom-button"
             onClick={() => navigate(`/giocatori/${player.playerId}`)}>
          <div className="row">
            <div className="col-md-3">
              <img src={`${player.imageUrl}`} alt="immagine giocatore" className="img-fluid"
                   style={{maxWidth: '90%'}}></img>
            </div>
            <div className="col-md-8 d-flex align-items-center justify-content-center">
              <div className="row">
                <h6 className="card-title">{player.name}</h6>
                <p
                  className="mb-0">{player.countryOfBirth ? `${player.countryOfBirth}, ${player.age} anni` : `${player.age} anni`}</p>
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

  if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

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

          <hr className="mb-4"/>
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

            <div className="col-md-3 d-flex flex-column align-items-center parallax parallax-slow">

              <div className="mb-3">
                <img src={`https://tmssl.akamaized.net/images/wappen/head/${clubData.clubId}.png`} alt={'club logo'}/>
              </div>
              <div className="text-center mt-2">
                <hr/>
                <div className="border border-light-subtle p-2 btn custom-button" onClick={() => {
                  navigate(`/campionati/${clubData.domesticCompetitionId}`)
                }}>
                  <p className="h6">Competizione in cui gioca il club</p>
                  <p className="mb-1">{clubData.domesticCompetitionName}</p>
                </div>
                <hr/>
                <p className="h6">Numero di giocatori</p>
                <p>{clubData.squadSize}</p>
                <hr/>
                <p className="h6">Numero di giocatori stranieri</p>
                <p>{clubData.foreignersNumber}</p>
                <hr/>
                <p className="h6">Percentuale di giocatori stranieri</p>
                <p>{clubData.foreignersPercentage + "%"}</p>
                <hr/>
                <p className="h6">Età media dei giocatori</p>
                <p>{clubData.averageAge}</p>
                <hr/>
                <p className="h6">Allenatore</p>
                <p>{clubData.coachName}</p>
                <hr/>
                <p className="h6">Stadio in cui gioca il club</p>
                <p>{clubData.stadiumName}</p>
                <hr/>
                <p className="h6">Capienza dello stadio</p>
                <p>{clubData.stadiumSeats} posti</p>
                <hr/>
                <p className="h6">Valore di mercato totale del club</p>
                <p>{clubData.totalMarketVal + " euro"}</p>
                <hr/>
                <p className="h6">Record di trasferimento del club</p>
                <p>{clubData.netTransferRec + " euro"}</p>
                <hr/>
              </div>
            </div>

            <div className="col-md-6 d-flex flex-column align-items-center parallax parallax-fast">
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

            <div className="col-md-3 d-flex flex-column align-items-center parallax parallax-slow">
              <h2 className="mb-4 d-flex flex-column align-items-center">Ultime Partite</h2>
              {games.length > 0 ? (
                <div>
                  {games.map((game, index) => (
                    <div className="mb-5 p-2 border border-light-subtle rounded" key={index}>
                      <p className="text-center mb-0"><span
                        className="fw-semibold">{game.home_club_name}</span> {game.home_club_goals}</p>
                      <p className="text-center mb-0"> - </p>
                      <p className="text-center mb-0"><span
                        className="fw-semibold">{game.away_club_name}</span> {game.away_club_goals}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Non sono state trovate partite per questo club.</p>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default PaginaClub;
