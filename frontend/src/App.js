import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TextField, Button, Typography, Grid, Container, Paper } from '@mui/material';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './components/navbar';
import Activity from './components/createActivity';
import Statistics from './components/statistics';
import Footer from './components/footer';
import Login from './components/login';
import Signup from './components/signup';
import Journal from './components/journal';
import logo from './img/logo.png';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      let marathonDate = new Date(now.getFullYear(), 3, 21); // April is the 4th month, 0 indexed

      if (now > marathonDate) {
        marathonDate = new Date(now.getFullYear() + 1, 3, 21);
      }

      const delta = marathonDate - now;
      const weeks = Math.floor(delta / (1000 * 60 * 60 * 24 * 7));
      const days = Math.floor((delta / (1000 * 60 * 60 * 24)) % 7);

      setCountdown(`${weeks} weeks and ${days} days`);
    };

    const countdownInterval = setInterval(calculateCountdown, 1000); // Update every second

    calculateCountdown(); // Initial calculation

    return () => clearInterval(countdownInterval);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser('');
  };

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setCurrentUser(username);
  };

  return (
    <div className="App">
      <Router>
        <div className="appTitle">
          <h3>Countdown to Marathon:</h3>
          <h4>{countdown} left</h4>
          <br></br>
          <img src={logo} alt="Marathon Prep Logo" id="appLogo" />
        </div>
        {isLoggedIn && <NavbarComponent onLogout={handleLogout} />}

        <div className="componentContainer">
          <Routes>
            <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
            <Route path="/signup" element={isLoggedIn ? <Navigate to="/" /> : <Signup onSignup={handleLogin} />} />
            <Route path="/createActivity" element={isLoggedIn ? <Activity currentUser={currentUser} /> : <Navigate to="/login" />} />
            <Route path="/statistics" element={isLoggedIn ? <Statistics currentUser={currentUser} /> : <Navigate to="/login" />} />
            <Route path="/journal" element={isLoggedIn ? <Journal currentUser={currentUser} /> : <Navigate to="/login" />} />
            <Route path="/" element={isLoggedIn ? <Navigate to="/createActivity" /> : <Navigate to="/login" />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
