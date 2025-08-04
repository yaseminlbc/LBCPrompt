// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import api from '../api/api';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({
  token: null,
  user: null,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      localStorage.removeItem('token');
      delete api.defaults.headers.common.Authorization;
    }
  }, [token]);

  
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  
  const login = async (email, password) => {
  try {
    const { data } = await api.post('/Auth/login', { email, password });
    setToken(data.token);
    setUser(data.user || null); 
    return { success: true };
  } catch (err) {
    let message = "Login failed.";
    if (err.response && err.response.data && err.response.data.message)
      message = err.response.data.message;
    else if (err.message)
      message = err.message;
    return { success: false, message };
  }
};


  
  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: Boolean(token),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
