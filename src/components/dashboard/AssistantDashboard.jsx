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
          <h3>🏢 Gestion des entreprises</h3>
          <p>Ajouter et gérer les entreprises partenaires</p>
          <button onClick={() => navigate('/assistant/entreprises')} className="card-button">Gérer</button>
        </div>

        <div className="dashboard-card">
          <h3>👥 Gestion des Inscriptions</h3>
          <p>Voir les inscriptions et assigner les formateurs</p>
          <button onClick={() => navigate('/assistant/participants')} className="card-button">Gérer</button>
        </div>

        <div className="dashboard-card">
          <h3>📅 Planifier une Formation</h3>
          <p>Assignez formateurs et entreprises aux formations</p>
          <button onClick={() => navigate('/assistant/formations/plan')} className="card-button">Planifier</button>
        </div>

        <div className="dashboard-card">
          <h3>📊 Statistiques</h3>
          <p>Consulter les statistiques des formations</p>
          <button onClick={() => navigate('/assistant/statistiques')} className="card-button">Analyser</button>
        </div>

        <div className="dashboard-card">
          <h3>📚 Accueil</h3>
          <p>Retourner à la page d'accueil</p>
          <button onClick={() => navigate('/')} className="card-button">Accueil</button>
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