import { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import useAuth from "../../hooks/useAuth.jsx"; // Importa o contexto

const Login = () => {
  const { login } = useAuth();

  const [credentials, setCredentials] = useState({ username: "", password: "" });

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    login({ username: credentials.username, password: credentials.password, expiration: new Date().getTime() + 60 * 60 * 1000 });

      // const userData = email; // Apenas email para simular login
      // login(userData); // Salva no contexto

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
                    onChange={(e) =>  setCredentials({ ...credentials, username: e.target.value })}
                    autoFocus
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Digite sua senha"
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
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
