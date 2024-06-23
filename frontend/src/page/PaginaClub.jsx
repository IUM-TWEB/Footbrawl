import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import axios from 'axios';

const PaginaClub = () => {
  const {clubId} = useParams();
  const [clubData, setClubData] = useState(null);
  const [players, setPlayers] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        const response = await axios.get(`http://localhost:3000/player/playersOfClubLastSeason/${clubId}`);
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
        const response = await axios.get(`http://localhost:3000/last_game_by_club/${clubId}`);
        setGames(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (clubId) {
      fetchGames();
    }
  }, [clubId]);

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
      <div className="col-md-6" key={player.playerId}>
        <div className="card">
          <div className="card-body p-2">
            <div className="row">
              <div className="col-md-10">
                <h6 className="card-title">{player.name}</h6>
              </div>
              <div className="col-md-2">
                {svgSelector(player.position)}
              </div>
            </div>

            <p className="card-text">Età: {player.age}</p>
            <p className="card-text">Nazionalità: {player.countryOfBirth}</p>
            <p className="card-text">Market Value: {player.marketValue}</p>
          </div>
        </div>
      </div>
    );
  };

  if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {clubData && (
        <div className="mt-4 mx-4 mb-4">
          <h2 className="mb-5">{clubData.name}</h2>
          <div className="row">
            <div className="col-md-3 d-flex flex-column align-items-center">
              <div className="mb-3">
                <img src={`https://tmssl.akamaized.net/images/wappen/head/${clubData.clubId}.png`} alt={'club logo'}/>
              </div>
              <div className="text-center mt-2">
                <hr/>
                <p>Competizione in cui gioca il club:</p>
                <p>{clubData.domesticCompetitionName}</p>
                <hr/>
                <p>Numero di giocatori:</p>
                <p>{clubData.squadSize}</p>
                <hr/>
                <p>Numero di giocatori stranieri:</p>
                <p>{clubData.foreignersNumber}</p>
                <hr/>
                <p>Percentuale di giocatori stranieri:</p>
                <p>{clubData.foreignersPercentage + "%"}</p>
                <hr/>
                <p>Età media dei giocatori:</p>
                <p>{clubData.averageAge}</p>
                <hr/>
                <p>Stadio in cui gioca il club:</p>
                <p>{clubData.stadiumName}</p>
                <hr/>
                <p>Valore di mercato totale del club:</p>
                <p>{clubData.totalMarketVal + " euro"}</p>
                <hr/>
                <p>Record di trasferimento del club:</p>
                <p>{clubData.netTransferRec + " euro"}</p>
                <hr/>
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
              {games.length > 0 ? (
                <ul className="list-unstyled">
                  {games.map((game, index) => (
                    <li key={index}>{game.date}: {game.opponent} - {game.result}</li>
                  ))}
                </ul>
              ) : (
                <p>No games found for this club.</p>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default PaginaClub;
