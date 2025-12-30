import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>👨‍💼 Dashboard Admin</h1>
        <button onClick={handleLogout} className="logout-btn">Déconnexion</button>
      </div>
      
      <div className="welcome-card">
        <h2>Bienvenue, {user?.username || 'Admin'} !</h2>
        <p className="role-badge admin">Rôle:  Administrateur</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>👥 Gestion des utilisateurs</h3>
          <p>Créer, modifier et supprimer des utilisateurs</p>
          <button onClick={() => navigate('/admin/users')} className="card-button">Gérer</button>
        </div>

        <div className="dashboard-card">
          <h3>👨‍🏫 Gestion des formateurs</h3>
          <p>Superviser les formateurs et leurs cours</p>
          <button onClick={() => navigate('/admin/trainers')} className="card-button">Voir</button>
        </div>

        <div className="dashboard-card">
          <h3>👨‍💻 Gestion des assistants</h3>
          <p>Gérer les assistants et leurs tâches</p>
          <button onClick={() => navigate('/admin/assistants')} className="card-button">Voir</button>
        </div>

        <div className="dashboard-card">
          <h3>📊 Statistiques</h3>
          <p>Vue d'ensemble du système</p>
          <button onClick={() => navigate('/admin/statistics')} className="card-button">Analyser</button>
        </div>

        <div className="dashboard-card">
          <h3>⚙️ Configuration</h3>
          <p>Paramètres système</p>
          <button onClick={() => navigate('/admin/settings')} className="card-button">Configurer</button>
        </div>

        <div className="dashboard-card">
          <h3>📝 Logs</h3>
          <p>Historique des activités</p>
          <button onClick={() => navigate('/admin/logs')} className="card-button">Consulter</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;