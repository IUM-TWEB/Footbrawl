import React from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const NewsParams = () => {
  const location = useLocation();
  const { news } = location.state;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="mb-3">{news.titolo}</h1>
          <div className="position-relative">
            <img
              src={news.img}
              alt={news.titolo}
              className="img-fluid mb-3 w-100"
              style={{maxWidth: '100%'}}
            />
          </div>
          <p className="text-muted"><strong>Titoletto:</strong> {news.titoletto}</p>
          <p className="text-muted"><strong>Autore:</strong> {news.autore}</p>
          <p className="text-justify">{news.testo}</p>
        </div>
      </div>
    </div>


  );
};

export default NewsParams;
