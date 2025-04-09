/* eslint-disable react/prop-types */
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function LoginInvalid({ show, handleClose, message }) {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header>
        <p className="w-100 text-center fs-3">{message}</p>
      </Modal.Header>
      <Modal.Body>
        <p className="text-center fs-5">Confira ou entre em contato com o administrador</p>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-around">
        <Button href="/login" variant="secondary" onClick={handleClose}>
          Voltar para login
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LoginInvalid;
