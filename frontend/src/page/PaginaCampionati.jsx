import React, { useState } from 'react';
import axios from 'axios';
import '../index.css';

const MyComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState(null);

  const topCampionati = [
    { id: 'IT1', nomeCompleto: 'Serie A' },
    { id: 'CL', nomeCompleto: 'Champions League' },
    { id: 'EL', nomeCompleto: 'Europa League' },
    { id: 'ES1', nomeCompleto: 'La Liga' },
    { id: 'FR1', nomeCompleto: 'Ligue 1' },
    { id: 'GB1', nomeCompleto: 'Premiere League' },
    { id: 'CIT', nomeCompleto: 'Coppa Italia' },
    { id: 'L1', nomeCompleto: 'Bundesliga' },
    { id: 'PO1', nomeCompleto: 'Liga Portugal' },
    { id: 'CDR', nomeCompleto: 'Copa Del Rey' }
  ];

  const fetchData = async (id_campionato) => {
    try {
      const response = await axios.get(`http://localhost:3000/competitions/${id_campionato}`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleClick = (id_campionato) => {
    fetchData(id_campionato);
  };

  const handleSubmit = (searchTerm, e) => {
    e.preventDefault();
    handleClick(searchTerm);

  };

  return (
    <>
      <h1 className="center">top campionati</h1>
      <form id="searchForm" className="search-form" onSubmit={(e) => handleSubmit(searchTerm, e)}>
        <input
          type="text"
          value={searchTerm}
          placeholder="Cerca..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Cerca</button>
      </form>

      <div className="container">
        <div className="quadrati-container">
          {topCampionati.map((campionato, index) => (
            <div key={index} className="quadrato-padding" onClick={() => handleClick(campionato.id)}>
              <div className="square">{campionato.nomeCompleto}</div>
            </div>
          ))}
        </div>
      </div>

      {data && (
        <div>
          <h2>Data Received:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </>
  );
};

export default MyComponent;
