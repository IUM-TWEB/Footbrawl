import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

const ProtectedRoute = ({children}) => {
  const {isAuthenticated} = useAuth();

  if (!isAuthenticated) {
    // Se l'utente non è autenticato, reindirizza alla pagina di login
    return <Navigate to="/login"/>;
  }

  // Se l'utente è autenticato, renderizza il componente figlio
  return children;
};

export default ProtectedRoute;