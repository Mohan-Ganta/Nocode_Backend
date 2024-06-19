import React, { useState } from 'react'
import Navbar from '../Dashboard/Navbar';
import { useAppContext } from '../AppContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
const Register = () => {
    const [username , setUsername] = useState()
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const {handleLoginUser} = useAppContext();

     const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
   
    const [email, setEmail] = useState("");




    const navigate = useNavigate()
    const handleLoginBtn = async () => {
        const signupData = {
            username : username,
            email : email,
            password : password
        }
        const url = `${process.env.REACT_APP_USER_URL}/add`
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
          <label className="input-label">First Name :</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label className="input-label">LastName :</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
