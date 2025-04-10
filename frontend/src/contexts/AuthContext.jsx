/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react';
import { checkLogin } from '../services/api';
import LoginInvalid from '../components/Modals/LoginInvalid';

// Criando o Contexto
const AuthContext = createContext();

// Provedor de Autenticação
export const AuthProvider = ({ children }) => {
  const [loginError, setLoginError] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [user, setUser] = useState(() => {
    // Tenta recuperar o usuário salvo
    return JSON.parse(sessionStorage.getItem('user')) || null;
  });

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      // Simulação de verificação de validade
      if (new Date().getTime() < parsedUser.expiration) {
        setUser(parsedUser);
      } else {
        sessionStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (userDataLogin) => {
    const response = await checkLogin(userDataLogin);

    if (!response.success) {
      // alert(response.message);
      setMessageError(response.message);
      setLoginError(true);
      return;
    }

    userDataLogin = { ...userDataLogin, credential: response };
    const expirationTime = new Date().getTime() + 60 * 60 * 3000; // 3 hora de validade
    const userWithExpiration = {
      email: userDataLogin.email,
      role: response.role,
      expiration: expirationTime,
    };
    sessionStorage.setItem('user', JSON.stringify(userWithExpiration));
    setUser(userWithExpiration);
  };

  // Simulação de logout
  const logout = () => {
    sessionStorage.removeItem('user');
    setUser(null);
  };

  return (
    <>
      <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider>
      <LoginInvalid
        show={loginError}
        handleClose={() => setLoginError(false)}
        message={messageError}
      />
    </>
  );
};

export default AuthContext;
