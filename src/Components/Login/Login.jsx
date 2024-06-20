import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import Navbar from '../Dashboard/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../AppContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const {handleLoginUser} = useAppContext();
    const navigate = useNavigate()
    const handleLoginBtn = async () => {
        const url = `${process.env.REACT_APP_BASE_URL}/users/login/${email}/${password}`
        await axios.get(url)
        .then(res=>{
          handleLoginUser(res.data)
          navigate("/dashboard")
        })
        .catch(err=>{setErrorMessage("Invalid Credentials")})
    };

    return (
        <>
        <Navbar />
        <div className="login-container">
            <h2>Login Page</h2>   
          <form>
            <div>
              <label className="input-label">E-Mail:</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
              />
            </div>
            <button type="button" onClick={handleLoginBtn} className="login-button">
              Login
            </button>
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        <span className='signup-link'>Register Here : <a href='/register'>Sign up</a></span>

        </div>
        </>
      );
    };


export default Login;

