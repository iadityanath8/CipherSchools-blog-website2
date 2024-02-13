// AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import api from '../axiosapu/api.js'
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username,password) => {
    try {
        const response = await api.post('/login',{username,password});
        setUser(response.data.token);
        localStorage.setItem('token',response.data.token);
        localStorage.setItem('isAuthenticated',true)
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const signup = async (username, email,password) => {
    try {
      const response = await api.post('/register', { username,email, password });
      console.log(response)
      setUser(username);
    } catch (err) {
      console.error('Signup error:', err);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, signup,login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
