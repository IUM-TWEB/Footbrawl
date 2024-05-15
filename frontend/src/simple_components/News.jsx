import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notizia = () => {
  const [notizia, setNotizia] = useState(null);
  const [errore, setErrore] = useState(false);

  useEffect(() => {
    const idCasuale = Math.floor(Math.random() * 5); // Genera un ID casuale tra 0 e 4
    axios.get(`http://localhost:3000/home/news/${idCasuale}`)
      .then(response => {
        setNotizia(response.data);
      })
      .catch(error => {
        console.error('Errore durante il recupero della notizia:', error);
        setErrore(true);
      });
  }, []); // L'array vuoto assicura che useEffect venga eseguito solo una volta al caricamento del componente

  if (errore) {
    return <p>Errore nel caricamento della notizia.</p>;
  }

  if (!notizia) {
    return <p>Caricamento in corso...</p>;
  }

  return (
    <div>
      <h2>{notizia.titolo}</h2>
      <p><strong>Autore:</strong> {notizia.autore}</p>
      <p><strong>Titoletto:</strong> {notizia.titoletto}</p>
      <p><strong>Testo:</strong> {notizia.testo}</p>
      {notizia.img && <img src={notizia.img} alt="Immagine notizia" style={{ width: '100%' }} />}
    </div>
  );
};

export default Notizia;
