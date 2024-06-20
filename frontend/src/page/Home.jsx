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
      } catch (error) {
        console.error('Errore durante il recupero dei dati:', error);
      }
    };

    fetchData();
  }, []);

  console.log("lastMAtch",lastGames);
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
                <LeaderBoard title="Serie A" rankings={serieA} onClickClub={handleClickClub} />
              </div>
            </div>
            <div className="card mt-4">
              <div className="card-body">
                <LeaderBoard title="Premier League" rankings={premierLeague} onClickClub={handleClickClub} />
              </div>
            </div>
            <div className="card mt-4">
              <div className="card-body">
                <LeaderBoard title="La Liga" rankings={laLiga} onClickClub={handleClickClub} />
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
                <div key={item.id} onClick={() => handleClickNews(item)} style={{ cursor: 'pointer' }}>
                  <News singleNews={item} />
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
            <h1>Ultime Partite</h1>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Serie A</h5>
                {lastGames.IT1 ? (
                  <p className="card-text">
                    {lastGames.IT1[0].home_club_id} {lastGames.IT1[0].home_club_goals} - {lastGames.IT1[0].away_club_goals} {lastGames.IT1[0].away_club_id}
                  </p>
                ) : (
                  <p className="card-text">Caricamento...</p>
                )}
              </div>
            </div>
            <div className="card mt-4">
              <div className="card-body">
                <h5 className="card-title">Premiere League</h5>
                {lastGames.GB1 ? (
                  <p className="card-text">
                    {lastGames.GB1[0].home_club_id} {lastGames.GB1[0].home_club_goals} - {lastGames.GB1[0].away_club_goals} {lastGames.GB1[0].away_club_id}
                  </p>
                ) : (
                  <p className="card-text">Caricamento...</p>
                )}
              </div>
            </div>
            <div className="card mt-4">
              <div className="card-body">
                <h5 className="card-title">La Liga</h5>
                {lastGames.ES1 ? (
                  <p className="card-text">
                    {lastGames.ES1[0].home_club_id} {lastGames.ES1[0].home_club_goals} - {lastGames.ES1[0].away_club_goals} {lastGames.ES1[0].away_club_id}
                  </p>
                ) : (
                  <p className="card-text">Caricamento...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
