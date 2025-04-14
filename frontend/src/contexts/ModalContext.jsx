/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';
import DefaultModal from '../components/Modals/DefaultModal';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalShow, setModalShow] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBody, setModalBody] = useState('');
  const [modalActions, setModalActions] = useState(null);
  const [modalOptions, setModalOptions] = useState({});

  const showModal = (title, body, actions = null, options = {}) => {
    setModalTitle(title);
    setModalBody(body);
    setModalActions(actions);
    setModalOptions(options);
    setModalShow(true);
  };

  const hideModal = () => {
    setModalShow(false);
    setModalActions(null)
  };

  return (
    <ModalContext.Provider
      value={{
        showModal,
        hideModal,
      }}
    >
      {children}
      <DefaultModal
        show={modalShow}
        handleClose={hideModal}
        modalTitle={modalTitle}
        modalBody={modalBody}
        actions={modalActions}
        {...modalOptions}
      />
    </ModalContext.Provider>
  );
};

export default ModalContext;
