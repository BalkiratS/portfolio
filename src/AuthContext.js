import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('jwtToken') || null);

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('jwtToken', newToken);
    localStorage.setItem('isLoggedIn', "true")
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('jwtToken');
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
