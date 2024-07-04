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

  const login = async (userInfo) => {
    const saved_data = (await axios.post('http://localhost:3000/users/getfav', {
      username: userInfo.username,
      pwd: userInfo.password
    })).data;
    setIsAuthenticated(true);
    setUsername(userInfo.username);
    setPassword(userInfo.password);
    setFavoritePlayers(saved_data.favorite_players || []);
    setFavoriteClubs(saved_data.favorite_teams || []);
  };

  const setNewPlayer = (player_id) => {
    // Get the current list of favorite players from localStorage
    let fav_players = localStorage.getItem("favoritePlayers");

    // Parse the JSON string to an array, or initialize an empty array if null
    fav_players = fav_players ? JSON.parse(fav_players) : [];

    // Add the new player ID to the array
    if (!fav_players.includes(player_id))
      fav_players.push(player_id);

    // Convert the array back to a JSON string and save it to localStorage
    localStorage.setItem("favoritePlayers", JSON.stringify(fav_players));
    setFavoritePlayers(fav_players);
  };

  const setNewClub = (club_id) => {
    // Get the current list of favorite clubs from localStorage
    let fav_clubs = localStorage.getItem("favoriteClubs");

    // Parse the JSON string to an array, or initialize an empty array if null
    fav_clubs = fav_clubs ? JSON.parse(fav_clubs) : [];

    // Add the new club ID to the array
    if (!fav_clubs.includes(club_id))
      fav_clubs.push(club_id);

    // Convert the array back to a JSON string and save it to localStorage
    localStorage.setItem("favoriteClubs", JSON.stringify(fav_clubs));
    setFavoriteClubs(fav_clubs);
  };

  const removePlayer = (player_id) => {
    let fav_players = localStorage.getItem('favoritePlayers');
    fav_players = fav_players ? JSON.parse(fav_players) : [];
    fav_players = fav_players.filter((id) => id !== player_id);
    localStorage.setItem('favoritePlayers', JSON.stringify(fav_players));
    setFavoritePlayers(fav_players);
  };

  const removeClub = (club_id) => {
    let fav_clubs = localStorage.getItem('favoriteClubs');
    fav_clubs = fav_clubs ? JSON.parse(fav_clubs) : [];
    fav_clubs = fav_clubs.filter((id) => id !== club_id);
    localStorage.setItem('favoriteClubs', JSON.stringify(fav_clubs));
    setFavoriteClubs(fav_clubs);
  };

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
      value={{
        isAuthenticated,
        username,
        password,
        favoritePlayers,
        favoriteClubs,
        login,
        logout,
        setNewPlayer,
        setNewClub,
        removePlayer,
        removeClub,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);