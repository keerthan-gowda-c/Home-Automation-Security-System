import React from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      {/* Top Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>Home Automation Security</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/Login">Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Main Hero Section */}
      <div style={{
        height: '90vh',
        background: '#f8f9fa',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '2rem'
      }}>
        <h1 className="mb-3">Welcome to Home Automation Security System</h1>
        <p className="mb-4" style={{ maxWidth: '600px' }}>
          Manage and monitor your smart home devices securely and efficiently.
        </p>
       
      </div>
    </div>
  );
}
