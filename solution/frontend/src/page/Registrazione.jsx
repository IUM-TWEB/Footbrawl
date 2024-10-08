import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {useAuth} from '../context/AuthContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {login} = useAuth();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUserResponse = (await axios.post('http://localhost:3000/users', {
        username: username,
        pwd: password
      })).data;
      if (newUserResponse === 1) {
        setError('');
        await login({username, password});
        navigate('/paginauser');
      } else if (newUserResponse === 0) {
        setError('Nome utente già esistente')
      } else {
        setError('Errore nella registrazione, prova pù tardi')
      }

    } catch (err) {
      setError('Error registering user');
      console.log(err);
    }
  };

  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <h5 className="card-header">Registrati</h5>
              <div className="card-body">
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={username}
                      onChange={handleUsernameChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  <div className="text-end">
                    <button type="submit" className="btn btn-primary">Registrati</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="m-5 d-flex"></div>
      <div className="m-5 d-flex"></div>
      <div className="m-5 d-flex"></div>
      <div className="m-5 d-flex"></div>
    </>
  );
};

export default Register;
