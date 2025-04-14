import { useContext } from 'react';
import ModalContext from '../contexts/ModalContext';

// Hook customizado para facilitar o uso do contexto
const useModal = () => {
  return useContext(ModalContext);
};

export default useModal;
