import React, {createContext, useContext, useState, useEffect} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  /*Variabili globali al sito*/
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const auth = localStorage.getItem('isAuthenticated');
    return auth === 'true';
  });

  const [username, setUsername] = useState(() => {
    const username = localStorage.getItem('username');
    return JSON.parse(username);
  });

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
    localStorage.setItem('username', JSON.stringify(username));
  }, [isAuthenticated, username]);

  //const login = () => setIsAuthenticated(true);
  const login = (userInfo) => {
    setIsAuthenticated(true);
    setUsername(userInfo);
  };

  //const logout = () => setIsAuthenticated(false);
  const logout = () => {
    setIsAuthenticated(false);
    setUsername(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
  };

  return (
    <AuthContext.Provider value={{isAuthenticated, username, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);