import React, { useContext } from "react";
import { UserContext } from "../App";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  const { userData, setUserData } = useContext(UserContext);

  const logOut = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };

  return (
    <div>
      
      <Navbar bg="light" expand="lg">
        <Container>
          <img src="favicon.jpg" alt="123"  ></img>
           <LinkContainer to="/">
            <Navbar.Brand>  PERFORMANCE BOND </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <LinkContainer to="/contractorlist">
                <Nav.Link>Contractors</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/addcontract">
                <Nav.Link>Add New</Nav.Link>
              </LinkContainer>
            </Nav>
            {userData.user ? (
              <Nav className="ml-auto">
                <LinkContainer to="/profile">
                  <Nav.Link>Profile ({userData.user.name})</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link onClick={logOut}>Log Out</Nav.Link>
                </LinkContainer>
              </Nav>
            ) : (
              <Nav className="ml-auto">
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link>Log In</Nav.Link>
                </LinkContainer>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
