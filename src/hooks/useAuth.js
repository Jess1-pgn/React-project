import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * Custom hook pour accéder au contexte d'authentification
 * Fournit accès aux données utilisateur et fonctions d'authentification
 * @returns {Object} { user, isAuthenticated, logout }
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
