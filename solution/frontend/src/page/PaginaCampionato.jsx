import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';

const PaginaCampionato = () => {
  const { id_campionato } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [topScorerData, setTopScorerData] = useState([]);
  const [rankingData, setRankingData] = useState([]);
  const [topMarketValueData, setTopMarketValueData] = useState([]);
  const [lastGameData, setLastGameData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const convertToLowerCase = (str) => str.toLowerCase();
  const lower_id_campionato = convertToLowerCase(id_campionato);

  const formatCompetitionName = (name) => {
    if (!name) return "";
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const fetchTopScorer = async (id_campionato) => {
    try {
      const response = await axios.get(`http://localhost:3000/competition/top_scorer/${id_campionato}`, {
        timeout: 10000 // Aumenta il timeout a 10 secondi
      });
      const topScorerData = response.data;
      console.log('Top Scorer Data:', topScorerData);
      setTopScorerData(topScorerData);
    } catch (error) {
      console.error('Errore nella richiesta al server:', error);
      setError(error);
    }
  };

  const fetchTopMarketValue = async (id_campionato) => {
    try {
      const response = await axios.get(`http://localhost:3000/competition/top_market_value/${id_campionato}`, {
        timeout: 10000
      });
      const topMarketValueData = response.data.slice(0, 15);
      console.log('Top Market Value Data:', topMarketValueData);
      setTopMarketValueData(topMarketValueData);
    } catch (error) {
      console.log("competizione Europea, Top Market Value non disponibili");
    }
  };

  const fetchRanking = async (id_campionato) => {
    try {
      const response = await axios.get(`http://localhost:3000/competition/rankingId/${id_campionato}`, {
        timeout: 10000
      });
      const ranking = response.data.slice(0, 15);
      console.log('ranking:', ranking);
      setRankingData(ranking);
    } catch (error) {
      console.log("competizione Europea, classifica non disponibile")
    }
  };

  const fetchLastGame = async (id_campionato) => {
    try {
      const response = await axios.get(`http://localhost:3000/competition/last_game/${id_campionato}`, {
        timeout: 10000
      });
      const lastGameData = response.data;
      console.log('Last Game Data:', lastGameData);
      setLastGameData(lastGameData);
    } catch (error) {
      console.error('Errore nella richiesta al server:', error);
      setError(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/competition/details/${id_campionato}`, {
          timeout: 10000 // Aumenta il timeout a 10 secondi
        });
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
    fetchTopScorer(id_campionato);
    fetchTopMarketValue(id_campionato);
    fetchRanking(id_campionato);
    fetchLastGame(id_campionato);
  }, [id_campionato, lower_id_campionato]);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return null;
  }

  return (
    <div className="container mt-5">
      {data ? (
        <div className="row">
          <div className="col-md-6 d-flex justify-content-center">
            <div className="card mb-3" style={{ maxWidth: "540px", border: "none", boxShadow: "none" }}>
              <div className="row no-gutters">
                <img
                  src={`https://tmssl.akamaized.net/images/logo/header/${lower_id_campionato}.png`}
                  alt="Competition Logo"
                  className="logo-fixed"
                />
                <div className="col-md-4 d-flex align-items-center justify-content-center p-3">
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h2 className="card-title" style={{fontSize: '2.5rem'}}>{formatCompetitionName(data.name) || "Not available"}</h2>
                    <p className="card-text">
                      <strong>tipo competizione: </strong> {data.type || "Not available"}
                    </p>
                    <p className="card-text">
                      <strong>Continente: </strong> {data.confederation || "Not available"}
                    </p>
                    {data.countryName && (
                      <p className="card-text">
                        <strong>Paese: </strong> {data.countryName}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            {topScorerData.length > 0 && (
              <>
                <h3 className="text-center">Top Scorers</h3>
                <ul className="list-group top-scorer-list">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <strong>Nome Giocatore</strong>
                    <strong>Goals</strong>
                  </li>
                  {topScorerData.map((scorer, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-center top-scorer-item"
                      onClick={() => navigate(`/giocatori/${scorer.player_id}`)}
                      style={{ cursor: 'pointer' }}
                    >
                      <span>{scorer.name}</span>
                      <span className="badge badge-primary badge-pill">{scorer.totalGoals}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="row mt-5">
        <div className="col-lg-6 mb-5">
          {rankingData.length > 0 && (
            <>
              <h3 className="text-center">Classifica</h3>
              <table className="table table-striped">
                <thead>
                <tr>
                  <th>Posizione</th>
                  <th>Squadra</th>
                  <th>Punti</th>
                </tr>
                </thead>
                <tbody>
                {rankingData.map((team, index) => (
                  <tr key={index} onClick={() => navigate(`/club/${team.club_id}`)} style={{ cursor: 'pointer' }}>
                    <td>{team.position}</td>
                    <td>{team.club_name}</td>
                    <td>{team.points}</td>
                  </tr>
                ))}
                </tbody>
              </table>
            </>
          )}
        </div>

        <div className="col-lg-6 mb-5">
          {topMarketValueData.length > 0 && (
            <>
              <h3 className="text-center">Top Market Value Players</h3>
              <ul className="list-group top-market-value-list">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <strong>Nome Giocatore</strong>
                  <strong>Valore di Mercato</strong>
                </li>
                {topMarketValueData.map((player, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center top-market-value-item"
                    onClick={() => navigate(`/giocatori/${player.playerId}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <span>{player.firstName} {player.lastName}</span>
                    <span className="badge badge-primary badge-pill">{player.highestMarketValue} euro</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-lg-12 mb-5">
          {lastGameData.length > 0 && (
            <>
              <h3 className="text-center">Last Games</h3>
              <table className="table table-striped">
                <thead>
                <tr>
                  <th>Data</th>
                  <th>Home Club</th>
                  <th>Away Club</th>
                  <th>Score</th>
                  <th>Stadium</th>
                  <th>Referee</th>
                </tr>
                </thead>
                <tbody>
                {lastGameData.map((game) => (
                  <tr key={game._id}>
                    <td>{new Date(game.date).toLocaleDateString()}</td>
                    <td>{game.home_club_name}</td>
                    <td>{game.away_club_name}</td>
                    <td>{game.home_club_goals} - {game.away_club_goals}</td>
                    <td>{game.stadium}</td>
                    <td>{game.referee}</td>
                  </tr>
                ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaginaCampionato;
