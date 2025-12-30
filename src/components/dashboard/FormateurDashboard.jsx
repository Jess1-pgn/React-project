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
          <h3>📚 Mes Formations</h3>
          <p>Gérer vos cours et formations</p>
          <button onClick={() => navigate('/formateur/trainings')} className="card-button">Voir</button>
        </div>

        <div className="dashboard-card">
          <h3>👥 Mes Étudiants</h3>
          <p>Consulter la liste des étudiants</p>
          <button onClick={() => navigate('/formateur/students')} className="card-button">Gérer</button>
        </div>

        <div className="dashboard-card">
          <h3>📊 Statistiques</h3>
          <p>Vos statistiques et performances</p>
          <button onClick={() => navigate('/formateur/statistics')} className="card-button">Analyser</button>
        </div>

        <div className="dashboard-card">
          <h3>⭐ Évaluations</h3>
          <p>Évaluations des étudiants</p>
          <button onClick={() => navigate('/formateur/evaluations')} className="card-button">Consulter</button>
        </div>

        <div className="dashboard-card">
          <h3>📅 Calendrier</h3>
          <p>Planification des cours</p>
          <button onClick={() => navigate('/formateur/schedule')} className="card-button">Planifier</button>
        </div>

        <div className="dashboard-card">
          <h3>📝 Ressources</h3>
          <p>Matériel pédagogique</p>
          <button onClick={() => navigate('/formateur/resources')} className="card-button">Accéder</button>
        </div>
      </div>
    </div>
  );
};

export default FormateurDashboard;
