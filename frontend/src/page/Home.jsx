import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from "../simple_components/SearchBar.jsx";
import LeaderBoard from "../simple_components/LeaderBoard.jsx";
import News from "../simple_components/News.jsx";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import '../index.css';

const Home = () => {
  const [isOpaque, setIsOpaque] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [newsList, setNewsList] = useState([]);
  const [serieA, setSerieA] = useState([]);
  const [premierLeague, setPremierLeague] = useState([]);
  const [laLiga, setLaLiga] = useState([]);
  const [ligue1, setLigue1] = useState([]);
  const [lastGames, setLastGames] = useState({});
  const [topScorers, setTopScorers] = useState({ IT1: null, GB1: null, ES1: null, CL: null, EL: null });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLastGame = async (competitionId) => {
      try {
        const response = await axios.get(`http://localhost:3000/competition/last_game/${competitionId}`);
        return response.data;
      } catch (error) {
        console.error(`Errore durante il recupero dell'ultima partita per ${competitionId}:`, error);
        return null;
      }
    };

    const fetchTopScorer = async (competitionId) => {
      try {
        const response = await axios.get(`http://localhost:3000/competition/top_scorer/${competitionId}`, {
          timeout: 100000000
        });
        return response.data;
      } catch (error) {
        console.error(`Errore durante il recupero del capocannoniere per ${competitionId}:`, error);
        return null;
      }
    };

    const fetchData = async () => {
      try {
        const [newsResponse, serieAResponse, premierLeagueResponse, laLigaResponse, ligue1Response, lastGameIT1, lastGameGB1, lastGameES1, lastGameCL, lastGameEL] = await Promise.all([
          axios.get('http://localhost:3000/news'),
          axios.get('http://localhost:3000/competition/ranking/serie-a'),
          axios.get('http://localhost:3000/competition/ranking/premier-league'),
          axios.get('http://localhost:3000/competition/ranking/laLiga'),
          axios.get('http://localhost:3000/competition/ranking/ligue-1'),
          fetchLastGame('IT1'),
          fetchLastGame('GB1'),
          fetchLastGame('ES1'),
          fetchLastGame('CL'),
          fetchLastGame('EL')
        ]);

        setNewsList(newsResponse.data);
        setSerieA(serieAResponse.data.slice(0, 3));
        setPremierLeague(premierLeagueResponse.data.slice(0, 3));
        setLaLiga(laLigaResponse.data.slice(0, 3));
        setLigue1(ligue1Response.data.slice(0, 3));
        setLastGames({ IT1: lastGameIT1, GB1: lastGameGB1, ES1: lastGameES1, CL: lastGameCL, EL: lastGameEL });

        // Fetch top scorers asynchronously
        const topScorerPromises = [
          fetchTopScorer('IT1'),
          fetchTopScorer('GB1'),
          fetchTopScorer('ES1'),
          fetchTopScorer('CL'),
          fetchTopScorer('EL')
        ];

        // Use Promise.allSettled to avoid blocking other requests
        const topScorerResults = await Promise.allSettled(topScorerPromises);
        const topScorersData = {
          IT1: topScorerResults[0].status === 'fulfilled' ? topScorerResults[0].value : null,
          GB1: topScorerResults[1].status === 'fulfilled' ? topScorerResults[1].value : null,
          ES1: topScorerResults[2].status === 'fulfilled' ? topScorerResults[2].value : null,
          CL: topScorerResults[3].status === 'fulfilled' ? topScorerResults[3].value : null,
          EL: topScorerResults[4].status === 'fulfilled' ? topScorerResults[4].value : null
        };

        setTopScorers(topScorersData);
      } catch (error) {
        console.error('Errore durante il recupero dei dati:', error);
      }
    };

    fetchData();
  }, []);

  const toggleOpacity = (opacity) => {
    setIsOpaque(opacity);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleClickClub = (clubId) => {
    navigate(`/club/${clubId}`);
  };

  const handleClickNews = (news) => {
    navigate('/news-params', { state: { news } });
  };

  const handleScorerClick = (playerId) => {
    navigate(`/giocatori/${playerId}`);
  };

  return (
    <>
      <SearchBar setOpacity={toggleOpacity} />
      <div className="padding home"></div>
      <div className="container-fluid padding" style={{ opacity: isOpaque ? 0.2 : 1 }}>
        <div className="row justify-content-md-center">
          <div className="col-md-12 col-lg-6 order-1 order-lg-2">
            <Carousel
              showThumbs={false}
              showArrows={true}
              autoPlay={!isPaused}
              interval={5000}
              infiniteLoop={true}
              showStatus={false}
              stopOnHover={false}
            >
              {newsList.map((item) => (
                <div key={item.id} onClick={() => handleClickNews(item)} style={{cursor: 'pointer'}}>
                  <News singleNews={item}/>
                </div>
              ))}
            </Carousel>
            <div className="controls center mt-3">
              <button className="btn btn-primary mr-2" onClick={handlePause} disabled={isPaused}>
                Pausa
              </button>
              <button className="btn btn-primary" onClick={handleResume} disabled={!isPaused}>
                Riprendi
              </button>
            </div>
            <div className="mt-4">
              <h1>Ultime Partite</h1>
              {['IT1', 'GB1', 'ES1', 'CL', 'EL'].map(league => (
                <div key={league} className="card mt-4">
                  <div className="card-body">
                    <h5 className="card-title">
                      {league === 'IT1' ? 'Serie A' :
                        league === 'ES1' ? 'La Liga' :
                          league === 'GB1' ? 'Premier League' :
                            league === 'CL' ? 'Champions League' :
                              league === 'EL' ? 'Europa League' :
                                'Errore'} {/* Fallback in caso nessuna delle condizioni precedenti è soddisfatta */}
                    </h5>
                    {lastGames[league] ? (
                      lastGames[league].map(game => (
                        <p key={game._id} className="card-text">
                          {game.home_club_name} {game.home_club_goals} - {game.away_club_goals} {game.away_club_name}
                        </p>
                      ))
                    ) : (
                      <p className="card-text">Caricamento...</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-12 col-lg-3 order-2 order-lg-1">
            <h1>Classifiche</h1>
            <div className="card">
              <div className="card-body">
                <LeaderBoard title="Serie A" rankings={serieA} onClickClub={handleClickClub}/>
              </div>
            </div>
            <div className="card mt-4">
              <div className="card-body">
                <LeaderBoard title="Premier League" rankings={premierLeague} onClickClub={handleClickClub}/>
              </div>
            </div>
            <div className="card mt-4">
              <div className="card-body">
                <LeaderBoard title="La Liga" rankings={laLiga} onClickClub={handleClickClub}/>
              </div>
            </div>
            <div className="card mt-4">
              <div className="card-body">
                <LeaderBoard title="Ligue 1" rankings={ligue1} onClickClub={handleClickClub}/>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-3 order-3">
            <div>
              <h1>Top Scorers</h1>
              {['IT1', 'GB1', 'ES1', 'CL'].map(league => (
                topScorers[league] && (
                  <div key={league} className="card mb-custom">
                    <div className="card-body card-top-scorer">
                      <h5
                        className="card-title">{league === 'IT1' ? 'Serie A' : league === 'ES1' ? 'La Liga' : league === 'GB1' ? 'Premier League' : league === 'CL' ? 'Champions League' : 'Europa League'}</h5>
                      {topScorers[league].slice(0, 3).map((scorer) => (
                        <div
                          key={scorer.player_id}
                          className="mb-3"
                          style={{
                            transition: 'background-color 0.3s',
                            cursor: 'pointer'
                          }}
                          onClick={() => handleScorerClick(scorer.player_id)}
                        >
                          <p className="card-text" style={{ marginBottom: '0.5rem' }}>
                            <img src={scorer.imageUrl} alt={scorer.name} style={{ width: '50px', height: '50px', marginRight: '10px', borderRadius: '50%' }} />
                            {scorer.name} ({scorer.totalGoals} gol)
                            <br />
                            <small>{scorer.position} - {scorer.currentClubName}</small>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
