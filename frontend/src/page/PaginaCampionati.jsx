import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import TopCampionati from "../simple_components/TopCampionati.jsx";
import SearchBar from "../simple_components/SearchBar.jsx";

const PaginaCampionati = () => {
  const [isOpaque, setIsOpaque] = useState(false);
  const navigate = useNavigate();

  const fetchData = async (id_campionato) => {
    try {
      const response = await axios.get(`http://localhost:3000/competitions/${id_campionato}`);
      // setData(response.data); // Commentato perché non viene usato nel codice attuale
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSelectCampionato = (id_campionato) => {
    fetchData(id_campionato);
    navigate(`/campionati/${id_campionato}`);
  };

  const toggleOpacity = (opacity) => {
    setIsOpaque(opacity);
  };

  return (
    <>
      <SearchBar setOpacity={toggleOpacity} />
      <div className="container-fluid padding" style={{ opacity: isOpaque ? 0.2 : 1 }}>
        <h1 className="center padding title">TOP 10 CAMPIONATI</h1>
        <TopCampionati onSelectCampionato={handleSelectCampionato} />
      </div>
    </>
  );
};

export default PaginaCampionati;
