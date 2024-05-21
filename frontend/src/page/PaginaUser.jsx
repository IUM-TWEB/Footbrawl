import React from 'react';
import {useAuth} from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const PaginaUser = () => {
  const {username, logout} = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="container-fluid mt-5 px-5">
      <h1>Ciao {username ? username.username : 'utente'}</h1>
      <button onClick={handleLogout} className="btn btn-danger mt-3">Logout</button>
    </div>
  );
}

export default PaginaUser;