/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react';
import { loginUser, logoutUser, getStoredUser } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser());

  const login = async (email, password) => {
    const result = await loginUser(email, password);
    console.log('result no authContext: ', result);
    if (!result.success) {
      return result;
    }
    console.log('result.user no authContext: ', result.user)
    setUser(result.user);
    return result;
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  useEffect(() => {
    const currentUser = getStoredUser();
    if (currentUser) setUser(currentUser);
  }, []);

  return (
    <>
      <AuthContext.Provider
        value={{
          user,
          login,
          logout,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthContext;
