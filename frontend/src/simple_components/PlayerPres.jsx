import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import {useState} from "react";
import axios from "axios";
import {useAuth} from "../context/AuthContext.jsx";

function PlayerPres({name, data, team, position, img, hight, lastSeason, handleFavorite, playerId}) {
  const [x, setX] = useState("ff")
  const {username, password, setNewPlayer} = useAuth()

  handleFavorite = () => {
    setNewPlayer(playerId)
    axios.post("http://localhost:3000/users/favplayer", {username: username, pwd: password, playerId: playerId})
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
        <p className="center-text card-text">{team}</p>

        <hr className="solid"></hr>

        <p className="center-text card-text card-subtitle">Posizione:</p>
        <p className="center-text card-text">{position}</p>

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
