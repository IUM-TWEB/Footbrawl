import React, { useState } from 'react';
import axios from 'axios';

const MyComponent = () => {
  const [data, setData] = useState(null);
  const idCampionato = 'IT1';

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/competitions/${idCampionato}`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>

      <button onClick={fetchData}>Fetch Data</button>
      {data && (
        <div>
          <h2>Data Received:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default MyComponent;
