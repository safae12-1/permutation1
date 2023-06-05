import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentEmail, setCurrentEmail] = useState(null)

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const insertCurrentEmail = (email) => {
    setCurrentEmail(email);
  };

  const freeCurrentEmail = () => {
    setCurrentEmail(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, insertCurrentEmail, freeCurrentEmail, currentEmail }}>
      {children}
    </AuthContext.Provider>
  );
};
