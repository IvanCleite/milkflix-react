/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";

// Criando o Contexto
const AuthContext = createContext();

// Provedor de Autenticação
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(()=>{
    // Tenta recuperar o usuário salvo
    return JSON.parse(sessionStorage.getItem("user")) || null;
  });

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      // Simulação de verificação de validade
      if (new Date().getTime() < parsedUser.expiration) {
        setUser(parsedUser);
      } else {
        sessionStorage.removeItem("user");
      }
    }
  }, []);

  const login = (userData) => {



       // ADICIONAR NO BANCO DE DADOSUSUÁRIO COM SENHA CRIPTOGRAFADA
       // VERIFICAR EMAIL E SENHA NO BANCO DE DADOS




    const expirationTime = new Date().getTime() + 60 * 60 * 1000; // 1 hora de validade
    const userWithExpiration = { ...userData, expiration: expirationTime };

    sessionStorage.setItem("user", JSON.stringify(userWithExpiration));
    setUser(userWithExpiration);
  };

  // Simulação de logout
  const logout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
