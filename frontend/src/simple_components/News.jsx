import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../index.css";

const News = ({ singleNews, onClick }) => {
  if (!singleNews) {
    return <p>Caricamento in corso...</p>;
  }

  return (
    <div className="card news-item" onClick={onClick} style={{ cursor: 'pointer' }}>
      {singleNews.img && <img src={singleNews.img} alt="Immagine notizia" className="card-img-top" />}
      <div className="card-body">
        <h5 className="card-title">{singleNews.titolo}</h5>
        <p className="card-text"><strong>Autore:</strong> {singleNews.autore}</p>
        <p className="card-text"><strong>Titoletto:</strong> {singleNews.titoletto}</p>
      </div>
    </div>
  );
};

export default News;
