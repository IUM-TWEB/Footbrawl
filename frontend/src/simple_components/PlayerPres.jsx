import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import Test from '../img/test.jpg';

function PlayerPres({name, age, team, position}) {
    return (
      <div className="card player-card">
          <div className="card-body">
              <img src={Test} className="center-img" alt="Giocatore"/>
              <h2 className="center-text card-title">{name}</h2>

              <p className="center-text card-text card-subtitle"> Data: </p>
              <p className="center-text card-text">{age} </p>

              <hr className="solid"></hr>

              <p className="center-text card-text card-subtitle"> Squadra: </p>
              <p className="center-text card-text"> {team} </p>

              <hr className="solid"></hr>

              <p className="center-text card-text card-subtitle"> Posizione: </p>
              <p className="center-text card-text"> {position} </p>
          </div>
      </div>
    );
}

export default PlayerPres;
