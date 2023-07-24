import React ,{ useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
import './navbar.css';


const NavBar = () => {

  const [userId,setUserId] = useState('');
  const history = useNavigate();

  useEffect(() => {
    setUserId(localStorage.getItem('userId'));
  }, []);
  return (
    <nav className="navbar">
      <small className="navbar-brand" href="">Lost & Recovery system...</small>
      
        
        {!userId && <div>
          <ul>
            <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
            <li className="nav-item"><Link to="/signup" className='nav-link'>Post/add Item</Link></li>
            <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>
            <li className="nav-item"><Link to="/signup" className="nav-link">Sign In</Link></li>
          </ul>
        </div>}
        {userId && <div>
          <ul>
            <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
            <li className="nav-item"><Link to="/upload" className='nav-link'>Post/add Item</Link></li>
            <li className="nav-item"><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
            <li className="nav-item"><Link 
                      onClick={()=>{localStorage.clear('userId');
                      history('/');
                      window.location.reload();
                    }} className="nav-link">Logout</Link></li>
          </ul>
          </div>}
    </nav>
  );
};

export default NavBar;
