import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const FormateurDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>👨‍🏫 Dashboard Formateur</h1>
        <button onClick={handleLogout} className="logout-btn">Déconnexion</button>
      </div>
      
      <div className="welcome-card">
        <h2>Bienvenue, {user?.username || 'Formateur'} !</h2>
        <p className="role-badge formateur">Rôle: Formateur</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>⭐ Mes Évaluations</h3>
          <p>Consulter les évaluations reçues des participants</p>
          <button onClick={() => navigate('/formateur/evaluations')} className="card-button">Consulter</button>
        </div>

        <div className="dashboard-card">
          <h3>📚 Accueil</h3>
          <p>Retourner à la page d'accueil</p>
          <button onClick={() => navigate('/')} className="card-button">Accueil</button>
        </div>
      </div>
    </div>
  );
};

export default FormateurDashboard;
