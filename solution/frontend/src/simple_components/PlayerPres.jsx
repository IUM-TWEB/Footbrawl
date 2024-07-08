import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import axios from "axios";
import {useAuth} from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import {useState, useEffect} from 'react';

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
                      foot,
                      playerId,
                      teamId
                    }) {
  const {username, password, setNewPlayer, favoritePlayers, removePlayer} = useAuth()
  const navigate = useNavigate();
  
  const [isFavorite, setIsFavorite] = useState(false);
  const [hover, setHover] = useState(false);

  // Controlla se il giocatore è tra i preferiti quando il componente viene montato
  useEffect(() => {
    setIsFavorite(favoritePlayers.includes(playerId));
  }, [favoritePlayers, playerId]);

  const handleFavorite = () => {
    if (!favoritePlayers.includes(playerId)) {
      setNewPlayer(playerId)
      axios.post("http://localhost:3000/users/favplayer", {username: username, pwd: password, playerId: playerId})
        .catch(e => {
          console.log(e)
        })
    } else {
      removePlayer(playerId)
      axios.post("http://localhost:3000/users/removePlayer", {username: username, pwd: password, playerId: playerId})
        .catch(e => {
          console.log(e)
        })
    }

  }

  return (
    <div className="card player-card">
      <div className="card-body text-center">
        <div className="col-md-1 px-3 w-50 d-flex">
          <button
            className={`mt-2 center-block btn w-50 ${isFavorite ? (hover ? 'btn-danger' : 'btn-success') : 'btn-outline-dark'}`}
            onClick={handleFavorite}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <i className={`fas ${isFavorite ? (hover ? 'fa-times' : 'fa-check text-white') : 'fa-heart'}`}></i>
          </button>
        </div>
        <img src={img} className="center-img" alt="Player"/>
        <h2 className="justify-content-center card-title">{name}</h2>

        <p className="justify-content-center card-text card-subtitle">Data di nascita:</p>
        <p className="justify-content-center card-text">{data}</p>

        <hr className="solid"></hr>

        <p className="justify-content-center card-text card-subtitle">Età:</p>
        <p className="justify-content-center card-text">{età}</p>

        <hr className="solid"></hr>

        <div className="d-flex justify-content-center border btn custom-button" onClick={() => {
          navigate(`/club/${teamId}`)
        }}>
          <div className="row">
            <p className="justify-content-center card-text card-subtitle">Squadra:</p>
            <p className="justify-content-center card-text">{team}</p>
          </div>
        </div>

        <hr className="solid"></hr>

        <p className="justify-content-center card-text card-subtitle">Nazionalità:</p>
        <p className="justify-content-center card-text">{nazionalità}</p>

        <hr className="solid"></hr>

        <p className="justify-content-center card-text card-subtitle">Posizione:</p>
        <p className="justify-content-center card-text">{position}</p>

        <hr className="solid"></hr>

        <p className="justify-content-center card-text card-subtitle">Ultima Stagione:</p>
        <p className="justify-content-center card-text">{lastSeason}</p>

        <hr className="solid"></hr>

        <p className="justify-content-center card-text card-subtitle">Altezza:</p>
        <p className="justify-content-center card-text">{hight}</p>

        <hr className="solid"></hr>

        <p className="justify-content-center card-text card-subtitle">Piede preferito:</p>
        <p className="justify-content-center card-text">{foot}</p>

      </div>
    </div>
  );
}

export default PlayerPres;
