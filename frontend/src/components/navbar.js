import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const NavbarComponent = ({ onNavigate }) => {
  return (
    <Navbar className="nav-back" expand="lg">
      {/* <Navbar.Brand href="#">CFG Fitness App</Navbar.Brand> */}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        <Nav>
      <Nav.Link className="custom-nav-link" onClick={() => onNavigate('TrackExercise')}>Track New Exercise</Nav.Link>
      <Nav.Link className="custom-nav-link" onClick={() => onNavigate('Statistics')}>Statistics</Nav.Link>
      <Nav.Link className="custom-nav-link" onClick={() => onNavigate('GoalSetting')}>Goal Setting</Nav.Link>
        </Nav>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
