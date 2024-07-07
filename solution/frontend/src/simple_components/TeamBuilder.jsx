import {useEffect, useState} from 'react';
import altImg from '../img/alt.png'
import SearchBarUserTemp from "./SearchBarUserTemp.jsx";
import PopupPlayer from "./PopupPlayer.jsx";
import {Alert} from 'reactstrap';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useAuth} from "../context/AuthContext.jsx";
import '../style/TeamBuilder.css';

const TeamFormationSelector = ({favoritePlayers}) => {
    const {username, password} = useAuth();
    const [alert, setAlert] = useState({isOpen: false, color: "", message: ""});
    const navigate = useNavigate()
    const [popupsOpen, setPopupsOpen] = useState({});
    const [selectedPosition, setSelectedPosition] = useState({index: null, array: null});
    const [savedPlayersValues, setSavedPlayersValues] = useState([]);
    const [formation, setFormation] = useState('4-4-2');
    const [savedFormations, setSavedFormations] = useState([])
    const [selectedFormation, setSelectedFormation] = useState({
      forwards: ['0', '0'],
      midfielders: ['0', '0', '0', '0'],
      defenders: ['0', '0', '0', '0'],
      goalkeeper: ['0']
    });
    const [selectedPlayerIndex, setSelectedPlayerIndex] = useState({index: null, array: null});

    const handlePlayerClick = (index, array) => {
      if (selectedPlayerIndex.index === index && selectedPlayerIndex.array === array) {
        setSelectedPlayerIndex({index: null, array: null}); // Deseleziona se è già selezionato
      } else {
        setSelectedPlayerIndex({index, array}); // Seleziona il nuovo
      }
      selectPlayerPosition(index, array);
    };

    useEffect(() => {
      const fetchData = async () => {
        const resp = await getFormations();
        if (resp && Array.isArray(resp)) {
          setSavedFormations(resp);
          //console.log("saved:", savedFormations)
        }
      };

      fetchData();
    }, []);


    useEffect(() => {
      // Cerchiamo la formazione salvata che corrisponde tra le salvate in base al tipo
      const filtered_formation = savedFormations.find(i => i.type === formation)
      if (filtered_formation)
        setSelectedFormation(filtered_formation.formation)

    }, [formation, savedFormations]);

    // Quando alert viene modificato reimpostiamo a false lo stato per richiudere
    // l'alert
    useEffect(() => {
      if (alert.isOpen) {
        const timeout = setTimeout(() => {
          setAlert({isOpen: false, color: "", message: ""});
        }, 3000);
        return () => clearTimeout(timeout);
      }
    }, [alert]);


    useEffect(() => {
      setSavedPlayersValues(favoritePlayers);
    }, [favoritePlayers]);

    // Salviamo la formazione
    const sendFormation = async () => {
      axios.post('http://localhost:3000/users/postFormations', {
          username: username,
          pwd: password,
          formation: {
            type: formation,
            formation: selectedFormation,
            name: "" // Da implementare la scelta del nome della formazione
          }
        }
      )
        .then(() => {
          setAlert({isOpen: true, color: "success", message: "Formazione salvata correttamente"})
        })
        .catch(e => {
          console.log(e)
        })
    }

    // Otteniamo le formazioni salvate
    const getFormations = async () => {
      const axios_resp = await axios.post('http://localhost:3000/users/getFormations', {
        username: username,
        pwd: password
      })
      return axios_resp.data
    }

    const showError = () => {
      if (alert.isOpen) {
        return (
          <Alert key={'danger'} color={alert.color} style={{position: "absolute", marginTop: '1%'}}>
            {alert.message}
          </Alert>
        );
      }
      return null;
    };

    // Salviamo id e context (right, left) per poter aprire un singolo popup per volta
    const togglePopup = (id, isOpen, context) => {
      setPopupsOpen([id, isOpen, context])
    };

    // Otteniamo i giocatori in base alla posizione che ricoprono
    const filterPlayersByPosition = (position) => {
      return savedPlayersValues.filter((player) => player.position === position);
    };

    const handleFormationChange = (formation) => {
      setFormation(formation)
      // Otteniamo i numeri di giocatori nelle varie posizioni
      const defenders_num = parseInt(formation[0], 10);
      const midfielders_num = parseInt(formation[2], 10);
      const forwards_num = parseInt(formation[4], 10);

      // Svuota la formazione creata se la disposizione cambia
      setSelectedFormation({
        forwards: Array(forwards_num).fill("0"),
        midfielders: Array(midfielders_num).fill("0"),
        defenders: Array(defenders_num).fill("0"),
        goalkeeper: ["0"]
      });
    };

    const handlePlayerSelection = (player) => {
      // Controlliamo se il giocatore è già stato inserito nella formazione
      if (selectedFormation.forwards.includes(player) ||
        selectedFormation.midfielders.includes(player) ||
        selectedFormation.defenders.includes(player) ||
        selectedFormation.goalkeeper.includes(player)) {
        setAlert({isOpen: true, color: "danger", message: "Non è possibile aggiungere due volte lo stesso giocatore"});
        return
      }

      setPopupsOpen({}) // Resettiamo il popup

      // selectedPosition.index è l'index dell'array in cui deve essere posizionato il giocatore
      // selectedPosition.array è l'array in cui posizionarlo
      setSelectedFormation(prevFormation => {
        const newFormation = {...prevFormation};
        if (selectedPosition.array && !selectedPosition.array.includes(player)) {
          selectedPosition.array[selectedPosition.index] = player;
          removeFromList(player)
        } else
          setAlert({
            isOpen: true,
            color: "danger",
            message: "Selezionare prima una posizione, ed in seguito un giocatore"
          });
        return newFormation;
      });
    };

    const addPlayer = (newPlayer) => {
      if (!savedPlayersValues.some(player => player.playerId === newPlayer.playerId)) {
        setSavedPlayersValues([...savedPlayersValues, newPlayer]);
      } else {
        setAlert({isOpen: true, color: "danger", message: "Giocatore già aggiunto ai tuoi giocatori"});
      }
    };

    // Rimuoviamo un giocatore dalla formazione
    const removePlayer = (pos, index) => {
      if (pos[index] !== '0') {
        const pos_key = Object.keys(selectedFormation).find(key => selectedFormation[key] === pos); // Otteniamo quale chiave dell'oggetto
        setSelectedFormation(prevState => {
          const tmp = {...prevState};
          addToList(pos[index]); // Aggiungi alla lista se non già presente
          pos[index] = '0'; // Eliminiamo il giocatore
          tmp[pos_key] = pos; // Assegniamo l'array senza il giocatore
          return tmp;
        });
      }
    };

    // Togliamo dalla lista dei giocatori player
    const removeFromList = (player) => {
      if (savedPlayersValues.includes(player)) {
        let tmp = savedPlayersValues
        tmp.splice(tmp.indexOf(player), 1)
        setSavedPlayersValues(tmp)
      } else {
        console.error("Tentativo di eliminare un giocatore non esistente")
        setAlert({isOpen: true, color: "danger", message: "Errore"})
      }
    }

    // Aggiungiamo alla lista dei giocatori selezionabili
  const addToList = (player) => {
    if (!savedPlayersValues.some(savedPlayer => savedPlayer.playerId === player.playerId)) {
      setSavedPlayersValues([...savedPlayersValues, player]);
    } else {
      //console.error("Tentativo di aggiungere un giocatore già esistente");
      setAlert({isOpen: true, color: "warning", message: "Giocatore già presente in lista"});
    }
  };

    const selectPlayerPosition = (index, array) => {
      if (selectedPlayerIndex.index === index && selectedPlayerIndex.array === array) {
        setSelectedPosition({index: null, array: null}); // Deseleziona
      } else {
        setSelectedPosition({index, array}); // Seleziona
      }
    }

    const lineFormation = (elements, flexClass) => {
      const numElements = elements.length;

      return (
        <div className={`row ${flexClass} d-flex justify-content-center align-items-center w-100 ps-4`}>
          {elements.map((element, index) => (
            <div key={index}
                 className={`col-${Math.floor(12 / numElements)} pt-5 d-flex justify-content-center align-items-center`}>
              <div className="position-relative">
                {elements[index] !== '0' && (
                  <div className="remove-button" onClick={() => removePlayer(elements, index)}>
                    x
                  </div>
                )}
                <button
                  className={`tb-player ${selectedPlayerIndex.index === index && selectedPlayerIndex.array === elements ? 'image-overlay-selected' : 'image-overlay'}`}
                  onClick={() => handlePlayerClick(index, elements)}>
                  <img src={elements[index].imageUrl || altImg} alt={elements[index].name}/>
                </button>
              </div>
            </div>
          ))}
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
                          onMouseOver={() => togglePopup(player.playerId, true, context)}
                          onMouseLeave={() => togglePopup(player.playerId, false, context)}>
                    {player.name}
                  </button>
                  {svgSelector(player.position)}

                  <button className="fa-solid fa-up-right-from-square border-0 rounded-5 mt-0 mx-2 col-1 bottone-info"
                          style={{marginTop: '3%'}}
                          onClick={() => {
                            navigate(`/giocatori/${player.playerId}`)
                          }}
                          title="Dettagli giocatore">
                  </button>
                </div>
                {popupsOpen[1] && popupsOpen[2] === context && popupsOpen[0] === player.playerId &&
                  <PopupPlayer isOpen={true} player={player}/>}
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
          <div className="col-md-4 min-width-tb">
            <div className={"text-center"}>
              <h3>I tuoi giocatori:</h3>

              {listPlayers('Attack', filterPlayersByPosition('Attack'), 'left')}

              {listPlayers('Midfield', filterPlayersByPosition('Midfield'), 'left')}

              {listPlayers('Defender', filterPlayersByPosition('Defender'), 'left')}

              {listPlayers('Goalkeeper', filterPlayersByPosition('Goalkeeper'), 'left')}
            </div>
          </div>

          <div className=" col-md-4 d-flex align-items-stretch justify-content-center min-width-tb">
            {showError()}
            <div className="background-image field-background d-flex flex-column justify-content-between">
              {lineFormation(selectedFormation.forwards, 'flex-grow-1')}
              {lineFormation(selectedFormation.midfielders, 'flex-grow-1')}
              {lineFormation(selectedFormation.defenders, 'flex-grow-1')}
              {lineFormation(selectedFormation.goalkeeper, 'flex-grow-1')}
            </div>
          </div>

          <div className="col-md-4 min-width-tb">
            <h3 className="text-center">Giocatori in campo:</h3>
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
        <div className="row">
          <div className="col-md-10"></div>
          <button
            className="col-sm-2 btn btn-primary"
            onClick={() => {
              sendFormation()
            }}>Salva
          </button>
        </div>
      </>
    );
  }
;

export default TeamFormationSelector;