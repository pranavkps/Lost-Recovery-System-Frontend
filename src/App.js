import React from 'react';
import {HashRouter as Router} from 'react-router-dom';
import { Routes , Route } from 'react-router-dom';
import NavBar from './components/navbar';
import Login from './components/login';
import SignUp from './components/signup';
import Home from './components/home';
import ImageGallery from './components/upload';
import Dashboard from './components/dashboard';

const App = () => (
  <div>
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/upload" element={<ImageGallery/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </Router>,
  </div>
)

export default App;
