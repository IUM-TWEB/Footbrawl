import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useAuth} from '../context/AuthContext';
import {useNavigate} from 'react-router-dom';
import TeamBuilder from "../simple_components/TeamBuilder.jsx";
import FavoriteUserPlayers from "../simple_components/FavouriteUserPlayers.jsx"
import FavouriteUserTeam from "../simple_components/FavouriteUserTeam.jsx";

const PaginaUser = () => {
  const {username, favoritePlayers, favoriteClubs, logout} = useAuth();
  const navigate = useNavigate();
  const [clubs, setClubs] = useState([])
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    if (favoritePlayers.length > 0) {
      Promise.all(favoritePlayers.map(selectedPlayer =>
        axios.get(`http://localhost:3000/player/${selectedPlayer}`)
          .then(response => response.data)
      ))
        .then(players => {
          setPlayers(players);
        })
        .catch(error => {
          console.error('Errore nel recuperare i nomi dei giocatori:', error);
        });
    }
  }, [favoritePlayers]);

  useEffect(() => {
    if (favoriteClubs.length > 0) {
      // Faccio la fetch dei nomi dei player
      Promise.all(favoriteClubs.map(selectedClub =>
        axios.get(`http://localhost:3000/club/${selectedClub}`)
          .then(response => response.data)
      ))
        .then(club => {
          setClubs(club);
        })
        .catch(error => {
          console.error('Errore nel recuperare i nomi dei giocatori:', error);
        });
    }
  }, [favoriteClubs]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };


  return (
    <div className="container-fluid mt-5 px-5 pb-5">
      <h1>Utente: {username ? username : 'utente'}</h1>
      {username && (
        <>
          <FavoriteUserPlayers Players={players}></FavoriteUserPlayers>
          <hr className="my-custom-hr"/>

          <FavouriteUserTeam clubs={clubs}></FavouriteUserTeam>
          <hr className="my-custom-hr"/>

          <TeamBuilder  favoritePlayers={players}></TeamBuilder>

          <div className="d-flex justify-content-end w-100 mt-3">
            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default PaginaUser;
