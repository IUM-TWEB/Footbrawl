import React, {useState, useEffect} from 'react';

function SearchBar() {
  const [postData, setPostData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  // Stato per controllare se mostrare o meno il contenuto HTML
  const [showContent, setShowContent] = useState(false);
  const varUrl = "5";

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    setShowContent(true);
    e.preventDefault();
    console.log('ho inviato il form con la parola: ', searchTerm);

    // Reset del termine di ricerca al valore iniziale
    setSearchTerm('');
  }

  useEffect(() => {

    fetch(`https://jsonplaceholder.typicode.com/posts/${varUrl}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setPostData(data))
      .catch(error => {
        console.error('Fetch error:', error);
      });
  }, []);


  return (
    <>
      <div className="search-bar-container">
        <form id="searchForm" className="search-form" onSubmit={handleSubmit} onChange={handleInputChange}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cerca..."
          />
          <button type="submit">Cerca</button>
          {showContent && (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{postData.title}</h5>
                <p className="card-text">{postData.body}</p>
              </div>
            </div>
          )}
        </form>
      </div>
    </>
  );
}

export default SearchBar;
