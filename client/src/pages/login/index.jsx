import React, { useState } from 'react';
import { BsFillEyeFill, BsFillEyeSlashFill, BsCheckCircleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { BiError } from 'react-icons/bi';
import axios from 'axios';

function LoginForm() {

  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  });
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [formResponse, setFormResponse] = useState({
    status: '',
    message: ''
  })

  const handleShowPassword = () => setShowPass((show) => !show);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const url = 'http://localhost/login/server/login/sign_in.php';

      let fData = new FormData();
      fData.append('username', inputs.username);
      fData.append('password', inputs.password);

      const response = await axios.post(url, fData);

      setFormResponse(response.data);
      setShowAlert(true);

    } catch (err) {
      setFormResponse({
        status: '300',
        message: 'Request failed. Try again in a few minutes.'
      });
      setShowAlert(true);
    }
  
  } 

  return (
    <div className='form-content'>
      <form method='POST' onSubmit={handleFormSubmit}>
        <h2>Log in to your Account</h2>
        <h5>Welcome back!</h5>
        {showAlert && (
          <div className={`alertBox ${formResponse.status === '200' ? 'success' : 'error'}`} >
            <div className="message">
              {formResponse.status === '200' ? <BsCheckCircleFill /> : <BiError /> }
              <p>{formResponse.message}</p>
            </div>
            <button className='close-btn' type='button' onClick={() => setShowAlert(false)}>
              <AiOutlineClose />
            </button>
          </div>
        )}   
        <div className="">
          <input 
            type='text' 
            name='username' 
            required
            placeholder='Username'
            value={inputs.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="passwordBox">
          <input 
            type={showPass ? 'text' : 'password'} 
            name='password'
            placeholder='Password' 
            required    
            value={inputs.password}    
            onChange={handleInputChange}
          />
          <a className='eyeFill' onClick={handleShowPassword}>
            {showPass ? <BsFillEyeSlashFill /> : <BsFillEyeFill/>}
          </a>
        </div>
        <div className="forgotPassword">
          <a href="">Forgot Username/Password?</a>
        </div>
        <div className='form-btn'>
          <button type='submit'>
            Log In
          </button>
        </div>              
        <hr className='bottom-divide'/>
        <div className="signupA">
          <p>Don't have an account? <a href="" onClick={() => navigate('/signup')}>Sign up today!</a></p>  
        </div>  
      </form>
    </div>
  )
}

export default LoginForm