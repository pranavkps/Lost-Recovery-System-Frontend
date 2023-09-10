import axios from "axios";
import React,{useEffect, useState} from "react";
import moment from 'moment';
import './dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const Dashboard = ()=>{

  const userId = localStorage.getItem('userId');

  const [showModal, setShowModal] = useState(false);
  const [resolveText, setResolveText] = useState('');
  const [id,setid] = useState('');
  const [data,setData] = useState([]);
  const [user,setUserData] = useState([]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    setResolveText(e.target.value);
  };

  const del = async(image)=>{
    setid(image);
    const item = id.id;
    try{
      await axios.delete(`http://localhost:5000/delete-item/${item}`);
      alert("Your Post Deleted Successfully");
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    fetchImages();
    fetchDetails();
  },[]);
  const fetchImages = async ()=>{
    try {
      const response = await axios.get(`http://localhost:5000/get-items-by-user?email=${userId}`);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDetails = async ()=>{
    try {
      const response = await axios.get(`http://localhost:5000/getuser?email=${userId}`);
      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const resolve = (image)=>{
    console.log(image);
    setid(image);
    setShowModal(true);
  }

  const update = async()=>{

    try{
      await axios.patch(`http://localhost:5000/update-item`,{ id : id.id, name : resolveText});
      handleCloseModal();
    }
    catch(err){
      console.log(err);
    }
  }

  return(
    <div>
      <div className="user">
        <h1>
          {user.name}
        </h1>

      </div>
      <div className="display">
        <center><h2>Pending...!</h2></center>
        <div className='posted-items'>
          {data
          .filter(image => image.status === "pending")
          .map((image) => (
            <div key={image._id} className="item-card">
              <img src={`http://localhost:5000/${image.imagePath}`} alt={image.place} />
              <div>
                <small className='item-name'>{image.itemName} 
                  <FontAwesomeIcon icon={faTrash} id="icn" onClick={() => del(image)}/>
                </small> 
                <p>Found Place <b className='bold'>{image.place}</b></p>
                <p>Updated At <b className='bold'>{moment(image.updated_at).format('MMMM Do YYYY')}</b></p>
              </div>
              <button onClick={() => resolve(image)}>Resolve</button>
              {/* <button onClick={() => resolve(image)}>Delete</button> */}
            </div>
          ))}
        </div>
      </div>

      <div className="display" id="resolve">
        <center><h2>Resolved Items...!</h2></center>
        <div className='posted-items'>
          {data
          .filter(image => image.status === "approved")
          .map((image) => (
            <div key={image._id} className="item-card">
              <img src={`http://localhost:5000/${image.imagePath}`} alt={image.place} />
              <div>
                <small className='item-name'>{image.itemName} 
                  <FontAwesomeIcon icon={faEdit} onClick={() => resolve(image)} id="icn"/>
                  <FontAwesomeIcon icon={faTrash} id="icn" onClick={() => del(image)}/>
                </small>
                <p>Issued to <b className='bold'>{image.issued_to}</b></p>
                <p>Updated At <b className='bold'>{moment(image.updatedAt).format('MMMM Do YYYY')}</b></p>
                
                <p>Found Place <b className='bold'>{image.place}</b></p>
                <p>Created At <b className='bold'>{moment(image.createdAt).format('MMMM Do YYYY')}</b></p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Resolve Item</h5>
              <button type="button" className="close" onClick={handleCloseModal}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <h6>Name of the person you given ITEM to..?</h6>
              <input type="text" value={resolveText} onChange={handleInputChange} />
            </div>
            <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={update}>
                Submit
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={`modal-backdrop ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}></div>

    </div>
  )
};
export default Dashboard;
