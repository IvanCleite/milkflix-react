import { useState, useEffect } from 'react';
import { AlertTriangle } from 'react-feather'
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { sendRecoveryEmail } from '../services/authService';
import useModal from '../hooks/useModal';
import useModalActions from '../hooks/useModalActions';

const ForgotPassword = () => {
  // const navigate = useNavigate();
  const { showModal } = useModal();
  const { goToLogin, closeOnly } = useModalActions();
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await sendRecoveryEmail(email);
    console.log('result no Forgot: ', result.success);
    let modalBody = '';
    let modalActions = null;
    if (result.success) {
      modalBody = 'Acesse o link no e-mail que enviamos e redefina sua senha';
      modalActions = 'Voltar para login';
    } else {
      modalBody = 'Confira ou contate o administrador';
    }
    showModal(
      result.message || 'Erro',
      modalBody,
      modalActions ? goToLogin() : closeOnly('Fechar', 'danger'),
      {
        size: 'md',
        centered: false,
        icon: !modalActions ? <AlertTriangle color="red" /> : null,
        keyboard: true,
        backdrop: true,
      }
    );
  };

  useEffect(() => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(regex.test(email));
  }, [email]);

  return (
    <Container
      style={{ maxWidth: '400px' }}
      className="d-flex justify-content-center align-items-center vh-100"
    >
      <Card className="p-4 shadow-lg">
        <h3 className="text-start text-primary fw-bold mb-4">
          Recuperar Senha
        </h3>

        <h6 className="text-start mb-3 fw-light">
          Enviaremos um e-mail com um link para você redefinir sua senha
        </h6>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3 mt-2" controlId="email">
            <Form.Control
              className="mb-4"
              type="email"
              placeholder="Insira seu e-mail cadastrado"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Row>
            <Col>
              <Button
                type="submit"
                disabled={!isValid}
                variant="primary"
                className="w-100 text-tertiary"
              >
                Enviar link
              </Button>
            </Col>
            <Col>
              <Link to="/" className="d-block text-center btn btn-primary">
                Voltar para login
              </Link>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
};

export default ForgotPassword;
