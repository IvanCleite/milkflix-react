/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import useAuth from "../../hooks/useAuth.jsx";

const Login = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", passwordLogin: "" });

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      await login(form)
    } catch (error) {
      alert('Email e/ou senha inválidos')
    }

  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col>
          <Card className="p-4 shadow-lg">
            <Card.Body>
              <h3 className="text-center mb-4">Login</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Digite seu email"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    autoFocus
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="passwordLogin">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Digite sua senha"
                    onChange={(e) => setForm({ ...form, passwordLogin: e.target.value })}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100" >
                  Entrar
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
