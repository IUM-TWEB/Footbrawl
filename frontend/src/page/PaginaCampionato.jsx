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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function convertToLowerCase(str) {
    return str.toLowerCase();
  }
  const lower_id_campionato = convertToLowerCase(id_campionato);

  const fetchTopScorer = async (id_campionato) => {
    try {
      const response = await axios.get(`http://localhost:3000/campionati/top_scorer/${id_campionato}`, {
        timeout: 10000000 // Aumenta il timeout a 10 secondi
      });
      const topScorerData = response.data;
      console.log('Top Scorer Data:', topScorerData);
      setTopScorerData(topScorerData);
    } catch (error) {
      console.error('Errore nella richiesta al server:', error);
      setError(error);
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
        <div className="card mb-3" style={{ maxWidth: "540px" }}>
          <div className="row no-gutters">
            <div className="col-md-4 d-flex align-items-center justify-content-center p-3">
              <img
                src={`https://tmssl.akamaized.net/images/logo/header/${lower_id_campionato}.png`}
                alt="Competition Logo"
                className="img-fluid"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h2 className="card-title">{data.name || "Not available"}</h2>
                <p className="card-text">
                  <strong>Type:</strong> {data.type || "Not available"}
                </p>
                <p className="card-text">
                  <strong>Confederation:</strong> {data.confederation || "Not available"}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">No data available</div>
      )}

      <h3 className="text-center mt-5">Top Scorers</h3>
      {topScorerData.length > 0 ? (
        <ul className="list-group top-scorer-list">
          {topScorerData.map((scorer, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center top-scorer-item"
              onClick={() => navigate(`/giocatori/${scorer.player_id}`)}
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
  );
};

export default PaginaCampionato;
