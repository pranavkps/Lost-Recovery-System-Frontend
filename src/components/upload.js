import React, { useState } from 'react';
import axios from 'axios';
import './upload.css'

const ImageGallery = () => {

  const email = localStorage.getItem('userId');
  const [place, setPlace] = useState('');
  const [itemName, setItemName] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const [success,setsucess] = useState('');
  const [error,setError] = useState('');

  const handleFileChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  setTimeout(()=>{
    setsucess('');
    setError('');
  },5000)

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('place', place);
    formData.append('email', email);
    formData.append('itemName',itemName);

    try {
      console.log(formData);
      await axios.post(`http://localhost:5000/upload-item`, formData);
      setPlace('');
      setItemName('');
      setImageFile(null);
      setsucess('Your Image Has Been Successfully Uploaded');
    } catch (error) {
      console.error(error);
      setError('Your Image Havent Uploadede');
    }
  };

  return (
    <div className='upload'>
      <center><h2>Image Gallery</h2></center>

      <form onSubmit={handleSubmit} >
      <div className='mb-3'>
        <input
          type="text"
          className='form-control'
          id="email"
          name="email"
          placeholder="Item Name" 
          value={itemName} 
          onChange={(e) => setItemName(e.target.value)} 
          required
        />
      </div>
      <div className='mb-3'>
        <input 
          type="text" 
          className='form-control'
          placeholder="Place Where You Found" 
          value={place} 
          onChange={(e) => setPlace(e.target.value)} 
          required 
        />
      </div>
      <div className='mb-3'>
        <input 
          type="file" 
          className='form-control'
          onChange={handleFileChange} 
          required 
          />
      </div>
      <div className='mb-3' id='sub'>
        <button type="submit" className='btn'>Submit</button>
      </div>
    </form>
    {error && <div><p className='error'>{error}</p></div>}
    {success && <div><p className='success'>{success}</p></div>}
    </div>
  );
};

export default ImageGallery;
