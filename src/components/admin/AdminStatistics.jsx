import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AdminManagement.css';

const AdminStatistics = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const stats = {
    totalUsers: 156,
    totalFormators: 12,
    totalAssistants: 8,
    totalFormations: 24,
    totalCompanies: 15,
    totalParticipants: 320,
    activeEnrollments: 245,
    completedCourses: 75,
    totalRevenue: 45000,
    averageRating: 4.6,
  };

  const recentActivity = [
    { id: '1', type: 'user', action: 'Nouvel utilisateur créé', date: '2024-01-20', user: 'John Doe' },
    { id: '2', type: 'formation', action: 'Formation créée', date: '2024-01-19', user: 'Marie Martin' },
    { id: '3', type: 'inscription', action: 'Nouvelle inscription', date: '2024-01-18', user: 'Alice Dupont' },
    { id: '4', type: 'formateur', action: 'Formateur approuvé', date: '2024-01-17', user: 'Jean Durand' },
    { id: '5', type: 'completion', action: 'Formation complétée', date: '2024-01-16', user: 'Bob Martin' },
  ];

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>📊 Statistiques du Système</h1>
        <button onClick={() => navigate(-1)} className="back-btn">← Retour</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <p style={{ color: '#6b7280', margin: '0 0 0.5rem 0' }}>👥 Total Utilisateurs</p>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0', color: '#1f2937' }}>{stats.totalUsers}</p>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <p style={{ color: '#6b7280', margin: '0 0 0.5rem 0' }}>👨‍🏫 Formateurs</p>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0', color: '#1f2937' }}>{stats.totalFormators}</p>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <p style={{ color: '#6b7280', margin: '0 0 0.5rem 0' }}>👨‍💻 Assistants</p>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0', color: '#1f2937' }}>{stats.totalAssistants}</p>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <p style={{ color: '#6b7280', margin: '0 0 0.5rem 0' }}>📚 Formations</p>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0', color: '#1f2937' }}>{stats.totalFormations}</p>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <p style={{ color: '#6b7280', margin: '0 0 0.5rem 0' }}>🏢 Entreprises</p>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0', color: '#1f2937' }}>{stats.totalCompanies}</p>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <p style={{ color: '#6b7280', margin: '0 0 0.5rem 0' }}>👨‍🎓 Participants</p>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0', color: '#1f2937' }}>{stats.totalParticipants}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h3>📈 Métriques Clés</h3>
          <div style={{ marginTop: '1rem' }}>
            <p style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.75rem' }}>
              <span>Inscriptions Actives</span>
              <strong>{stats.activeEnrollments}</strong>
            </p>
            <p style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.75rem', marginTop: '0.75rem' }}>
              <span>Cours Complétés</span>
              <strong>{stats.completedCourses}</strong>
            </p>
            <p style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.75rem', marginTop: '0.75rem' }}>
              <span>Taux de Complétion</span>
              <strong>{((stats.completedCourses / stats.totalFormations) * 100).toFixed(1)}%</strong>
            </p>
            <p style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.75rem', marginTop: '0.75rem' }}>
              <span>Note Moyenne</span>
              <strong>⭐ {stats.averageRating}</strong>
            </p>
          </div>
        </div>

        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h3>💰 Finances</h3>
          <div style={{ marginTop: '1rem' }}>
            <p style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.75rem' }}>
              <span>Revenu Total</span>
              <strong style={{ color: '#10b981' }}>€{stats.totalRevenue.toLocaleString()}</strong>
            </p>
            <p style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.75rem', marginTop: '0.75rem' }}>
              <span>Revenu Moyen/Formation</span>
              <strong>€{(stats.totalRevenue / stats.totalFormations).toFixed(0)}</strong>
            </p>
            <p style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.75rem', marginTop: '0.75rem' }}>
              <span>Revenu/Participant</span>
              <strong>€{(stats.totalRevenue / stats.totalParticipants).toFixed(2)}</strong>
            </p>
          </div>
        </div>
      </div>

      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h3>📝 Activités Récentes</h3>
        <div style={{ marginTop: '1rem' }}>
          {recentActivity.map(activity => (
            <div key={activity.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
              <div>
                <p style={{ margin: '0 0 0.25rem 0', fontWeight: 'bold' }}>{activity.action}</p>
                <p style={{ margin: '0', color: '#6b7280', fontSize: '0.9rem' }}>{activity.user}</p>
              </div>
              <span style={{ color: '#9ca3af', fontSize: '0.9rem' }}>{activity.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminStatistics;
