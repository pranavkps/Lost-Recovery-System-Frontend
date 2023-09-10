import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './home.css';
import moment from 'moment';

const Home = ()=>{

  const [images, setImages] = useState([]);
  const [onSearch, setOnSearch] = useState(false);

  const sendMessage = (image) => {
    console.log(image);
    const phoneNumber = image.phone;
    const message = encodeURIComponent(`Hello, I'm ${image.name}  the add that you posted on 
      RGUKT_B Lost & Recovery Portal was mine could you 
      please call me when you get this Thank You :)`); // Replace with your desired message

    const url = `https://wa.me/${phoneNumber}?text=${message}`;

    window.open(url, '_blank');
  };

  useEffect(() => {
    fetchImages();
  }, []);

  setTimeout(()=>{
    setError("");
  },5000);

  const [error,setError] = useState('');
  const [search,setSearch] = useState("");

  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get-items");
      setImages(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const submitHandler =async (e)=>{
    e.preventDefault();
    setOnSearch(true);
      await axios
        .get(`http://localhost:5000/search/${search}`)
        .then((res)=>{
          setImages(res.data);
          
          })
        .catch ((error) =>{
          console.error(error);
          setError("No Items Found");
        });
  };

  return(
    <div>
      <div className='search'>
          <form onSubmit={submitHandler}>
            <input 
              type='text'
              name ='search'
              value={search}
              placeholder='Search by tag name'
              onChange={(event)=>{
                setSearch(event.target.value);
              }}
            />
            <button id='btn'> search</button>
          </form>
          
      </div>
      {onSearch ? 
        <div>
          <div className="display">
        <center><h2>Find Your Lost Items Here....!</h2></center>
        <div className='items'>
        {images
        .filter(image => image.status === "pending")
        .map((image) => (
          <div key={image._id} className="item-card">
            <img src={`http://localhost:5000/${image.imagePath}`} alt={image.place} />
            <center><small className='item-name'>{image.itemName}</small></center>
            <div className='content'>
              <p>Found Place <b className='bold'>{image.place}</b></p>
              <div className='name'> 
              <h5>Posted by <b className='bold'>{image.name}</b></h5> <small>({image.identity})</small>
              </div>
              <div className='contact'>
                <h6>Contact <b className='bold'>{image.phone}</b>
                </h6>
                <FontAwesomeIcon icon={faWhatsapp} className='whats-app-icon' id='icn' onClick={()=>sendMessage(image)}/>
                <FontAwesomeIcon icon={faEnvelope} className='mail-icon' id='icn'/>
                <FontAwesomeIcon icon={faUser} className='user-icon' id='icn'/>
              </div>
            </div>
          </div>
        ))}
        </div>
          </div>
          <div className="display" id='resloved'>
            <center><h2>Already Resolved Items....!</h2></center>
            <div className='items'>
            {images
            .filter(image => image.status === "approved")
            .map((image) => (
              <div key={image._id} className="item-card">
                <img src={`http://localhost:5000/${image.imagePath}`} alt={image.place} />
                <div className='content'>
                  <p>Issued To <b className='bold'>{image.issued_to}</b></p>
                  <p>Updated At <b className='bold'>{moment(image.updatedAt).format('MMMM Do YYYY')}</b></p>
                  <p>Found Place <b className='bold'>{image.place}</b></p>
                  <div className='name'> 
                    <h5>Posted by <b className='bold'>{image.name}</b></h5> <small>({image.identity})</small>
                  </div>
                  <div className='name'>
                    <h5>Contact <b className='bold'>{image.phone}</b></h5>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      :
        <div>
          <div className="display">
        <center><h2>Find Your Lost Items Here....!</h2></center>
        <div className='items'>
        {images
        .filter(image => image.status === "pending")
        .map((image) => (
          <div key={image._id} className="item-card">
            <img src={`http://localhost:5000/${image.imagePath}`} alt={image.place} />
            <center><small className='item-name'>{image.itemName}</small></center>
            <div className='content'>
              <p>Found Place <b className='bold'>{image.place}</b></p>
              <div className='name'> 
              <h5>Posted by <b className='bold'>{image.name}</b></h5> <small>({image.identity})</small>
              </div>
              <div className='contact'>
                <h6>Contact <b className='bold'>{image.phone}</b>
                </h6>
                <FontAwesomeIcon icon={faWhatsapp} className='whats-app-icon' id='icn' onClick={()=>sendMessage(image)}/>
                <FontAwesomeIcon icon={faEnvelope} className='mail-icon' id='icn'/>
                <FontAwesomeIcon icon={faUser} className='user-icon' id='icn'/>
              </div>
            </div>
          </div>
        ))}
        </div>
          </div>
          <div className="display" id='resloved'>
            <center><h2>Already Resolved Items....!</h2></center>
            <div className='items'>
            {images
            .filter(image => image.status === "approved")
            .map((image) => (
              <div key={image._id} className="item-card">
                <div>
                <img src={`http://localhost:5000/${image.imagePath}`} alt={image.place} />
                </div>
                <div className='content'>
                  <small className='item-name'>{image.itemName}</small>
                  <p>Issued To <b className='bold'>{image.issued_to}</b></p>
                  <p>Updated At <b className='bold'>{moment(image.updatedAt).format('MMMM Do YYYY')}</b></p>
                </div>
                  <div className='content'> 
                  <p>Found Place <b className='bold'>{image.place}</b></p>
                    <p>Posted by <b className='bold'>{image.name}</b> <small>({image.identity})</small></p>
                  {/* </div>
                  <div className='name content'> */}
                    <p>Contact <b className='bold'>{image.phone}</b></p>
                  </div>
                  <div className='name contact' id='icon'>
                    <FontAwesomeIcon icon={faWhatsapp} className='whats-app-icon' id='icn' onClick={()=>sendMessage(image)}/>
                    <FontAwesomeIcon icon={faUser} className='user-icon' id='icn'/>
                  </div>
              </div>
            ))}
            </div>
          </div>
        </div>    
      }
    </div>
  )
}
export default  Home;