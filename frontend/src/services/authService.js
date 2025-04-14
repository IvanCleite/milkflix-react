import { checkLogin } from './api.js';
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: { "Content-Type": "application/json" }
})

export const loginUser = async (email, password) => {
  const response = await checkLogin(email, password);

  if (!response.success) {
    return { success: false, message: response.message };
  }

  const expirationTime = new Date().getTime() + 60 * 60 * 3000; // 3h
  const userWithExpiration = {
    email: email,
    role: response.role,
    expiration: expirationTime,
  };

  sessionStorage.setItem('user', JSON.stringify(userWithExpiration));
  return { success: true, user: userWithExpiration };
};

export const logoutUser = () => {
  sessionStorage.removeItem('user');
};

export const getStoredUser = () => {
  const storedUser = sessionStorage.getItem('user');
  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
    if (new Date().getTime() < parsedUser.expiration) {
      return parsedUser;
    } else {
      logoutUser();
    }
  }
  return null;
};

export const sendRecoveryEmail = async (email) => {
  try {
    console.log('email no authService: ', email)
    const response = await api.post('/forgot-password', { email });
    console.log('response no authService: ', response.data.message)
    return { success: true, message: response.data.message };
  } catch (error) {
    console.log('dentro do cacth')
    const msg = error.response?.data?.message || 'Erro ao enviar e-mail.';
    return { success: false, message: msg };
  }
};


