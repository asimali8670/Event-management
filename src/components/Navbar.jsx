
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: #2c3e50;
  padding: 15px 30px;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
`;

const NavLink = styled.li`
  margin: 0 15px;
  font-size: 18px;
  color: white;
  
  &:hover {
    color: #f39c12;
    cursor: pointer;
  }
`;

const Navbar = ({ onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Nav>
      <NavContainer>
        <Link to="/" className="navbar-brand" style={{ color: 'white', textDecoration: 'none', fontSize: '25px' }}>
          Event Manager
        </Link>
        <div
          className="navbar-menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>
        <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
          <NavLinks>
            <NavLink>
              <Link to="/home" style={{ color: 'white', textDecoration: 'none' }}>
                Home
              </Link>
            </NavLink>
            <NavLink>
              <Link to="/events" style={{ color: 'white', textDecoration: 'none' }}>
                Events
              </Link>
            </NavLink>
            <NavLink>
              <Link to="/create-edit-event" style={{ color: 'white', textDecoration: 'none' }}>
                Create/Edit Event
              </Link>
            </NavLink>
            <NavLink>
              <Link to="/user-profile" style={{ color: 'white', textDecoration: 'none' }}>
                User Profile
              </Link>
            </NavLink>
            <NavLink>
              <button
                className="logout-button"
                onClick={onLogout}
                style={{
                  backgroundColor: '#f39c12',
                  color: 'white',
                  border: 'none',
                  padding: '8px 15px',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Logout
              </button>
            </NavLink>
          </NavLinks>
        </div>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;

