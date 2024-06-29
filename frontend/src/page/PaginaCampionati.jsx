import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import TopCampionati from "../simple_components/TopCampionati.jsx";
import SearchBar from "../simple_components/SearchBar.jsx";

const PaginaCampionati = () => {
  const [isOpaque, setIsOpaque] = useState(false);
  const navigate = useNavigate();


  const handleSelectCampionato = (id_campionato) => {
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
