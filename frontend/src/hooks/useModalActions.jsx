import { useNavigate } from 'react-router-dom';
import useModal from './useModal';

const useModalActions = () => {
  const { hideModal } = useModal();
  const navigate = useNavigate();

  const goToLogin = (
    label = 'Voltar para login',
    variant = 'primary'
  ) => (
    <button
      className={`btn btn-${variant}`}
      onClick={() => {
        hideModal();
        navigate('/');
      }}
    >
      {label}
    </button>
  );

  const goToRoute = (route, label = 'Ir', variant = 'primary') => (
    <button
      className={`w-100 btn btn-${variant}`}
      onClick={() => {
        hideModal();
        navigate(route);
      }}
    >
      {label}
    </button>
  );

  const closeOnly = (label = 'Fechar', variant = 'secondary') => (
    <button className={`btn btn-${variant}`} onClick={hideModal}>
      {label}
    </button>
  );

  return {
    goToLogin,
    goToRoute,
    closeOnly,
  };
};

export default useModalActions;
