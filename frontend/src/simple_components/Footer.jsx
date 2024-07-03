import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';

const Footer = () => {
  return (
    <footer className="footer d-flex flex-column flex-md-row align-items-center justify-content-between">
      <div className="mb-3 mb-md-0">
        <h4 style={{ color: 'white', textAlign: "center" }}>documentazione swagger</h4>
        <a href="http://localhost:3000/api-ui/" className="btn btn-outline-light footer-button" target="_blank" rel="noopener noreferrer">
          Main Server
        </a>
        <a href="http://localhost:3001/api-ui/" className="btn btn-outline-light footer-button" target="_blank" rel="noopener noreferrer">
          Mongo
        </a>
        <a href="http://localhost:8080/swagger-ui/index.html" className="btn btn-outline-light footer-button" target="_blank" rel="noopener noreferrer">
          Postgres
        </a>
      </div>
      <div className="text-center mb-3 mb-md-0">
        <h2 style={{ color: 'white' }}>Footbrawl</h2>
      </div>
      <div className="d-flex justify-content-end">
        <p style={{ color: 'white' }}>Acquadro - Rastello - Tricarico</p>
      </div>
    </footer>
  );
};

export default Footer;
