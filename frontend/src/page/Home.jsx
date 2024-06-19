import React, {useState, useRef, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import SearchBar from "../simple_components/SearchBar.jsx";
import LeaderBoard from "../simple_components/LeaderBoard.jsx";
import News from "../simple_components/News.jsx";
import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";

const Home = () => {
  const [isOpaque, setIsOpaque] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [newsList, setNewsList] = useState([]);
  const [competitionsList, setCompetitionsList] = useState([]);
  const carouselRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Richiesta per i dati delle news
    axios.get('http://localhost:3000/home/news')
      .then(response => {
        setNewsList(response.data);  // Presumendo che ogni notizia abbia un ID unico
      })
      .catch(error => {
        console.error('Errore durante il recupero delle notizie:', error);
      });

    // Richiesta per i dati di ranking di Serie A
    axios.get('http://localhost:3000/ranking/serie-a')
      .then(response => {
        setCompetitionsList(response.data);
      })
      .catch(error => {
        console.error('Errore durante il recupero dei dati di ranking:', error);
      });
  }, []); // L'array vuoto [] assicura che l'effetto venga eseguito solo una volta dopo il primo rendering


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

  const handleClickNews = (news) => {
    navigate('/news-params', { state: { news } });
  };

  return (
    <>
      <SearchBar setOpacity={toggleOpacity}/>
      <div className="padding home"></div>
      <div className="container-fluid padding" style={{opacity: isOpaque ? 0.2 : 1}}>
        <div className="row justify-content-md-center">
          <div className="col-md-3">
            <LeaderBoard rankings={competitionsList} />

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
            <div className="controls center">
              <button onClick={handlePause} disabled={isPaused}>
                Pausa
              </button>
              <button onClick={handleResume} disabled={!isPaused}>
                Riprendi
              </button>
            </div>
          </div>
          <div className="col-md-3">

          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
