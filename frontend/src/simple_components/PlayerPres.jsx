import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import {useState} from "react";
import axios from "axios";

function PlayerPres({ name, data, squadra, posizione, img, hight, lastSeason, handleFavorite, playerId }) {
    const [x,setX] = useState("ff")
    handleFavorite = () => {
        axios.post("http://localhost:3000/users/favplayer", {name:"a",pwd:"a",playerId:"-1"})
          .then(res => {
              console.log(res)
          })
          .catch(e => {
              console.log(e)
          })
        setX("ff-not")
    }
    return (
      <div className="card player-card">
          <div className="card-body">
              <button
                className={`mt-2 center-block ${x}`}
                onClick={() => handleFavorite(playerId)}
              >
                  <i className="fas fa-heart"></i>
              </button>
              <img src={img} className="center-img" alt="Player"/>
              <h2 className="center-text card-title">{name}</h2>

              <p className="center-text card-text card-subtitle">Data:</p>
              <p className="center-text card-text">{data}</p>

              <hr className="solid"></hr>

              <p className="center-text card-text card-subtitle">Squadra:</p>
              <p className="center-text card-text">{squadra}</p>

              <hr className="solid"></hr>

              <p className="center-text card-text card-subtitle">Posizione:</p>
              <p className="center-text card-text">{posizione}</p>

              <hr className="solid"></hr>

              <p className="center-text card-text card-subtitle">Ultima Stagione:</p>
              <p className="center-text card-text">{lastSeason}</p>

              <hr className="solid"></hr>

              <p className="center-text card-text card-subtitle">Altezza:</p>

              <p className="center-text card-text">{hight}</p>

          </div>
      </div>
    );
}

export default PlayerPres;
