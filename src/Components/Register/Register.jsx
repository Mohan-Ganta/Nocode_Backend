import React, { useState } from 'react'
import Navbar from '../Dashboard/Navbar';
import { useAppContext } from '../AppContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
const Register = () => {
    const [username , setUsername] = useState()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const {handleLoginUser} = useAppContext();
    const navigate = useNavigate()
    const handleLoginBtn = async () => {
        const signupData = {
            username : username,
            email : email,
            password : password
        }
        const url = "http://localhost:5000/users/add"
        axios.post(url,signupData)
        .then(res=>{
            Swal.fire({
                title:"Success",
                text : res.data.message,
                icon:  "success"
            })
            navigate("/")
        })
        .catch(err=>console.log(err))
        
    };
  return (
    <>
    <Navbar />
    <div className="login-container">
        <h2>Sign Up</h2>   
      <form>
      <div>
          <label className="input-label">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
        </div>
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
          Register
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
    </>
  )
}

export default Register
