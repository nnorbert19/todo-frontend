import React, { useState } from "react";
import "./NavbarComponent.css";
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  Offcanvas,
  Container,
  CloseButton,
  Button,
} from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";

function NavbarComponent() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  function LogoutButton() {
    return (
      <div className="d-flex align-items-center">
        <div className="px-3">{currentUser.username}</div>
        <Button
          onClick={() => {
            handleLogout();
          }}
        >
          Kijelentkezés
        </Button>
      </div>
    );
  }

  const handleClose = () => setMenuOpen(false);
  return (
    <Navbar
      collapseOnSelect="true"
      expand="md"
      className="w-100 lg Header sticky-top"
      id="navbar"
    >
      <Container className="container" fluid>
        <Navbar.Brand className="px-2">Todo</Navbar.Brand>
        <Navbar.Toggle
          aria-controls={`offcanvasNavbar-expand-md`}
          onClick={toggleMenu}
        />
        <Navbar.Offcanvas
          responsive="md"
          className="offcanvas-md"
          id={`offcanvasNavbar-expand-md `}
          aria-labelledby={`offcanvasNavbarLabel-expand-md`}
          placement="end"
          restoreFocus={false}
          show={menuOpen}
          onHide={handleClose}
        >
          <Offcanvas.Header>
            <CloseButton variant="white" onClick={handleClose} />
          </Offcanvas.Header>
          <Offcanvas.Body className="flex-row-reverse">
            {currentUser !== null ? <LogoutButton /> : ""}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
