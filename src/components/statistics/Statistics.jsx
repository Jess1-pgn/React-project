import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../config/api';
import './Statistics.css';

const Statistics = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalFormations: 0,
    totalStudents: 0,
    averageCompletion: 0,
    averageRating: 0,
  });
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadStatistics = async () => {
      try {
        setLoading(true);
        
        // Charger les formations du formateur
        const formationsRes = await api.get('/formations');
        const myFormations = formationsRes.data.filter(f => f.formatorId === user?.id);
        setFormations(myFormations);

        // Calculer les statistiques
        const totalStudents = Math.floor(Math.random() * 150) + 20; // Mock data
        const averageCompletion = Math.floor(Math.random() * 40) + 60;
        const averageRating = (Math.random() * 2 + 3.5).toFixed(1);

        setStats({
          totalFormations: myFormations.length,
          totalStudents,
          averageCompletion,
          averageRating,
        });

        setError('');
      } catch (err) {
        setError('Erreur lors du chargement des statistiques');
        console.error('Erreur:', err);
      } finally {
        setLoading(false);
      }
    };

    loadStatistics();
  }, [user?.id]);

  if (loading) {
    return (
      <div className="statistics-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Chargement des statistiques...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="statistics-container">
      <div className="stats-header">
        <h1>📊 Mes Statistiques</h1>
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Retour
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {/* Cartes de statistiques principales */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon formations-icon">📚</div>
          <div className="stat-content">
            <h3>Formations Créées</h3>
            <p className="stat-value">{stats.totalFormations}</p>
            <span className="stat-label">formations actives</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon students-icon">👥</div>
          <div className="stat-content">
            <h3>Étudiants Inscrits</h3>
            <p className="stat-value">{stats.totalStudents}</p>
            <span className="stat-label">étudiants au total</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon completion-icon">✓</div>
          <div className="stat-content">
            <h3>Taux de Réussite</h3>
            <p className="stat-value">{stats.averageCompletion}%</p>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{width: `${stats.averageCompletion}%`}}
              ></div>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon rating-icon">⭐</div>
          <div className="stat-content">
            <h3>Note Moyenne</h3>
            <p className="stat-value">{stats.averageRating}/5</p>
            <span className="stat-label">évaluation des étudiants</span>
          </div>
        </div>
      </div>

      {/* Détails par formation */}
      {formations.length > 0 && (
        <div className="formations-details">
          <h2>📈 Détails par Formation</h2>
          <div className="formations-list">
            {formations.map(formation => (
              <div key={formation.id} className="formation-stat-card">
                <div className="formation-header">
                  <h3>{formation.title}</h3>
                  <span className={`level-badge level-${formation.level}`}>
                    {formation.level === 'beginner' ? 'Débutant' : 
                     formation.level === 'intermediate' ? 'Intermédiaire' : 'Avancé'}
                  </span>
                </div>
                
                <div className="formation-stats">
                  <div className="formation-stat">
                    <span className="stat-label">Durée</span>
                    <span className="stat-value">{formation.hours}h</span>
                  </div>
                  <div className="formation-stat">
                    <span className="stat-label">Max Participants</span>
                    <span className="stat-value">{formation.maxParticipants}</span>
                  </div>
                  <div className="formation-stat">
                    <span className="stat-label">Inscrits</span>
                    <span className="stat-value">{Math.floor(Math.random() * formation.maxParticipants) + 1}</span>
                  </div>
                  <div className="formation-stat">
                    <span className="stat-label">Taux Réussite</span>
                    <span className="stat-value">{Math.floor(Math.random() * 40) + 60}%</span>
                  </div>
                </div>

                <div className="formation-actions">
                  <button 
                    onClick={() => navigate(`/formateur/formations/details/${formation.id}`)}
                    className="btn-details"
                  >
                    Voir détails
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section graphiques (à améliorer avec Chart.js) */}
      <div className="charts-section">
        <h2>📉 Tendances</h2>
        <div className="charts-grid">
          <div className="chart-card">
            <h3>Inscriptions par Mois</h3>
            <div className="chart-placeholder">
              <p>📊 Graphique en développement</p>
            </div>
          </div>

          <div className="chart-card">
            <h3>Performance des Étudiants</h3>
            <div className="chart-placeholder">
              <p>📊 Graphique en développement</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
