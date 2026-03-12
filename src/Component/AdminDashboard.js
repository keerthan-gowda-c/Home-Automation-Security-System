import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'

export default function AdminDashboard() {
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Home Automation Security</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to='/AdminDashboard/Approveusers'>Approve Users</Nav.Link>
            <Nav.Link as={Link} to='/AdminDashboard/Viewlogs'>View Logs</Nav.Link>
            <Nav.Link as={Link} to='/'>Logout</Nav.Link>

          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  )
}
