import { useContext } from 'react';
import AuthContext from '../contexts/authContext';

// Hook customizado para facilitar o uso do contexto
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
