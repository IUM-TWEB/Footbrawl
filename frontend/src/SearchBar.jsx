import React, {useState, useRef} from 'react';
import axios from 'axios';

function SearchBar() {
  const [postData, setPostData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showContent, setShowContent] = useState(false);
  const [showError, setShowError] = useState(false);
  const errorTimeoutRef = useRef(null);
  const [nome, setNome] = useState('');
  const [cognome, setCognome] = useState('');
  const [squadra, setSquadra] = useState('');
  const [nazionalita, setNazionalita] = useState('');
  const [preferenza, setPreferenza] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleShowFilter = () => {
    setShowFilter(!showFilter);
  };

  const   handleClickFilterSearch = (e) => {
    e.preventDefault();
    console.log("clicckato il bottone cerca con filtri");
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current);
    }
    if (searchTerm) {
      axios.get(`https://jsonplaceholder.typicode.com/posts/${searchTerm}`)
        .then(response => {
          setPostData(response.data);
          setShowContent(true);
          setShowError(false);
        })
        .catch(error => {
          console.error('Error:', error);
          setShowError(true);
          setShowContent(false);
          errorTimeoutRef.current = setTimeout(() => {
            setShowError(false);
          }, 5000);
        });
    } else {
      setShowContent(false);
      setShowError(false);
    }
  };

  return (
    <>
      <div className="search-bar-container">
        <form id="searchForm" className="search-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Cerca..."
          />
          <button type="submit">Cerca</button>
          <button id="filtri" onClick={handleShowFilter}>Filtri</button>
            {showFilter && (

              <form onSubmit={handleSubmit} className="container mt-5">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="nome">Nome</label>
                      <input type="text" className="form-control" id="nome" value={nome}
                             onChange={e => setNome(e.target.value)}/>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="cognome">Cognome</label>
                      <input type="text" className="form-control" id="cognome" value={cognome}
                             onChange={e => setCognome(e.target.value)}/>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="squadra">Squadra</label>
                      <input type="text" className="form-control" id="squadra" value={squadra}
                             onChange={e => setSquadra(e.target.value)}/>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="nazionalita">Nazionalità</label>
                      <input type="text" className="form-control" id="nazionalita" value={nazionalita}
                             onChange={e => setNazionalita(e.target.value)}/>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Preferenza</label>
                  <div className="row">
                    <div className="col">
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="preferenza" id="destro" value="destro"
                               checked={preferenza === 'destro'} onChange={e => setPreferenza(e.target.value)}/>
                        <label className="form-check-label" htmlFor="destro">Destro</label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="preferenza" id="mancino" value="mancino"
                               checked={preferenza === 'mancino'} onChange={e => setPreferenza(e.target.value)}/>
                        <label className="form-check-label" htmlFor="mancino">Mancino</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col text-center pt-4">
                    <button onClick={handleClickFilterSearch} type="submit" className="btn btn-primary">Cerca</button>
                  </div>
                </div>
              </form>

            )
            }
          {showContent && (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{postData?.title}</h5>
                <p className="card-text">{postData?.body}</p>
              </div>
            </div>
          )}
          {showError && (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Mi dispiace</h5>
                <p className="card-text">il giocatore o il club che hai cercato non è nel nostro database</p>
              </div>
            </div>
          )}
        </form>
      </div>
    </>
  );
}

export default SearchBar;
