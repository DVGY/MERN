import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
const NavBar = ({ isUserAuthenticated }) => {
  return (
    <Navbar bg="dark" variant="dark">
      {/*Replace with logo */}
      <Navbar.Brand href="#home">
        <h4>Jolly</h4>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          {(isUserAuthenticated && (
            <Nav.Link as={Link} to="/login">
              <h4>Logout</h4>
            </Nav.Link>
          )) || (
            <Nav.Link as={Link} to="/login">
              <h4>Login</h4>
            </Nav.Link>
          )}
          <Nav.Link as={Link} to="/signup">
            <h4>Sign Up</h4>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
const mapStateToProps = (state) => ({
  isUserAuthenticated: state.auth.isUserAuthenticated,
});
export default connect(mapStateToProps)(NavBar);
