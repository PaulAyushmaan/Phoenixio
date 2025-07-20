import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const userRole = localStorage.getItem('role');
    if (token) {
      setIsLoggedIn(true);
      setRole(userRole);
    }
  }, []);

  const login = (role) => {
    setIsLoggedIn(true);
    setRole(role);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setRole(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
