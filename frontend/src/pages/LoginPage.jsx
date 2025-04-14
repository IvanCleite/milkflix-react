import { useState } from 'react';
import { AlertTriangle } from 'react-feather'
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import useAuth from '../hooks/useAuth.jsx';
import { useNavigate, Link } from 'react-router-dom';
import useModal from '../hooks/useModal';
import useModalActions from '../hooks/useModalActions.jsx';

const Login = () => {
  const navigate = useNavigate();
  const { showModal } = useModal();
  const { closeOnly } = useModalActions();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isFormValid = email.trim() !== '' && password.trim() !== '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    console.log('result no Login: ', result);
    // let modalBody = '';
    if (result.success) {
      navigate('/home');
    } else {
      const modalBody = () =>
        result.message === 'E-mail não encontrado'
          ? 'Confira ou contate o administrador'
          : 'Confira ou clique em "Esqueci minha senha"';

      showModal(result.message || 'Erro', modalBody, closeOnly(), {
        size: 'md',
        centered: false,
        icon: <AlertTriangle color="red" />,
        keyboard: true,
        backdrop: true,
      });
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col>
          <Card className="p-4 shadow-lg">
            <Card.Body>
              <h3 className="text-center text-primary fw-bold mb-4">Login</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Digite seu email"
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="passwordLogin">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Digite sua senha"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={!isFormValid}
                  className="w-100"
                >
                  Entrar
                </Button>
                <Link
                  to="/forgot-password"
                  className="mt-3 d-block text-center"
                >
                  Esqueci minha senha senha
                </Link>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
