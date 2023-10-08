import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import CreateUser from './components/createUser';
import TrackExercise from './components/trackExercise';
import React, { useState, useEffect } from 'react';
import Footer from './components/footer';
// import Login from './components/login'; 
import NavbarComponent from './components/navbar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [activeWindow, setActiveWindow] = useState('TrackExercise'); 

  const handleNavigation = (window) => {
    setActiveWindow(window);
  };

  // if (!isLoggedIn) {
  //   return <Login onLogin={() => setIsLoggedIn(true)} />;
  // }

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">CFG Fitness App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => handleNavigation('TrackExercise')}>Track New Exercise</Nav.Link>
              <Nav.Link onClick={() => handleNavigation('Statistics')}>Statistics</Nav.Link>
              <Nav.Link onClick={() => handleNavigation('GoalSetting')}>Goal Setting</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="componentContainer">
        {activeWindow === 'TrackExercise' && <TrackExercise />}
        {/* {activeWindow === 'Statistics' && <Statistics />}
        {activeWindow === 'GoalSetting' && <GoalSetting />} */}
      </div>
      <Footer />
    </div>
  );
}

export default App;
