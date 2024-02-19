import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './navbar.css';

const NavbarComponent = ({ onLogout }) => {
  const navigate = useNavigate();

  const onNavigate = (route) => {
    console.log('Navigating to:', route);
    switch (route) {
      case 'Activity':
        navigate('/createActivity');
        break;
      case 'Statistics':
        navigate('/statistics');
        break;
      case 'Journal':
        navigate('/journal');
        break;
      default:
        console.error('Invalid route:', route);
    }
  };

  return (
    <Navbar className="nav-back custom-navbar" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="justify-content-center" style={{ width: "100%" }}>
          <Nav.Link className="custom-nav-link" onClick={() => onNavigate('Activity')}>Add Activity</Nav.Link>
          <Nav.Link className="custom-nav-link" onClick={() => onNavigate('Statistics')}>Statistics</Nav.Link>
          <Nav.Link className="custom-nav-link" onClick={() => onNavigate('Journal')}>Journal</Nav.Link>
          <Nav.Link className="custom-nav-link" onClick={onLogout}>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;