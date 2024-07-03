import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";

function PlayerPres({playerClubs: playerClubs}) {
  const navigate = useNavigate();

  useEffect(() => {
  // forziamo il ricaricare la pagina se playerInfo cambia
  }, [playerClubs]);

  if (playerClubs)
    return (
      <div className="card player-card">
        <div className="card-body">
          <h1 className={"center-text"}>Clubs in cui ha giocato</h1>
          {playerClubs.map((club, index) => ( // cicliamo tutti i club ottenuti
            <div key={index}>
              <div className="border  btn custom-button d-flex justify-content-center align-items-center" onClick={async () => {
                try {
                  const response = await axios.get(`http://localhost:3000/clubByName/${club}`); // recuperiamo le informazioni relative ad un singolo club
                  const clubData = response.data[0];
                  const id = clubData.clubId;
                  navigate(`/club/${id}`)
                } catch (err) {
                  console.log(err.message);
                }
              }}>
                <p className={"mb-0"}>{club}</p>
              </div>
              <hr className="solid"></hr>
            </div>

          ))}
        </div>
      </div>
    );
  else return (<></>)

}


export default PlayerPres;
