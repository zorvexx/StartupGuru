import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedSession = localStorage.getItem('startupguru_session');
    return savedSession ? JSON.parse(savedSession) : null;
  });

  const getUsers = () => JSON.parse(localStorage.getItem('startupguru_users') || '[]');
  const saveUsers = (users) => localStorage.setItem('startupguru_users', JSON.stringify(users));

  const login = (email, password) => {
    const users = getUsers();
    const foundUser = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (foundUser) {
      const sessionUser = { name: foundUser.name, email: foundUser.email };
      setUser(sessionUser);
      localStorage.setItem('startupguru_session', JSON.stringify(sessionUser));
      return { success: true };
    }

    if (email.toLowerCase() === 'demo@startupguru.com' && password === 'password123') {
      const demoUser = { name: 'Demo Founder', email: 'demo@startupguru.com' };
      setUser(demoUser);
      localStorage.setItem('startupguru_session', JSON.stringify(demoUser));
      return { success: true };
    }

    return { success: false, message: 'Invalid email or password.' };
  };

  const register = (name, email, password) => {
    const users = getUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    const newUser = { name, email, password };
    users.push(newUser);
    saveUsers(users);

    const sessionUser = { name, email };
    setUser(sessionUser);
    localStorage.setItem('startupguru_session', JSON.stringify(sessionUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('startupguru_session');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
