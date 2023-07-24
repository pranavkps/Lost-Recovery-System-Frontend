import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone, faEnvelope, faLock, faIdCard } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './auth.css'


const SignUp = ()=>{
  
  const history = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    identity: '',
  });
  const[formError,setFormError] = useState();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  setTimeout(() => {
    setFormError('');
  }, 7000);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    if(validate(formData)){
      return;
    }

    axios
        .post('http://localhost:5000/signup',formData)
        .then((res)=>{
          console.log(res);
          history('/login');
        })
        .catch((error)=>{
          setFormError(error.response.data.message);
          console.log(error);
        })
        .finally(()=>{
          setFormData({
            name: '',
            phone: '',
            email: '',
            password: '',
            identity: '',
          });
        })
  };

  const validate =(formData)=>{
    if(!formData.name || !formData.phone || !formData.email || !formData.identity || !formData.password){
      setFormError("please fill all above details they all are required");
      return true;
    }
    return false;
  }

  return (
    <div className="signin">
      <form onSubmit={handleSubmit} >
        <h3>Sign Up..!</h3>
      <div className='mb-3'>
        <label htmlFor="name" className='form-label'>Name:</label>
        <FontAwesomeIcon icon={faUser} className='icon'/>
        <input
          type="text"
          id="name"
          name="name"
          className='form-control'
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className='mb-3'>
        <label htmlFor="phone" className='form-label'>Phone:</label>
        <FontAwesomeIcon icon={faPhone} className='icon'/>
        <input
          className='form-control'
          type="text"
          id="phone"
          name="phone"
          placeholder="Mobile Number"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
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
          placeholder="Create Password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div className='mb-3'>
        <label htmlFor="identity" className='form-label'>Identity: (Ex. Student Faculty)</label>
        <FontAwesomeIcon icon={faIdCard} className='icon'/>
        <input
          className='form-control '
          type="text"
          id="identity"
          name="identity"
          placeholder="Identity ( ex. Student, Faculty, Security..."
          value={formData.identity}
          onChange={handleChange}
        />
      </div>
      <div className='mmm' id='sub'>
        {formError && <small className='error'>{formError}</small>}
        <button type="submit" className='btn'>Submit</button>
        <p>Alreay have a account...?<Link to="/login" className="Link">Login</Link></p>
      </div>
    </form>
    
    </div>
  )
}

export default SignUp;