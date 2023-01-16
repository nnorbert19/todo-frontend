import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Alert, Card } from "react-bootstrap";

function Login() {
  const { login, loading, handleError } = useAuth();
  const [error, setError] = useState(null);
  const loginUsernameRef = useRef();
  const loginPasswordRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({
        username: loginUsernameRef.current.value,
        password: loginPasswordRef.current.value,
      });
      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <Card style={{ width: "25rem" }}>
      <Card.Header className="d-flex flex-column justify-content-center align-items-center">
        <h2 className="title">Bejelentkezés</h2>
      </Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group id="username" className="mt-3">
            <Form.Label>Felhasználónév</Form.Label>
            <Form.Control
              type="text"
              ref={loginUsernameRef}
              placeholder="Felhasználónév"
              required
            />
          </Form.Group>
          <Form.Group id="password" className="mt-2">
            <Form.Label>Jelszó</Form.Label>
            <Form.Control
              type="password"
              ref={loginPasswordRef}
              placeholder="Jelszó"
              required
            />
          </Form.Group>
          <Button disabled={loading} className="w-100 mt-2 " type="submit">
            Bejelentkezés
          </Button>
        </Form>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-center align-items-center">
        <div className="m-2 ">
          Még nincs fiókja?
          <Link className="m-1" to="/register">
            Regisztráció
          </Link>
        </div>
      </Card.Footer>
    </Card>
  );
}

export default Login;
