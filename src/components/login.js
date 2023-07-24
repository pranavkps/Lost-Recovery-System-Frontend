import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './auth.css';


const Login = ()=>{

  const history = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const[formError,setFormError] = useState();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    if(validate(formData)) return;

    axios
        .post('http://localhost:5000/login',formData)
        .then((res)=>{
          console.log(res);
          localStorage.setItem('userId', res.data.email);
          history('/');
          window.location.reload();
        })
        .catch((error)=>{
          setFormError(error.response.data.message);
          console.log(error);
        })

    setFormData({
      email: '',
      password: ''
    });
  };
  setTimeout(() => {
    setFormError('');
  }, 7000);

  const validate =(formData)=>{
    if(!formData.email || !formData.password){
      setFormError("please fill all above details they all are required");
      return true;
    }
    return false;
  }

  return (
    <div className="signin">
      <form onSubmit={handleSubmit} >
        <h3>Login..!</h3>
      <div className='mb-3'>
        <label htmlFor="email" className='form-label'>Email:</label>
        <FontAwesomeIcon icon={faEnvelope} className='icon'/>
        <input
          type="email"
          className='form-control'
          id="email"
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className='mb-3'>
        <label htmlFor="password" className='form-label'>Password:</label>
        <FontAwesomeIcon icon={faLock}  className='icon'/>
        <input
          type="password"
          className='form-control'
          id="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div className='mb-3' id='sub'>
        {formError && <small className='error'>{formError}</small>}
        <button type="submit" className='btn'>Submit</button>
        <p>Don't have a account...?<Link to="/signup" className="Link">Sign up</Link></p>
      </div>
    </form>
    
    </div>
  )
}

export default Login;