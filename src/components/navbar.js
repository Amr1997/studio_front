import React from 'react';
import { Navbar, Nav, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function CustomNavbar() {
  const { user, isAuthenticated } = useSelector(state => state.auth);

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/" style={{ fontWeight: 'bold', color: 'blue' }}>TDS</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {isAuthenticated && user.user_type === 'studio_owner' && <Nav.Link as={Link} to="/profile">Profile</Nav.Link>}
        </Nav>
        {isAuthenticated && (
          <Nav>
            <Nav.Link>{user.name}</Nav.Link>
            <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
          </Nav>
        )}
        {!isAuthenticated && (
          <Nav>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/register">Register</Nav.Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNavbar;
