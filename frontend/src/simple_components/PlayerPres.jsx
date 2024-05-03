import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';

function PlayerPres({name,data,squadra,posizione,img,hight,lastSeason}) {
    return (
      <div className="card player-card">
          <div className="card-body">
              <img src={img} className="center-img" alt="Giocatore"/>
              <h2 className="center-text card-title">{name}</h2>

              <p className="center-text card-text card-subtitle"> Data: </p>
              <p className="center-text card-text">{data} </p>

              <hr className="solid"></hr>

              <p className="center-text card-text card-subtitle"> Squadra: </p>
              <p className="center-text card-text"> {squadra} </p>

              <hr className="solid"></hr>

              <p className="center-text card-text card-subtitle"> Posizione: </p>
              <p className="center-text card-text"> {posizione} </p>
              <hr className="solid"></hr>

              <p className="center-text card-text card-subtitle"> Ultima Stagione: </p>
              <p className="center-text card-text"> {lastSeason} </p>

              <hr className="solid"></hr>

              <p className="center-text card-text card-subtitle"> Altezza: </p>
              <p className="center-text card-text"> {hight} </p>


          </div>
      </div>
    );
}

export default PlayerPres;
