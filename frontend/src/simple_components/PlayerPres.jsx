import 'bootstrap/dist/css/bootstrap.min.css';
import '../playerPage.css'

import test from './test.jpg'
function PlayerStats({name, age, team, position}) {

    return (
        <div className="card player-card">
            <div className="card-body">
                <img src={test} className="center-img" alt="Cinque Terre"/>
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

export default PlayerStats;