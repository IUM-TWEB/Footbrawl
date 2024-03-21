import React, { useState } from 'react';


const Form = () => {
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    ruolo: '',
    nazionalità: '',
    campionato: '',
    squadra: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Implementa la logica di invio dei dati come necessario
  };

  return (
    <form onSubmit={handleSubmit} className="container-fluid">
      <div className="form-row align-items-center">
        <div className="col">
          <input
            type="text"
            className="form-control mb-2"
            id="nome"
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleChange}

          />
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control mb-2"
            id="cognome"
            name="cognome"
            placeholder="Cognome"
            value={formData.cognome}
            onChange={handleChange}

          />
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control mb-2"
            id="ruolo"
            name="ruolo"
            placeholder="Ruolo"
            value={formData.ruolo}
            onChange={handleChange}

          />
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control mb-2"
            id="nazionalità"
            name="nazionalità"
            placeholder="Nazionalità"
            value={formData.nazionalità}
            onChange={handleChange}

          />
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control mb-2"
            id="campionato"
            name="campionato"
            placeholder="Campionato"
            value={formData.campionato}
            onChange={handleChange}

          />
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control mb-2"
            id="squadra"
            name="squadra"
            placeholder="Squadra"
            value={formData.squadra}
            onChange={handleChange}

          />
        </div>
        <div className="col">
          <button type="submit" className="btn btn-primary mb-2">Invia</button>
        </div>
      </div>
    </form>


  );
};

export default Form;
