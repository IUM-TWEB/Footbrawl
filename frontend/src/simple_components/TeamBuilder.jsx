import {useEffect, useState} from 'react';
import altImg from '../img/alt.png'
import SearchBarUserTemp from "./SearchBarUserTemp.jsx";
import PopupPlayer from "./PopupPlayer.jsx";
import {Alert} from 'reactstrap';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useAuth} from "../context/AuthContext.jsx";

const TeamFormationSelector = ({favoritePlayers}) => {
    const {username, password} = useAuth();
    const [alert, setAlert] = useState(false)
    const navigate = useNavigate()
    const [popupsOpen, setPopupsOpen] = useState({});
    const [selectedPosition, setSelectedPosition] = useState([null, null])
    const [playerNames, setPlayerNames] = useState([]);
    const [formation, setFormation] = useState('4-4-2');
    const [selectedFormation, setSelectedFormation] = useState({
      forwards: ['0', '0'],
      midfielders: ['0', '0', '0', '0'],
      defenders: ['0', '0', '0', '0'],
      goalkeeper: ['0']
    });


    useEffect(() => {
      if (alert[0])
        setTimeout(() => {
          setAlert(!alert[0])
        }, 3000)
    }, [alert]);

    useEffect(() => {
      setPlayerNames(favoritePlayers);
    }, [favoritePlayers]);

    const sendFormation = async () => {
      axios.post('http://localhost:3000/users/postFormations', {
        username: username,
        pwd: password,
        formation: selectedFormation
      })
        .then(resp => {
          console.log(resp.data)
        })
        .catch(e => {
          console.log(e)
        })
    }

    const showError = () => {
      if (alert[0])
        return (
          <Alert key={'danger'} color={'danger'} style={{position: "absolute", marginTop: '1%'}}>
            {alert[1]}
          </Alert>);
      return null
    }

    const togglePopup = (id, context) => {
      setPopupsOpen(prev => ({
        ...prev,
        [`${id}-${context}`]: !prev[`${id}-${context}`]
      }));
    };


    const filterPlayersByPosition = (position) => {
      return playerNames.filter((player) => player.position === position);
    };

    const handleFormationChange = (formation) => {

      setFormation(formation)
      const defenders_num = parseInt(formation[0], 10);
      const midfielders_num = parseInt(formation[2], 10);

      const forwards_num = parseInt(formation[4], 10);

      setSelectedFormation({
        forwards: Array(forwards_num).fill("0"),
        midfielders: Array(midfielders_num).fill("0"),
        defenders: Array(defenders_num).fill("0"),
        goalkeeper: ["0"]
      });

    };

    const handlePlayerSelection = (player) => {
      if (selectedFormation.forwards.includes(player) ||
        selectedFormation.midfielders.includes(player) ||
        selectedFormation.defenders.includes(player) ||
        selectedFormation.goalkeeper.includes(player)) {

        return setAlert([true, "Non è possibile aggiungere due volte lo stesso giocatore"]);
      }


      setSelectedFormation(prevFormation => {
        const newFormation = {...prevFormation};
        if (!selectedPosition[1].includes(player))
          selectedPosition[1][selectedPosition[0]] = player;
        return newFormation;
      });
    };

    let addPlayer = (newPlayer) => {
      if (!playerNames.some(player => player.playerId === newPlayer.playerId)) {
        setPlayerNames([...playerNames, newPlayer]);
        handlePlayerSelection(newPlayer);
      } else {
        setAlert([true, "Giocatore già aggiunto ai selezionati"])
      }
    }

    const removePlayer = (pos, index) => {
      if (pos[index] !== '0') {
        const pos_key = Object.keys(selectedFormation).find(key => selectedFormation[key] === pos)
        setSelectedFormation(prevState => {
          const tmp = {...prevState}
          pos[index] = '0'
          tmp[pos_key] = pos
          return tmp
        })
      }
    };


    const buttonSelector = (index, pos) => {
      if (index !== selectedPosition[0] || pos !== selectedPosition[1]) {
        return 'image-overlay'
      } else
        return 'image-overlay-selected'
    }

    const selectPlayerPosition = (x, y) => {
      setSelectedPosition([x, y])
    }

    const lineFormation = (elements, h) => {
      const numElements = elements.length;
      const colSize = Math.min(1, 12 / Math.max(1, numElements));

      return (
        <div className={`row flex-grow-1 d-flex justify-content-center align-items-center w-100 mx-0 ${h} `}>
          {
            elements.map((element, index) => (
              <div key={index}
                   style={{maxWidth: "80px"}}
                   className={`col-md-${colSize + 1} d-flex justify-content-center align-items-center m-3 position-relative`}>
                {elements[index] !== '0' && (
                  <div className="btn btn-sm btn-danger ml-2" onClick={() => removePlayer(elements, index)}
                       style={{
                         position: 'absolute',
                         width: "10px",
                         height: "10px",
                         borderRadius: "55px",
                         zIndex: 100,
                         backgroundColor: "rgb(0,0,0,0)",
                         border: "10px",
                         borderColor: "black",
                         bottom: "110%",
                         left: "80%"
                       }}
                  >
                    x
                  </div>
                )}
                <button className={`tb-player ${buttonSelector(index, elements)}`}
                        onClick={() => selectPlayerPosition(index, elements)}>
                  <img className={`tb-img`} src={elements[index].imageUrl || altImg} alt="ciao"/>

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

    const svgSelector = (position) => {
      switch (position) {
        case 'Attack':
          return (
            <div className={'col-1'} style={{marginTop: '1%'}} title="Attaccante">
              <svg id="Layer_1" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"
                   data-name="Layer 1">
                <path
                  d="m23.414.587a2.022 2.022 0 0 0 -1.941-.513 16.461 16.461 0 0 0 -6.479 3.983l-9.476 9.475a14.58 14.58 0 0 0 -4.376-1.522 1 1 0 0 0 -.286 1.979 12.632 12.632 0 0 1 5.353 2.387l-3.709 3.71-.793-.793a1 1 0 1 0 -1.414 1.414l3 3a1 1 0 1 0 1.414-1.414l-.793-.793 3.709-3.71a12.609 12.609 0 0 1 2.387 5.354 1 1 0 0 0 .99.856.881.881 0 0 0 .144-.011 1 1 0 0 0 .847-1.13 14.515 14.515 0 0 0 -1.522-4.376l9.475-9.476a16.52 16.52 0 0 0 4.01-6.574 1.994 1.994 0 0 0 -.54-1.846zm-4.885 7.005-9.167 9.168a11.15 11.15 0 0 0 -.988-1.134 11.36 11.36 0 0 0 -1.133-.988l9.167-9.167a14.384 14.384 0 0 1 5.584-3.464 14.453 14.453 0 0 1 -3.463 5.585z"/>
              </svg>
            </div>
          );
        case 'Defender':
          return (
            <div className={'col-1'} style={{marginTop: '1%'}} title="Difensore">

              <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" height="20" viewBox="0 0 24 24"
                   width="20">
                <path
                  d="m11,0v23.94c-2.1-1.062-9-5.046-9-11.565v-7.225c0-1.293.828-2.441,2.056-2.848L11,0Zm8.944,2.302L13,0v24c2.207-.905,9-4.282,9-11.625v-7.225c0-1.293-.828-2.441-2.056-2.848Z"/>
              </svg>
            </div>

          );
        case 'Goalkeeper':
          return (
            <div className={'col-1'} style={{marginTop: '1%'}} title="portiere">
              <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" height="20" viewBox="0 0 24 24"
                   width="20">
                <path
                  d="M19,0H5C2.243,0,0,2.243,0,5v14c0,2.757,2.243,5,5,5h14c2.757,0,5-2.243,5-5V5c0-2.757-2.243-5-5-5ZM8,17v-4h8v4H8Zm5-6V7h9v4H13Zm-5-6V2h8v3H8Zm3,2v4H2V7H11ZM2,13H6v4H2v-4Zm16,0h4v4h-4v-4Zm4-8h-4V2h1c1.654,0,3,1.346,3,3ZM5,2h1v3H2c0-1.654,1.346-3,3-3ZM2,19H11v3H5c-1.654,0-3-1.346-3-3Zm17,3h-6v-3h9c0,1.654-1.346,3-3,3Z"/>
              </svg>
            </div>
          )

        case 'Midfield':
          return (
            <div className={'col-1'} style={{marginTop: '1%'}} title="Centrocampista">

              <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" height="20" viewBox="0 0 24 24"
                   width="20">
                <path
                  d="M23.7,1.715l.008-.008-.026-.026A2.994,2.994,0,0,0,22.319.319L22.293.293,22.285.3A2.951,2.951,0,0,0,21,0H18V2h2.586L17.6,4.989A12.507,12.507,0,0,0,.667,5.66l-.708.707,8.13,8.13L4.586,18H0v2H2.586L.293,22.293l1.414,1.414L4,21.414V24H6V19.414l3.5-3.5,8.13,8.13.707-.708A12.505,12.505,0,0,0,19.011,6.4L22,3.414V6h2V3A2.951,2.951,0,0,0,23.7,1.715ZM2.821,6.4a10.518,10.518,0,0,1,13.364,0L9.5,13.083ZM17.6,21.179,10.917,14.5,17.6,7.815A10.518,10.518,0,0,1,17.6,21.179Z"/>
              </svg>

            </div>
          )

      }
    }

    const listPlayers = (position, arr, context) => {
      return (
        <ul className="list-unstyled">
          {arr.map((player) => {
            if (!player.playerId) return null;

            return (
              <li key={player.playerId} onClick={context === 'left' ? () => handlePlayerSelection(player) : null}
                  style={listItemStyle}>
                <div className={'row'}>
                  <div className={'col-3'}></div>

                  <button className={'col-6 btn'}
                          onMouseOver={() => togglePopup(player.playerId, context)}
                          onMouseLeave={() => togglePopup(player.playerId, context)}>
                    {player.name}
                  </button>

                  {svgSelector(position)}

                  <i className="fa-solid fa-up-right-from-square col-1" style={{marginTop: '3%'}}
                     onClick={() => {
                       navigate(`/giocatori/${player.playerId}`)
                     }}
                     title="Dettagli giocatore">
                  </i>
                </div>
                {popupsOpen[`${player.playerId}-${context}`] && <PopupPlayer isOpen={true} player={player}/>}
              </li>
            );
          })}
        </ul>
      );
    };


    return (
      <>
        <h2>Crea la tua squadra</h2>
        <div>
          <p>
            Scegli una posizione nel campo e seleziona o cerca il tuo giocatore
          </p>
        </div>
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
            <SearchBarUserTemp callback={addPlayer}></SearchBarUserTemp>
          </div>
        </div>


        <div className="row">
          <div className="col-md-4">
            <div className={"text-center"}>
              <h3>Seleziona i giocatori:</h3>

              {listPlayers('Attack', filterPlayersByPosition('Attack'), 'left')}

              {listPlayers('Midfield', filterPlayersByPosition('Midfield'), 'left')}

              {listPlayers('Defender', filterPlayersByPosition('Defender'), 'left')}

              {listPlayers('Goalkeeper', filterPlayersByPosition('Goalkeeper'), 'left')}
            </div>
          </div>

          <div className=" col-md-4 d-flex align-items-stretch justify-content-center">
            {showError()}

            <div
              className=" background-image">
              <div className="container-fluid d-flex flex-column justify-content-between h-100 px-0">
                {lineFormation(selectedFormation.forwards, '')}
                {lineFormation(selectedFormation.midfielders, '')}
                {lineFormation(selectedFormation.defenders, 'h-50')}
                {lineFormation(selectedFormation.goalkeeper, 'h-50')}
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <h3 className="text-center">Giocatori selezionati:</h3>
            <div className="text-center">
              <ul className="list-unstyled">
                {listPlayers('Attack', selectedFormation.forwards, 'right')}
              </ul>
              <ul className="list-unstyled">
                {listPlayers('Midfield', selectedFormation.midfielders, 'right')}
              </ul>
              <ul className="list-unstyled">
                {listPlayers('Defender', selectedFormation.defenders, 'right')}
              </ul>
              <ul className="list-unstyled">
                {listPlayers('Goalkeeper', selectedFormation.goalkeeper, 'right')}
              </ul>
            </div>
          </div>
        </div>
        <button className={"btn btn-primary"} onClick={() => {
          sendFormation()
        }}>Salva
        </button>
      </>
    );
  }
;

export default TeamFormationSelector;
