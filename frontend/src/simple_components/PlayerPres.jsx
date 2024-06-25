import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import React, {useState} from "react";
import axios from "axios";
import {useAuth} from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

function PlayerPres({
                      name,
                      data,
                      età,
                      nazionalità,
                      team,
                      position,
                      img,
                      hight,
                      lastSeason,
                      handleFavorite,
                      foot,
                      playerId,
                      teamId
                    }) {
  const [x, setX] = useState("ff")
  const {username, password, setNewPlayer} = useAuth()
  const navigate = useNavigate();

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

        <p className="center-text card-text card-subtitle">Data di nascita:</p>
        <p className="center-text card-text">{data}</p>

        <hr className="solid"></hr>

        <p className="center-text card-text card-subtitle">Età:</p>
        <p className="center-text card-text">{età}</p>

        <hr className="solid"></hr>

        <div className="d-flex justify-content-center border btn custom-button" onClick={() => {
          navigate(`/club/${teamId}`)
        }}>
          <div className="row">
            <p className="center-text card-text card-subtitle">Squadra:</p>
            <p className="center-text card-text">{team}</p>
          </div>
        </div>

        <hr className="solid"></hr>

        <p className="center-text card-text card-subtitle">Nazionalità:</p>
        <p className="center-text card-text">{nazionalità}</p>

        <hr className="solid"></hr>

        <p className="center-text card-text card-subtitle">Posizione:</p>
        <p className="center-text card-text">{position}</p>

        <hr className="solid"></hr>

        <p className="center-text card-text card-subtitle">Ultima Stagione:</p>
        <p className="center-text card-text">{lastSeason}</p>

        <hr className="solid"></hr>

        <p className="center-text card-text card-subtitle">Altezza:</p>
        <p className="center-text card-text">{hight}</p>

        <hr className="solid"></hr>

        <p className="center-text card-text card-subtitle">Piede preferito:</p>
        <p className="center-text card-text">{foot}</p>

      </div>
    </div>
  );
}

export default PlayerPres;
