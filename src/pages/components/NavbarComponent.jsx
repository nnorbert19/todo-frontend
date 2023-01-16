import React, { useState } from "react";
import { Navbar, Offcanvas, Container, CloseButton } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";

function NavbarComponent() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();

  const handleLogout = (async) => {
    try {
      logout();
      navigate("/");
    } catch (error) {
      console.log(error.response);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  function authenticationButtons() {
    return <button></button>;
  }

  function LogoutButton() {
    return (
      <button
        onClick={() => {
          handleLogout();
        }}
      ></button>
    );
  }

  const handleClose = () => setMenuOpen(false);
  return (
    <Navbar
      collapseOnSelect="true"
      expand="md"
      className="w-100 lg Header sticky-top"
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
            {currentUser !== null ? <LogoutButton /> : "valami"}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
