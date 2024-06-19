import React, {createContext, useContext, useState, useEffect} from 'react';
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const auth = localStorage.getItem('isAuthenticated');
    return auth === 'true';
  });

  const [username, setUsername] = useState(() => {
    try {
      const username = localStorage.getItem('username');
      return username ? JSON.parse(username) : null;
    } catch (error) {
      console.error("Invalid JSON in localStorage for 'username'");
      return null;
    }
  });

  const [password, setPassword] = useState(() => {
    try {
      const password = localStorage.getItem('password');
      return password ? JSON.parse(password) : null;
    } catch (error) {
      console.error("Invalid JSON in localStorage for 'password'");
      return null;
    }
  });

  const [favoritePlayers, setFavoritePlayers] = useState(() => {
    try {
      const players = localStorage.getItem('favoritePlayers');
      return players ? JSON.parse(players) : [];
    } catch (error) {
      console.error("Invalid JSON in localStorage for 'favoritePlayers'");
      return [];
    }
  });

  const [favoriteClubs, setFavoriteClubs] = useState(() => {
    try {
      const clubs = localStorage.getItem('favoriteClubs');
      return clubs ? JSON.parse(clubs) : [];
    } catch (error) {
      console.error("Invalid JSON in localStorage for 'favoriteClubs'");
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
    localStorage.setItem('username', JSON.stringify(username));
    localStorage.setItem('password', JSON.stringify(password));
    localStorage.setItem('favoritePlayers', JSON.stringify(favoritePlayers));
    localStorage.setItem('favoriteClubs', JSON.stringify(favoriteClubs));
  }, [isAuthenticated, username, password, favoritePlayers, favoriteClubs]);

  //const login = () => setIsAuthenticated(true);
  const login = async (userInfo) => {
    const favoritePlayers = (await axios.post('http://localhost:3000/users/getfav', {
      username: userInfo.username,
      pwd: userInfo.password
    })).data;
    setIsAuthenticated(true);
    setUsername(userInfo.username);
    setPassword(userInfo.password);
    setFavoritePlayers(favoritePlayers || []);
    setFavoriteClubs(userInfo.favoriteClubs || []);
  };

  const setNewPlayer = (player_id) => {
    // Get the current list of favorite players from localStorage
    let fav_players = localStorage.getItem("favoritePlayers");

    // Parse the JSON string to an array, or initialize an empty array if null
    fav_players = fav_players ? JSON.parse(fav_players) : [];

    // Add the new player ID to the array
    fav_players.push(player_id);

    // Convert the array back to a JSON string and save it to localStorage
    localStorage.setItem("favoritePlayers", JSON.stringify(fav_players));
    setFavoritePlayers(fav_players);
  };

  //const logout = () => setIsAuthenticated(false);
  const logout = () => {
    setIsAuthenticated(false);
    setUsername(null);
    setPassword(null);
    setFavoritePlayers([]);
    setFavoriteClubs([]);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('favoritePlayers');
    localStorage.removeItem('favoriteClubs');
  };

  return (
    <AuthContext.Provider
      value={{isAuthenticated, username, password, favoritePlayers, favoriteClubs, login, logout, setNewPlayer}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);