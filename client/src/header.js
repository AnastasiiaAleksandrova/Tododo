import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';

function Header(props) {
    return (
    <Navbar bg="light" expand="sm" sticky="top">
        <Navbar.Brand href="#home">Tododo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
                <Card.Link href="#"><i className="fas fa-plus"></i> Add a new item</Card.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
    );
  }

  export default Header;