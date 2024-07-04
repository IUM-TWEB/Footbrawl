import React, {useState} from 'react';
import axios from "axios";
import {useNavigate, Link} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useAuth} from '../context/AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginValid, setLoginValid] = useState(null);
  const navigate = useNavigate();
  const {login} = useAuth();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (loginValid !== null) setLoginValid(null);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value !== null) setLoginValid(null);
  };

  const handleError = async (res) => {
    if (res === 0) {
      console.log("handle ", res);
      setLoginValid(false);
      toast.error('Username or password is incorrect', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setLoginValid(true);
      await login({username, password});
      //localStorage.setItem("username", username);
      //localStorage.setItem("isLogged", "true");
      navigate('/paginauser');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Both username and password are required');
      setLoginValid(false);
    } else {
      setError('');
      axios.post(`http://localhost:3000/users/log`, {username: username, pwd: password})
        .then(res => {
          console.log(res.data);
          handleError(res.data);
        })
        .catch(err => {
          console.log(err);
          setError('Error logging in');
        });
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <h5 className="card-header">Login</h5>
              <div className="card-body">
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                      type="text"
                      className={`form-control ${loginValid === false ? 'is-invalid' : ''} ${loginValid === true ? 'is-valid' : ''}`}
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
                      className={`form-control ${loginValid === false ? 'is-invalid' : ''} ${loginValid === true ? 'is-valid' : ''}`}
                      id="password"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  <div className="text-end">
                    <button type="submit" className="btn btn-chocolate">Invia</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer/>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="text-center mt-4">
              <Link to="/reg" className="link-primary">Non ti sei ancora registrato?</Link>
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
}

export default Login;
