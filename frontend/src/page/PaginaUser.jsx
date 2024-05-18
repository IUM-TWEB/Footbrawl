import React from 'react';
import { useAuth } from '../context/AuthContext';

const PaginaUser = () => {
  const { username } = useAuth();

  return (
    <div className="container-fluid mt-5 px-5">
      <h1>Ciao {username ? username.username : 'utente'}</h1>
    </div>
  );
}

export default PaginaUser;