import {useEffect, useState} from 'react';
import altImg from '../img/alt.png'
import SearchBarUserTemp from "./SearchBarUserTemp.jsx";
import PopupPlayer from "./PopupPlayer.jsx";

const TeamFormationSelector = ({favoritePlayers}) => {
  let a = []
  const [popupsOpen, setPopupsOpen] = useState({});  const [selectedPosition, setSelectedPosition] = useState([null, null])
  const [playerNames, setPlayerNames] = useState([]);
  const [formation, setFormation] = useState('4-4-2');
  const [selectedFormation, setSelectedFormation] = useState({
    forwards: ['1', '1'],
    midfielders: ['1', '1', '1', '1'],
    defenders: ['1', '1', '1', '1'],
    goalkeeper: '1'
  });

  useEffect(() => {
    setPlayerNames(favoritePlayers);
  }, [favoritePlayers]);

  const togglePopup = (id) => {
    setPopupsOpen(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filterPlayersByPosition = (position) => {
    return playerNames.filter((player) => player.position === position);
  };

  useEffect(() => {
    console.log("sda")
  }, [playerNames]);

  const handleFormationChange = (formation) => {

    setFormation(formation)
    const defenders_num = parseInt(formation[0], 10);
    const midfielders_num = parseInt(formation[2], 10);

    const forwards_num = parseInt(formation[4], 10);
    setSelectedFormation({
      forwards: Array(forwards_num).fill("1"),
      midfielders: Array(midfielders_num).fill("1"),
      defenders: Array(defenders_num).fill("1"),
      goalkeeper: "1"
    });

  };
  const handlePlayerSelection = (player) => {
    setSelectedFormation(prevFormation => {
      const newFormation = {...prevFormation};

      switch (selectedPosition[1]) {
        case 0:
          newFormation.forwards[selectedPosition[0]] = player;
          break;

        case 1:
          newFormation.midfielders[selectedPosition[0]] = player;
          break;

        case 2:
          newFormation.defenders[selectedPosition[0]] = player;
          break;

        case 3:
          newFormation.goalkeeper = player;
          break;

        default:
          break;
      }
      return newFormation;
    });
  };
  let test = (i) => {
    setPlayerNames([...playerNames, i])
    handlePlayerSelection(i)
    console.log(a)
  }
  const buttonSelector = (index, pos) => {
    if (index !== selectedPosition[0] || pos !== selectedPosition[1]) {
      return 'image-overlay'
    } else
      return 'image-overlay-selected'
  }

  const selectPlayerPosition = (x, y) => {
    setSelectedPosition([x, y])
  }

  const lineFormation = (elements, h, pos) => {
    const numElements = elements.length;
    const colSize = Math.min(1, 12 / Math.max(1, numElements));

    // Select the correct team segment based on the pos argument
    let teamSegment;
    switch (pos) {
      case 0:
        teamSegment = selectedFormation.forwards;
        break;
      case 1:
        teamSegment = selectedFormation.midfielders;
        break;
      case 2:
        teamSegment = selectedFormation.defenders;
        break;
      case 3:
        // Assuming that goalkeeper is just one, create an array to handle similarly
        teamSegment = [selectedFormation.goalkeeper];
        break;
      default:
        teamSegment = []; // default to an empty array if no valid position is found
    }

    return (
      <div className={`row flex-grow-1 d-flex justify-content-center align-items-center w-100 mx-0 ${h} `}>
        {
          elements.map((element, index) => (
            <div key={index} className={`col-md-${colSize + 1} d-flex justify-content-center align-items-center m-3`}>
              <button className={`tb-player ${buttonSelector(index, pos)}`}
                      onClick={() => selectPlayerPosition(index, pos)}>
                <img className={`tb-img`} src={teamSegment[index].imageUrl || altImg} alt="ciao"/>
              </button>
            </div>
          ))
        }
      </div>
    );
  };

  const listItemStyle = {
    position: 'relative',  // This makes it a reference for absolute positioning
    margin: '3%'
  };

  return (
    <>
      <div className={"row"}>
        <div className={"col-md-2"}>
          <select value={formation} onChange={e => handleFormationChange(e.target.value)}
                  className="form-select mb-3">
            <option value="4-4-2">4-4-2</option>
            <option value="4-3-3">4-3-3</option>
            <option value="3-5-2">3-5-2</option>
            <option value="3-4-3">3-4-3</option>
            <option value="5-3-2">5-3-2</option>
          </select>
        </div>
        <div className={"col-md"}></div>
        <div className={"col-md-4"}>
          <SearchBarUserTemp callback={test}></SearchBarUserTemp>
        </div>
      </div>


      <div className="row">
        <div className="col-md-4">
          <div className={"text-center"}>
            <h3>Seleziona i giocatori:</h3>
            <h4>Attaccanti</h4>
            <ul className="list-unstyled">
              {filterPlayersByPosition('Attack').map((player) => (
                <li key={player.playerId} onClick={() => handlePlayerSelection(player)} style={listItemStyle}>
                  <button
                    className={"player-Usr"}
                    onMouseOver={() => togglePopup(player.playerId)}
                    onMouseLeave={() => togglePopup(player.playerId)}
                  >
                    {player.name}
                  </button>
                  {popupsOpen[player.playerId] && <PopupPlayer isOpen={true} player={player}/>}
                </li>
              ))}
            </ul>
            <h4>Centrocampisti</h4>
            <ul className="list-unstyled">
              {filterPlayersByPosition('Midfield').map((player) => (
                <li key={player.playerId} onClick={() => handlePlayerSelection(player)} style={listItemStyle}>
                  <button
                    className={"player-Usr"}
                    onMouseOver={() => togglePopup(player.playerId)}
                    onMouseLeave={() => togglePopup(player.playerId)}
                  >
                    {player.name}
                  </button>
                  {popupsOpen[player.playerId] && <PopupPlayer isOpen={true} player={player}/>}
                </li>
              ))}
            </ul>
            <h4>Difensori</h4>
            <ul className="list-unstyled">
              {filterPlayersByPosition('Defender').map((player) => (
                <li key={player.playerId} onClick={() => handlePlayerSelection(player)} style={listItemStyle}>
                  <button
                    className={"player-Usr"}
                    onMouseOver={() => togglePopup(player.playerId)}
                    onMouseLeave={() => togglePopup(player.playerId)}
                  >
                    {player.name}
                  </button>
                  {popupsOpen[player.playerId] && <PopupPlayer isOpen={true} player={player}/>}
                </li>
              ))}
            </ul>
            <h4>Portieri</h4>
            <ul className="list-unstyled">
              {filterPlayersByPosition('Goalkeeper').map((player) => (
                <li key={player.playerId} onClick={() => handlePlayerSelection(player)} style={listItemStyle}>
                  <button
                    className={"player-Usr"}

                    onMouseOver={() => togglePopup(player.playerId)}
                    onMouseLeave={() => togglePopup(player.playerId)}
                  >
                    {player.name}
                  </button>
                  {popupsOpen[player.playerId] && <PopupPlayer isOpen={true} player={player}/>}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className=" col-md-4 d-flex align-items-stretch justify-content-center">
          <div
            className=" background-image">
            <div className="container-fluid d-flex flex-column justify-content-between h-100 px-0">
              {lineFormation(selectedFormation.forwards, '', 0)}
              {lineFormation(selectedFormation.midfielders, '', 1)}
              {lineFormation(selectedFormation.defenders, 'h-50', 2)}
              {lineFormation(['1'], 'h-50', 3)}
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <h3 className="text-center">Giocatori selezionati:</h3>
          <div className="text-center">
            <h4>Attaccanti</h4>
            <ul className="list-unstyled">
              {selectedFormation.forwards.map(player => (
                <li key={player.playerId}>{player.name}</li>
              ))}
            </ul>
            <h4>Centrocampisti</h4>
            <ul className="list-unstyled">
              {selectedFormation.midfielders.map(player => (
                <li key={player.playerId}>{player.name}</li>
              ))}
            </ul>
            <h4>Difensori</h4>
            <ul className="list-unstyled">
              {selectedFormation.defenders.map(player => (
                <li key={player.playerId}>{player.name}</li>
              ))}
            </ul>
            <h4>Portiere</h4>
            <ul className="list-unstyled">
              {selectedFormation.goalkeeper && (
                <li key={selectedFormation.goalkeeper.playerId}>{selectedFormation.goalkeeper.name}</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamFormationSelector;
