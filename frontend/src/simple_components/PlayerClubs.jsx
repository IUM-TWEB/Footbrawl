import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';

function PlayerPres({playerInfo}) {
    return (
        <div className="card player-card">
            <div className="card-body">
                <h1 className={"center-text"}>Clubs in cui ha giocato</h1>
                {playerInfo.map((club, index) => (
                    <div key={index}>
                        <hr className="solid"></hr>

                        <p  className={"center-text"}>{club}</p>

                        <hr className="solid"></hr>
                    </div>

                ))}
            </div>
        </div>
    )
        ;
}


export default PlayerPres;