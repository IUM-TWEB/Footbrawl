import React from 'react';

const TopCampionati = ({ onSelectCampionato }) => {
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

  const handleClick = (id_campionato) => {
    onSelectCampionato(id_campionato);
  };

  return (
    <div className="container">
      <div className="quadrati-container">
        {topCampionati.map((campionato, index) => (
          <div key={index} className="quadrato-padding" onClick={() => handleClick(campionato.id)}>
            <div className="square" style={{cursor: 'pointer'}}>{campionato.nomeCompleto}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCampionati;
