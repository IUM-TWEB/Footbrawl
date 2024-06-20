import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from "../simple_components/SearchBar.jsx";
import LeaderBoard from "../simple_components/LeaderBoard.jsx";
import News from "../simple_components/News.jsx";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";

const Home = () => {
  const [isOpaque, setIsOpaque] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [newsList, setNewsList] = useState([]);
  const [serieA, setSerieA] = useState([]);
  const [premierLeague, setPremierLeague] = useState([]);
  const [laLiga, setLaLiga] = useState([]);
  const [lastGames, setLastGames] = useState({});
  const [topScorers, setTopScorers] = useState({
    IT1: null,
    GB1: null,
    ES1: null
  });
  const carouselRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLastGame = async (competitionId) => {
      try {
        const response = await axios.get(`http://localhost:3000/last_game/${competitionId}`);
        return response.data;
      } catch (error) {
        console.error(`Errore durante il recupero dell'ultima partita per ${competitionId}:`, error);
        return null;
      }
    };

    const fetchTopScorer = async (competitionId) => {
      try {
        const response = await axios.get(`http://localhost:3000/campionati/top_scorer/${competitionId}`, {
          timeout: 100000000 // Aumenta il timeout a 10 secondi
        });
        return response.data;
      } catch (error) {
        console.error(`Errore durante il recupero del capocannoniere per ${competitionId}:`, error);
        return null;
      }
    };

    const fetchData = async () => {
      try {
        const [newsResponse, serieAResponse, premierLeagueResponse, laLigaResponse, lastGameIT1, lastGameGB1, lastGameES1] = await Promise.all([
          axios.get('http://localhost:3000/home/news'),
          axios.get('http://localhost:3000/ranking/serie-a'),
          axios.get('http://localhost:3000/ranking/premier-league'),
          axios.get('http://localhost:3000/ranking/laLiga'),
          fetchLastGame('IT1'),
          fetchLastGame('GB1'),
          fetchLastGame('ES1')
        ]);

        setNewsList(newsResponse.data);
        setSerieA(serieAResponse.data.slice(0, 3));
        setPremierLeague(premierLeagueResponse.data.slice(0, 3));
        setLaLiga(laLigaResponse.data.slice(0, 3));
        setLastGames({
          IT1: lastGameIT1,
          GB1: lastGameGB1,
          ES1: lastGameES1
        });

        // Fetch top scorers asynchronously
        const topScorerPromises = [
          fetchTopScorer('IT1'),
          fetchTopScorer('GB1'),
          fetchTopScorer('ES1')
        ];

        // Utilizziamo Promise.allSettled per evitare di bloccare le altre richieste
        const topScorerResults = await Promise.allSettled(topScorerPromises);
        const topScorersData = {
          IT1: topScorerResults[0].status === 'fulfilled' ? topScorerResults[0].value : null,
          GB1: topScorerResults[1].status === 'fulfilled' ? topScorerResults[1].value : null,
          ES1: topScorerResults[2].status === 'fulfilled' ? topScorerResults[2].value : null
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
    if (carouselRef.current) {
      carouselRef.current.pause();
    }
  };

  const handleResume = () => {
    setIsPaused(false);
    if (carouselRef.current) {
      carouselRef.current.resume();
    }
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
console.log(topScorers);
  return (
    <>
      <SearchBar setOpacity={toggleOpacity} />
      <div className="padding home"></div>
      <div className="container-fluid padding" style={{ opacity: isOpaque ? 0.2 : 1 }}>
        <div className="row justify-content-md-center">
          <div className="col-md-3">
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
          </div>
          <div className="col-md-6">
            <Carousel
              ref={carouselRef}
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
          </div>
          <div className="col-md-3">
            <div>
              <h1>Ultime Partite</h1>

              {['IT1', 'GB1', 'ES1'].map(league => (
                <div key={league} className="card mt-4">
                  <div className="card-body">
                    <h5
                      className="card-title">{league === 'IT1' ? 'Serie A' : league === 'GB1' ? 'Premier League' : 'La Liga'}</h5>
                    {lastGames[league] ? (
                      <p className="card-text">
                        {lastGames[league][0].home_club_id} {lastGames[league][0].home_club_goals} - {lastGames[league][0].away_club_goals} {lastGames[league][0].away_club_id}
                      </p>
                    ) : (
                      <p className="card-text">Caricamento...</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <h1>Top Scorers</h1>

              {['IT1', 'GB1', 'ES1'].map(league => (
                topScorers[league] && (
                  <div key={league} className="card mt-3">
                    <div className="card-body">
                      <h5
                        className="card-title">{league === 'IT1' ? 'Serie A' : league === 'GB1' ? 'Premier League' : 'La Liga'}</h5>
                      <div
                        className="mb-3"
                        style={{
                          backgroundColor: '#fff',
                          transition: 'background-color 0.3s',
                          cursor: 'pointer'
                        }}
                        onClick={() => handleScorerClick(topScorers[league][0].player_id)}
                      >
                        <p className="card-text" style={{marginBottom: '0.5rem'}}>
                          {topScorers[league][0].player_id} ({topScorers[league][0].totalGoals} gol)
                        </p>
                      </div>
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
