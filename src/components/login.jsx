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
      // Redirection selon le rôle - normaliser en minuscules
      const userRole = result.user?.role?.toLowerCase();
      switch (userRole) {
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'formateur':
          navigate('/formateur/dashboard');
          break;
        case 'assistant': 
          navigate('/assistant/dashboard');
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

        <div className="register-link">
          <p>Pas encore de compte ? <button className="link-btn" onClick={() => navigate('/register')}>S'inscrire</button></p>
        </div>
      </div>
    </div>
  );
};

export default Login;