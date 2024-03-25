import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
function Prova() {
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    // Esegui la fetch al montaggio del componente
    fetch('https://jsonplaceholder.typicode.com/posts/1')
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
   <div className="Prova">
      {postData ? (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{postData.title}</h5>
            <p className="card-text">{postData.body}</p>
          </div>
        </div>
      ) : (
        <p>Caricamento...</p>
      )}
    </div>
</>
  );
}

export default Prova;
