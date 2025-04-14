/* eslint-disable no-unused-vars */
import { useState, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Container, Col, Row, Button, Form } from 'react-bootstrap';
import styles from './RegisterPage.module.css';
import { insertUser } from '../../services/api';
import { UserSaved, UserSaveError } from '../../components/Modals/UserModals';
import { formatCep, formatCpf, formatPhone } from '../../components/Formats';
import { addressSearch } from '../../components/AddressSearch';
import useModal from '../../hooks/useModal';
import useModalActions from '../../hooks/useModalActions';

const UserAdd = () => {
  const { showModal } = useModal();
  const { goToRoute, closeOnly } = useModalActions();
  const [formData, setFormData] = useState({
    name: '',
    birth: '',
    gender: '',
    cpf: '',
    email: '',
    phone: '',
    cep: '',
    number: '',
    complement: '',
    notes: '',
    password: '',
    role: '',
  });

  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [cepNotFound, setCepNotFound] = useState(false);
  const [selectedGender, setSelectedGender] = useState(false);
  const [selectedRole, setSelectedRole] = useState(false);
  const [addressOk, setAddressOk] = useState(false);
  const [fullAddress, setFullAddress] = useState({
    logradouro: '',
    localidade: '',
  });

  const unformat = (value) => value.replace(/\D/g, '');

  const handleChange = (e) => {
    let { name, value } = e.target;

    // Máscara no formato '12.425-002' somente para exibição no formulário
    if (name === 'cep') {
      const cep = unformat(value);
      if (cep.length === 8) {
        handleCepSearch(cep);
      } else {
        setAddressOk(false);
      }
      value = formatCep(value);
    }

    // Máscara no formato '868.542.332-14' somente para exibição no formulário
    if (name === 'cpf') value = formatCpf(value);

    // Máscara no formato '(12) 98655-4522' somente para exibição no formulário
    if (name === 'phone') value = formatPhone(value);

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    if (!formData.gender == '') setSelectedGender(true);
    if (!formData.role == '') setSelectedRole(true);
  }, [formData]);

  const handleCepSearch = async (cep) => {
    try {
      const resAddressSearch = await addressSearch(cep);
      if (resAddressSearch.erro) {
        showModal('CEP não encontrado', formatCep(cep), closeOnly());
        setFormData({ ...formData, cep: '' });
        setAddressOk(false);
        // setCepNotFound(true);
      } else {
        setFullAddress({
          logradouro: resAddressSearch.logradouro,
          localidade:
            resAddressSearch.bairro +
            ' - ' +
            resAddressSearch.localidade +
            ' - ' +
            resAddressSearch.uf,
        });
        setAddressOk(true);
      }
    } catch (error) {
      console.error('Erro ao buscar endereço:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    formData.cep = unformat(formData.cep);
    formData.cpf = unformat(formData.cpf);
    formData.phone = unformat(formData.phone);

    const response = await insertUser(formData);

    if (response.success) {
      setSaved(true);
    } else {
      setSaveError(true);
    }
  };

  return (
    <Container className={`${styles.container} mt-5`}>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col sm={8}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label className="mt-5 float-start ms-2 mb-0 fw-semibold text-black-75">
                Nome completo
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o nome completo"
                name="name"
                value={formData.name}
                onChange={handleChange}
                autoFocus
                required
              />
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group className="mb-3" controlId="birth">
              <Form.Label className="mt-5 float-start ms-2 mb-0 fw-semibold text-black-75">
                Data de nascimento
              </Form.Label>
              <Form.Control
                type="date"
                min="1940-01-01"
                max="2025-01-01"
                name="birth"
                value={formData.birth}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col sm={2}>
            <Form.Group className="mb-3" controlId="gender">
              <Form.Label className="mt-3 float-start ms-2 mb-0 fw-semibold text-black-75">
                Sexo
              </Form.Label>
              <Form.Select
                style={{
                  color: selectedGender ? 'black' : 'gray',
                  fontStyle: !selectedGender && 'italic',
                }}
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Selecione o sexo
                </option>
                <option value="F">F</option>
                <option value="M">M</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col sm={4}>
            <Form.Group className="mb-3" controlId="cpf">
              <Form.Label className="mt-3 float-start ms-2 mb-0 fw-semibold text-black-75">
                CPF
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Só números"
                name="cpf"
                value={formData.cpf}
                maxLength="14"
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col sm={6}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label className="mt-3 float-start ms-2 mb-0 fw-semibold text-black-75">
                E-mail
              </Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                maxLength="100"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col sm={8}>
            <Form.Group className="mb-3" controlId="phone">
              <Form.Label className="mt-3 float-start ms-2 mb-0 fw-semibold text-black-75">
                Telefone
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Só números"
                name="phone"
                value={formData.phone}
                maxLength="15"
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col sm={4}>
            <Form.Group className="mb-3" controlId="cep">
              <Form.Label className="mt-3 float-start ms-2 mb-0 fw-semibold text-black-75">
                CEP
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Só números"
                name="cep"
                value={formData.cep}
                maxLength="10"
                onChange={handleChange}
                required
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        {addressOk && (
          <>
            <Row>
              <Col sm={3} className="ms-auto text-md-end align-content-center">
                <span className="text-danger fw-bold fs-5 fst-italic">
                  Confira o endereço:
                </span>
              </Col>
              <Col sm={6}>
                <Row className="bg-primary bg-opacity-10 bg-gradient rounded-2 ms-auto me-0 shadow mb-2">
                  <Col className="text-end" sm={3}></Col>
                  <Col
                    className="text-primary fst-italic text-start ps-4"
                    sm={12}
                  >
                    <span>
                      {fullAddress.logradouro + ' '}
                      {formData.number}
                      {' ' + formData.complement}
                    </span>
                    <br />
                    <span>{fullAddress.localidade}</span>
                  </Col>
                </Row>
              </Col>
            </Row>
          </>
        )}

        <Row>
          <Col sm={6}>
            <Form.Group className="mb-3" controlId="number">
              <Form.Label className="mt-3 float-start ms-2 mb-0 fw-semibold text-black-75">
                Número
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Só números"
                name="number"
                value={formData.number}
                onChange={handleChange}
                maxLength="5"
                required
              />
            </Form.Group>
          </Col>

          <Col sm={6}>
            <Form.Group className="mb-3" controlId="complement">
              <Form.Label className="mt-3 float-start ms-2 mb-0 fw-semibold text-black-75">
                Complemento
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Casa, apartamento..."
                name="complement"
                value={formData.complement}
                onChange={handleChange}
                maxLength="20"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label className="mt-3 float-start ms-2 mb-0 fw-semibold text-black-75">
                Senha
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Digite uma senha provisória"
                name="password"
                minLength="1"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group className="mb-3" controlId="role">
              <Form.Label className="mt-3 float-start ms-2 mb-0 fw-semibold text-black-75">
                Credencial de acesso
              </Form.Label>
              <Form.Select
                style={{
                  color: selectedRole ? 'black' : 'gray',
                  fontStyle: !selectedRole && 'italic',
                }}
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Selecione a credencial de acesso
                </option>
                <option value="user">user</option>
                <option value="adm">adm</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Form.Group className="mb-3" controlId="notes">
            <Form.Label className="mt-3 float-start ms-2 mb-0 fw-semibold text-black-75">
              Observações
            </Form.Label>
            <Form.Control
              as="textarea"
              type="notes"
              placeholder="Até 255 caracteres"
              maxLength="255"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mt-5">
          <Col sm={6}>
            <Button variant="outline-primary" type="submit" className="w-100">
              Adicionar
            </Button>
          </Col>

          <Col sm={6}>
            {goToRoute('/home', 'Voltar para o inícioar', 'outline-primary')}
          </Col>
        </Row>
      </Form>
      <UserSaved show={saved} handleClose={() => setSaved(false)} />
      <UserSaveError show={saveError} handleClose={() => setSaveError(false)} />
    </Container>
  );
};

export default UserAdd;
