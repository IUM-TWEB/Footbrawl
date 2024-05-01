import React, { useState } from 'react';
import axios from 'axios';
import '../index.css';
import TopCampionati from "../simple_components/TopCampionati.jsx";

const PaginaCampionati = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState(null);
  const [showTopCampionati, setShowTopCampionati] = useState(true);
  const fetchData = async (id_campionato) => {
    try {
      const response = await axios.get(`http://localhost:3000/competitions/${id_campionato}`);
      setData(response.data);
      setShowTopCampionati(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handleSubmit = (searchTerm, e) => {
    e.preventDefault();
    fetchData(searchTerm);
  };

  const handleSelectCampionato = (id_campionato) => {
    fetchData(id_campionato);
  };

  const handleBackButtonClick = () => {
    setShowTopCampionati(true);
  };

  return (
    <>

      <form id="searchForm" className="search-form" onSubmit={(e) => handleSubmit(searchTerm, e)}>
        <input
          type="text"
          value={searchTerm}
          placeholder="Cerca..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Cerca</button>
      </form>
      <h1 className="center padding title">TOP 10 CAMPIONATI</h1>

      {showTopCampionati ? (
        <TopCampionati onSelectCampionato={handleSelectCampionato}/>/*passo una funzione al figlio tramite props per permettere la comunicazione dell'id del campionato che ho selezionaro */

      ) : (
        <button onClick={handleBackButtonClick}>Back</button>
      )}

      {data && (
        <div>
          <h2>Data Received:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </>
  );
};

export default PaginaCampionati;
