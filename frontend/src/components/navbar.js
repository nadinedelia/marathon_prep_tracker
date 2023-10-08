import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const NavbarComponent = ({ onNavigate }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#">CFG Fitness App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link onClick={() => onNavigate('TrackExercise')}>Track New Exercise</Nav.Link>
          <Nav.Link onClick={() => onNavigate('Statistics')}>Statistics</Nav.Link>
          <Nav.Link onClick={() => onNavigate('GoalSetting')}>Goal Setting</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
