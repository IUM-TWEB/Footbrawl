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
  const [RankingData, setRankingData] = useState([]);
  const [topMarketValueData, setTopMarketValueData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function convertToLowerCase(str) {
    return str.toLowerCase();
  }
  const lower_id_campionato = convertToLowerCase(id_campionato);

  const fetchTopScorer = async (id_campionato) => {
    try {
      const response = await axios.get(`http://localhost:3000/campionati/top_scorer/${id_campionato}`, {
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
      const response = await axios.get(`http://localhost:3000/top_market_value/${id_campionato}`, {
        timeout: 10000
      });
      const topMarketValueData = response.data.slice(0, 15);
      console.log('Top Market Value Data:', topMarketValueData);
      setTopMarketValueData(topMarketValueData);
    } catch (error) {
      console.log("competizione Europea, Top Market Value non disponibili");
      //fetchLastWinner(competition_id);
      //console.error('Errore nella richiesta al server:', error);
      //setError(error);
    }
  };

  const fetchRanking = async (id_campionato) => {
    try {
      const response = await axios.get(`http://localhost:3000/rankingId/${id_campionato}`, {
        timeout: 10000
      });
      const ranking = response.data.slice(0, 15);
      console.log('ranking:', ranking);
      setRankingData(ranking);
    } catch (error) {
      console.log("competizione Europea, classifica non disponibile")
      //console.error('Errore nella richiesta al server:', error);
      //setError(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/competitions/${id_campionato}`, {
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
    fetchTopScorer(id_campionato); // Chiama fetchTopScorer qui
    fetchTopMarketValue(id_campionato); // Chiama fetchTopMarketValue qui
    fetchRanking(id_campionato)
  }, [id_campionato, lower_id_campionato]);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">Error fetching data: {error.message}</div>;
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
                  className="img-fluid"
                  style={{
                    width: "200px", // Imposta la larghezza fissa desiderata
                    height: "auto", // Imposta l'altezza su "auto" per mantenere l'aspetto proporzionato
                    maxHeight: "400px" // Imposta l'altezza massima, se necessario
                  }}
                />
                <div className="col-md-4 d-flex align-items-center justify-content-center p-3">
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    {/* <h2 className="card-title" style={{fontSize: '2.5rem'}}>{data.name || "Not available"}</h2>
                    <p className="card-text">
                      <strong>Type:</strong> {data.type || "Not available"}
                    </p>
                    <p className="card-text">
                     <strong>Confederation:</strong> {data.confederation || "Not available"}
                    </p>
                    <p className="card-text">
                      <strong>Country:</strong> {data.countryName || "Not available"}
                    </p>*/}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h3 className="text-center">Classifica</h3>
            {RankingData.length > 0 ? (
              <table className="table table-striped">
                <thead>
                <tr>
                  <th>Posizione</th>
                  <th>Squadra</th>
                  <th>Punti</th>
                </tr>
                </thead>
                <tbody>
                {RankingData.map((team, index) => (
                  <tr key={index} onClick={() => navigate(`/club/${team.club_id}`)} style={{ cursor: 'pointer' }}>
                    <td>{team.position}</td>
                    <td>{team.club_name}</td>
                    <td>{team.points}</td>
                  </tr>
                ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center">No ranking data available</div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center">No data available</div>
      )}

      <div className="row mt-5">
        <div className="col-lg-6 mb-5">
          <h3 className="text-center">Top Scorers</h3>
          {topScorerData.length > 0 ? (
            <ul className="list-group top-scorer-list">
              {topScorerData.map((scorer, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center top-scorer-item"
                  onClick={() => navigate(`/giocatori/${scorer.player_id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  {scorer.playerName} - {scorer.totalGoals} goals
                  <span className="badge badge-primary badge-pill">{scorer.position}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center">No top scorers available</div>
          )}
        </div>

        <div className="col-lg-6 mb-5">
          <h3 className="text-center">Top Market Value Players</h3>
          {topMarketValueData.length > 0 ? (
            <ul className="list-group top-market-value-list">
              {topMarketValueData.map((player, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center top-market-value-item"
                  onClick={() => navigate(`/giocatori/${player.playerId}`)}
                  style={{ cursor: 'pointer' }}
                >
                  {player.firstName} {player.lastName} - {player.highestMarketValue} euro
                  <span className="badge badge-primary badge-pill">{player.position}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center">No top market value players available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaginaCampionato;
