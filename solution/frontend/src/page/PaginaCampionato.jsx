import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../style/pagina-campionato.css"

const PaginaCampionato = () => {
  const {id_campionato} = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [topScorerData, setTopScorerData] = useState([]);
  const [rankingData, setRankingData] = useState([]);
  const [topMarketValueData, setTopMarketValueData] = useState([]);
  const [lastGameData, setLastGameData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingTopScorer, setLoadingTopScorer] = useState(true);
  const [loadingRanking, setLoadingRanking] = useState(true);
  const [loadingTopMarketValue, setLoadingTopMarketValue] = useState(true);
  const [loadingLastGame, setLoadingLastGame] = useState(true);

  const [error, setError] = useState(null);

  const convertToLowerCase = (str) => str.toLowerCase();
  const lower_id_campionato = convertToLowerCase(id_campionato);

  const fetchTopScorer = async (id_campionato) => {
    try {
      const response = await axios.get(`http://localhost:3000/competition/top_scorer/${id_campionato}`, {
        timeout: 10000 // Aumenta il timeout a 10 secondi
      });
      const topScorerData = response.data;
      setTopScorerData(topScorerData);
    } catch (error) {
      console.error('Errore nella richiesta al server:', error);
      setError(error);
    } finally {
      setLoadingTopScorer(false);
    }
  };

  const fetchTopMarketValue = async (id_campionato) => {
    try {
      const response = await axios.get(`http://localhost:3000/competition/top_market_value/${id_campionato}`, {
        timeout: 10000
      });
      const topMarketValueData = response.data.slice(0, 15);
      setTopMarketValueData(topMarketValueData);
    } catch (error) {
      console.log("competizione Europea, Top Market Value non disponibili");
    } finally {
      setLoadingTopMarketValue(false);
    }
  };

  const fetchRanking = async (id_campionato) => {
    try {
      const response = await axios.get(`http://localhost:3000/competition/rankingId/${id_campionato}`, {
        timeout: 10000
      });
      const ranking = response.data.slice(0, 15);
      setRankingData(ranking);
    } catch (error) {
      console.log("competizione Europea, classifica non disponibile")
    } finally {
      setLoadingRanking(false);
    }
  };

  const fetchLastGame = async (id_campionato) => {
    try {
      const response = await axios.get(`http://localhost:3000/competition/last_game/${id_campionato}`, {
        timeout: 10000
      });
      const lastGameData = response.data;
      setLastGameData(lastGameData);
    } catch (error) {
      console.error('Errore nella richiesta al server:', error);
      setError(error);
    } finally {
      setLoadingLastGame(false);
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
    fetchLastGame(id_campionato);
  }, [id_campionato, lower_id_campionato]);

  useEffect(() => {
    if (data && data.type !== "international_cup") {
      setLoadingTopMarketValue(true);
      setLoadingRanking(true);
      fetchTopMarketValue(id_campionato);
      fetchRanking(id_campionato);
    } else {
      setLoadingTopMarketValue(false);
      setLoadingRanking(false);
    }
  }, [data, id_campionato]);

  if (loading) {
    return <div className="loader"/>;
  }

  if (error) {
    return null;
  }

  return (
    <div className="container mt-5">
      {data ? (
        <div className="row">
          <div className="col-md-6 mb-5 pt-5">
            <div className="card">
              <div className="card-body text-center pt-4">
                <img
                  src={`https://tmssl.akamaized.net/images/logo/header/${lower_id_campionato}.png`}
                  alt="Competition Logo"
                  className="img-fluid mb-3"
                  style={{maxHeight: '150px'}}
                />
                <div className="mb-3">
                  <p className="card-text">
                    <strong>Tipo competizione: </strong>
                    <span className="ml-2">{data.type || "Not available"}</span>
                  </p>
                </div>
                <div className="mb-3">
                  <p className="card-text">
                    <strong>Continente: </strong>
                    <span className="ml-2">{data.confederation || "Not available"}</span>
                  </p>
                </div>
                {data.countryName && (
                  <div className="mb-3">
                    <p className="card-text">
                      <strong>Paese: </strong>
                      <span className="ml-2">{data.countryName}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            {loadingTopScorer ? (
              <div className="loader"/>
            ) : (
              topScorerData.length > 0 && (
                <>
                  <h3 className="text-center classifiche-title">Top Scorers</h3>
                  <table className="table table-striped table-hover">
                    <thead className="thead-dark">
                    <tr>
                      <th scope="col">Nome Giocatore</th>
                      <th scope="col" className="text-center">Goals</th>
                    </tr>
                    </thead>
                    <tbody>
                    {topScorerData.slice(0, 7).map((scorer, index) => (
                      <tr
                        key={index}
                        onClick={() => navigate(`/giocatori/${scorer.player_id}`)}
                        style={{cursor: 'pointer'}}
                      >
                        <td>{scorer.name}</td>
                        <td className="text-center fw-semibold"><span>{scorer.totalGoals}</span></td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </>
              )
            )}
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="row mt-5">
        <div className="col-lg-6 mb-5">
          {loadingRanking ? (
            <div className="text-center">Loading Ranking...</div>
          ) : (
            rankingData.length > 0 && (
              <>
                <h3 className="text-center classifiche-title">Classifica</h3>
                <table className="table table-striped table-hover">
                  <thead className="thead-dark">
                  <tr>
                    <th>Posizione</th>
                    <th>Squadra</th>
                  </tr>
                  </thead>
                  <tbody>
                  {rankingData.map((team, index) => (
                    <tr
                      key={index}
                      className="ranking-item"
                      onClick={() => navigate(`/club/${team.club_id}`)}
                      style={{cursor: 'pointer'}}
                    >
                      <td>{team.position}</td>
                      <td>{team.club_name}</td>
                      <td>{team.points}</td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </>
            )
          )}
        </div>

        <div className="col-lg-6 mb-5">
          {loadingTopMarketValue ? (
            <div className="text-center">Loading Top Market Value Players...</div>
          ) : (
            topMarketValueData.length > 0 && (
              <>
                <h3 className="text-center classifiche-title">Top Market Value Players</h3>
                <table className="table table-striped table-hover">
                  <thead className="thead-dark">
                  <tr>
                    <th scope="col">Nome Giocatore</th>
                    <th scope="col" className="text-center">Valore di Mercato</th>
                  </tr>
                  </thead>
                  <tbody>
                  {topMarketValueData.map((player, index) => (
                    <tr
                      key={index}
                      onClick={() => navigate(`/giocatori/${player.playerId}`)}
                      style={{cursor: 'pointer'}}
                    >
                      <td>{player.firstName} {player.lastName}</td>
                      <td className="text-center">
                      <span className="fw-semibold">
                        {player.highestMarketValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} euro
                      </span>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </>
            )
          )}
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-lg-12 mb-5">
          {loadingLastGame ? (
            <div className="text-center"> caricando le ultime partite...</div>
          ) : (
            lastGameData.length > 0 && (
              <>
                <h3 className="text-center">Ultime Partite</h3>
                <table className="table table-striped table-hover">
                  <thead className="thead-dark">
                  <tr>
                    <th>Data</th>
                    <th>Squadra di casa</th>
                    <th>Squadra ospite</th>
                    <th>Risultato</th>
                    <th>Stadio</th>
                    <th>Arbitro</th>
                  </tr>
                  </thead>
                  <tbody>
                  {lastGameData.map((game) => (
                    <tr key={game._id}>
                      <td>{new Date(game.date).toLocaleDateString()}</td>
                      <td
                        className="team-name"
                        onClick={() => navigate(`/club/${game.home_club_id}`)}
                        style={{cursor: 'pointer'}}
                      >
                        {game.home_club_name}
                      </td>
                      <td className="team-name"
                          onClick={() => navigate(`/club/${game.away_club_id}`)}
                          style={{cursor: 'pointer'}}
                      >
                        {game.away_club_name}
                      </td>
                      <td className="text-center">{game.home_club_goals} - {game.away_club_goals}</td>
                      <td>{game.stadium}</td>
                      <td>{game.referee}</td>
                    </tr>
                  ))}

                  </tbody>
                </table>
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default PaginaCampionato;
