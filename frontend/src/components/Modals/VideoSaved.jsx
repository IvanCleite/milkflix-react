/* eslint-disable react/prop-types */
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function VideoSaved({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" centered>
      <Modal.Body >
        <p className="text-center fs-3">Vídeo adicionado com sucesso!</p>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-around">
        <Button href="/" variant="secondary" onClick={handleClose}>
          Voltar para o início
        </Button>
        <Button href="/videoadd" variant="primary">
          Adicionar outro
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default VideoSaved;
