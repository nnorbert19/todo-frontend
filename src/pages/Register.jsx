import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Alert, Card } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

function Register() {
  const { register, loading } = useAuth();
  const [error, setError] = useState(null);
  const registerUsernameRef = useRef();
  const registerEmailRef = useRef();
  const registerPasswordRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({
        email: registerEmailRef.current.value,
        username: registerUsernameRef.current.value,
        password: registerPasswordRef.current.value,
      });
      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <Card style={{ width: "25rem" }}>
      <Card.Header className="d-flex flex-column justify-content-center align-items-center">
        <h2 className="title">Regisztráció</h2>
      </Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group id="username" className="mt-3">
            <Form.Label>Felhasználónév</Form.Label>
            <Form.Control
              type="text"
              ref={registerUsernameRef}
              placeholder="Felhasználónév"
              required
            />
          </Form.Group>
          <Form.Group id="email" className="mt-3">
            <Form.Label>E-mail cím</Form.Label>
            <Form.Control
              type="email"
              ref={registerEmailRef}
              placeholder="E-mail cím"
              required
            />
          </Form.Group>
          <Form.Group id="password" className="mt-2">
            <Form.Label>Jelszó</Form.Label>
            <Form.Control
              type="password"
              ref={registerPasswordRef}
              placeholder="Jelszó"
              required
            />
          </Form.Group>
          <Button disabled={loading} className="w-100 mt-2 " type="submit">
            Regisztráció
          </Button>
        </Form>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-center align-items-center">
        <div className="m-2 ">
          már van fiókja?
          <Link className="m-1" to="/login">
            Belépés
          </Link>
        </div>
      </Card.Footer>
    </Card>
  );
}

export default Register;
