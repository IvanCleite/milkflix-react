/* eslint-disable react/prop-types */
import Modal from 'react-bootstrap/Modal';

function DefaultModal({
  show,
  handleClose,
  modalTitle,
  modalBody,
  actions,
  size = 'md',
  centered = true,
  backdrop = 'static',
  keyboard = false,
  icon = null,
}) {
  console.log('Options: ', size, centered, backdrop, keyboard, icon);
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size={size}
      centered={centered}
      backdrop={backdrop}
      keyboard={keyboard}
    >
      <Modal.Header>
        <p className="m-0 w-100 text-center fs-3">
          {icon && <span className="me-4 fs-2">{icon}</span>}
          {modalTitle}
        </p>
      </Modal.Header>
      <Modal.Body>
        <p className="m-0 text-center fs-5">{modalBody}</p>
      </Modal.Body>
      {actions && (
        <Modal.Footer
          className={`d-flex ${
            actions ? 'justify-content-around' : 'justify-content-end'
          }`}
        >
          {actions}
        </Modal.Footer>
      )}
    </Modal>
  );
}

export default DefaultModal;
