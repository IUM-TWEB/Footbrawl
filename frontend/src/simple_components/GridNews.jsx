import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import News from "./News.jsx";
import "../index.css";

const GridNews = () => {
  const [newsList, setNewsList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/home/news')
      .then(response => {
        setNewsList(response.data);
      })
      .catch(error => {
        console.error('Errore durante il recupero delle notizie:', error);
      });
  }, []);

  const handleClickNews = (news) => {
    navigate('/news-params', { state: { news } });
  };

  return (
    <div className="container padding">
      <div className="row row-cols-1 row-cols-md-3 g-4 news-grid">
        {newsList.map(news => (
          <div key={news._id} className="col d-flex align-items-stretch">
            <News singleNews={news} onClick={() => handleClickNews(news)} className="news-item" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridNews;
