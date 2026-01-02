import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const AssistantDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>👨‍💻 Dashboard Assistant</h1>
        <button onClick={handleLogout} className="logout-btn">Déconnexion</button>
      </div>
      
      <div className="welcome-card">
        <h2>Bienvenue, {user?.username || 'Assistant'} !</h2>
        <p className="role-badge assistant">Rôle: Assistant</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>📋 Tâches assignées</h3>
          <p>Liste de vos tâches en cours</p>
          <button onClick={() => navigate('/assistant/tasks')} className="card-button">Voir</button>
        </div>

        <div className="dashboard-card">
          <h3>👥 Support Étudiants</h3>
          <p>Assister les étudiants</p>
          <button onClick={() => navigate('/assistant/students')} className="card-button">Accéder</button>
        </div>

        <div className="dashboard-card">
          <h3>📝 Rapports</h3>
          <p>Soumettre des rapports d'activité</p>
          <button onClick={() => navigate('/assistant/reports')} className="card-button">Créer</button>
        </div>

        <div className="dashboard-card">
          <h3>🏢 Gestion des entreprises</h3>
          <p>Ajouter et gérer les entreprises</p>
          <button onClick={() => navigate('/admin/entreprises')} className="card-button">Gérer</button>
        </div>

        <div className="dashboard-card">
          <h3>👥 Gestion des Inscriptions</h3>
          <p>Voir les inscriptions et assigner les formateurs</p>
          <button onClick={() => navigate('/admin/participants')} className="card-button">Gérer</button>
        </div>

        <div className="dashboard-card">
          <h3>📅 Mon Planning</h3>
          <p>Horaires et disponibilités</p>
          <button onClick={() => navigate('/assistant/schedule')} className="card-button">Consulter</button>
        </div>

        <div className="dashboard-card">
          <h3>📚 Ressources</h3>
          <p>Documentation et matériel</p>
          <button onClick={() => navigate('/assistant/resources')} className="card-button">Explorer</button>
        </div>

        <div className="dashboard-card">
          <h3>💬 Messages</h3>
          <p>Communication interne</p>
          <button onClick={() => navigate('/assistant/messages')} className="card-button">Lire</button>
        </div>
      </div>
    </div>
  );
};

export default AssistantDashboard;