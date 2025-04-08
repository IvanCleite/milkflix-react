/* eslint-disable react/prop-types */
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function CepNotFound({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" centered>
      <Modal.Body>
        <p className="text-center fs-3">CEP não encontrado!</p>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-around">
        <Button onClick={handleClose} variant="primary">
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CepNotFound;
