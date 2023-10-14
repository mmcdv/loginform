import React, { useState } from 'react';
import { BsFillEyeFill, BsFillEyeSlashFill, BsCheckCircleFill, BsFillCaretDownFill, BsFillCaretUpFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai';
import { BiError } from 'react-icons/bi';


function SignupForm() {

  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showTips, setShowTips] = useState(false);

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
      const url = 'http://localhost/login/server/login/create_acc.php';

      let fData = new FormData();
      fData.append('username', inputs.username);
      fData.append('email', inputs.email);
      fData.append('password', inputs.password);

      const response = await axios.post(url, fData);

      setFormResponse(response.data);
      setShowAlert(true);

      if(response.data.status === '200') {
        setTimeout(() => {
          navigate('/');
        }, 3000)
      }

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
        <h2 style={{ marginBottom: '2rem' }}>Sign up for your account</h2>
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
            type='email' 
            name='email' 
            placeholder='Email'
            required
            value={inputs.email}
            onChange={handleInputChange}
          />
        </div>
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
        <div className="password-tips">
          <button type='button' className='password-tips-btn' onClick={() => setShowTips(!showTips)}>
            <div className="password-tips-dropdown">
              <p>Tips for a secure password</p>
              {showTips ? <BsFillCaretUpFill />: <BsFillCaretDownFill />}
            </div>
            {showTips && (
              <ul>
                <li>At least 12 characters long</li>
                <li>Don't use a common password</li>
                <li>Include at least one special character (e.g., !, @, #, $, %)</li>
                <li>Include at least one uppercase letter</li>
              </ul>
            )}
          </button>
        </div>  
        <div className='form-btn'>
          <button type='submit'>
            Create Account
          </button>
        </div>              
        <hr className='bottom-divide'/>
        <div className="signupA">
          <p>Already have an account? <a href="" onClick={() => navigate('/')}>Log in!</a></p>  
        </div>  
      </form>
    </div>
  )
}

export default SignupForm