import React, {useState, useRef} from 'react';
import axios from 'axios';

function SearchBar() {
  const [postData, setPostData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showContent, setShowContent] = useState(false);
  const [showError, setShowError] = useState(false);
  const errorTimeoutRef = useRef(null);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
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
          setShowError(false); // Assicurati di nascondere gli errori precedenti
        })
        .catch(error => {
          console.error('Error:', error);
          setShowError(true);
          setShowContent(false); // Nascondi il contenuto se c'è un errore
          // Imposta il timer di errore e memorizza il riferimento
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
