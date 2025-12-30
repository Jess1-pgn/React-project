import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(username, password);

    if (result.success) {
      // Redirection selon le rôle - utiliser le rôle du résultat
      const userRole = result.user?.role;
      switch (userRole) {
        case 'ADMIN':
          navigate('/admin');
          break;
        case 'FORMATEUR':
          navigate('/formateur');
          break;
        case 'ASSISTANT': 
          navigate('/assistant');
          break;
        default:
          navigate('/');
      }
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>🔐 Connexion</h2>
        <p className="subtitle">Admin • Formateur • Assistant</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom d'utilisateur</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Entrez votre nom d'utilisateur"
              required
            />
          </div>

          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez votre mot de passe"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={loading} className="login-button">
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div className="demo-credentials">
          <p><strong>Comptes de test :</strong></p>
          <p>👨‍💼 Admin:  admin / admin123</p>
          <p>👨‍🏫 Formateur: formateur / form123</p>
          <p>👨‍💻 Assistant: assistant / assist123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;