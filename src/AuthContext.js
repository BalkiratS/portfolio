import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('jwtToken') || null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('jwtToken')
  );

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('jwtToken', newToken);
    setIsAuthenticated(true)
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('jwtToken');
    setIsAuthenticated(false)
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
