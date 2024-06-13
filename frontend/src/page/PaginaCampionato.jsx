import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const PaginaCampionato = () => {


  const { id_campionato } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  function convertToLowerCase(str) {
    return str.toLowerCase();
  }
  const lower_id_campionato =  convertToLowerCase(id_campionato);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/competitions/${id_campionato}`);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id_campionato, lower_id_campionato]);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">Error fetching data: {error.message}</div>;
  }

  return (
    <div className="container mt-5 d-flex justify-content-center">
      {data ? (
        <div className="card" style={{maxWidth: "540px"}}>
          <div className="row no-gutters">
            <div className="col-md-4 d-flex align-items-center justify-content-center p-3">
              <img src={`https://tmssl.akamaized.net/images/logo/header/${lower_id_campionato}.png`}
                   alt="Competition Logo" className="img-fluid"/>
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h2 className="card-title">{data.name || "Not available"}</h2>
                <p className="card-text"><strong>Type:</strong> {data.type || "Not available"}</p>
                <p className="card-text"><strong>Confederation:</strong> {data.confederation || "Not available"}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">No data available</div>
      )}
    </div>

  );
};

export default PaginaCampionato;
