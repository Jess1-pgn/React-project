import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const userData = await authService.login(username, password);
      // userData contains: token, type, id, username, email, role
      setUser(userData);
      return { success: true, user: userData };
    } catch (error) {
      console.error('Login error full response:', error.response?.data);
      console.error('Validation errors:', error.response?.data?.errors);
      console.error('Status:', error.response?.status);
      return { 
        success: false, 
        message: error.response?.data?.message || error.response?.data || 'Erreur de connexion' 
      };
    }
  };

  const register = async (username, email, password, firstName, lastName, role = 'USER') => {
    try {
      const userData = await authService.register(username, email, password, firstName, lastName, role);
      return { success: true, data: userData };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Erreur lors de l\'inscription' 
      };
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    role: user?.role,
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};