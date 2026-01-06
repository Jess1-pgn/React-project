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
          <h3>�‍🏫 Gestion des formateurs</h3>
          <p>Ajouter et gérer les formateurs et leurs compétences</p>
          <button onClick={() => navigate('/admin/formateurs')} className="card-button">Gérer</button>
        </div>

        <div className="dashboard-card">
          <h3>📚 Gestion des formations</h3>
          <p>Créer et gérer les formations publiques</p>
          <button onClick={() => navigate('/admin/formations')} className="card-button">Gérer</button>
        </div>

        <div className="dashboard-card">
          <h3>📅 Planifier une Formation</h3>
          <p>Assignez formateurs et entreprises aux formations</p>
          <button onClick={() => navigate('/admin/formations/plan')} className="card-button">Planifier</button>
        </div>

        <div className="dashboard-card">
          <h3>🏢 Gestion des entreprises</h3>
          <p>Ajouter et gérer les entreprises partenaires</p>
          <button onClick={() => navigate('/admin/entreprises')} className="card-button">Gérer</button>
        </div>

        <div className="dashboard-card">
          <h3>👥 Gestion des Inscriptions</h3>
          <p>Voir les inscriptions et assigner les formateurs</p>
          <button onClick={() => navigate('/admin/participants')} className="card-button">Gérer</button>
        </div>

        <div className="dashboard-card">
          <h3>⭐ Évaluations</h3>
          <p>Consulter les évaluations des formations</p>
          <button onClick={() => navigate('/admin/evaluations')} className="card-button">Consulter</button>
        </div>

        <div className="dashboard-card">
          <h3>📊 Statistiques</h3>
          <p>Vue d'ensemble du système</p>
          <button onClick={() => navigate('/admin/statistiques-formations')} className="card-button">Analyser</button>
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

        <div className="dashboard-card">
          <h3>📋 Demandes de formateurs</h3>
          <p>Gérer les demandes d'inscription des formateurs externes</p>
          <button onClick={() => navigate('/admin/formateurs-applications')} className="card-button">Examiner</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;