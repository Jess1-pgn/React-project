import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../config/api';
import './Evaluations.css';

const Evaluations = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterFormation, setFilterFormation] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [formations, setFormations] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Charger les formations du formateur
        const formationsRes = await api.get('/formations');
        const myFormations = formationsRes.data.filter(f => f.formatorId === user?.id);
        setFormations(myFormations);

        // Données fictives d'évaluations
        const mockEvaluations = [
          {
            id: '1',
            studentName: 'Jean Dupont',
            studentId: '1',
            formation: myFormations.length > 0 ? myFormations[0].title : 'Formation 1',
            formationId: myFormations.length > 0 ? myFormations[0].id : '1',
            score: 85,
            maxScore: 100,
            status: 'complétée',
            date: '2024-01-15',
            comments: 'Très bon travail, participation active',
          },
          {
            id: '2',
            studentName: 'Marie Martin',
            studentId: '2',
            formation: myFormations.length > 0 ? myFormations[0].title : 'Formation 1',
            formationId: myFormations.length > 0 ? myFormations[0].id : '1',
            score: 92,
            maxScore: 100,
            status: 'complétée',
            date: '2024-01-16',
            comments: 'Excellentes performances',
          },
          {
            id: '3',
            studentName: 'Pierre Durand',
            studentId: '3',
            formation: myFormations.length > 0 ? myFormations[0].title : 'Formation 1',
            formationId: myFormations.length > 0 ? myFormations[0].id : '1',
            score: null,
            maxScore: 100,
            status: 'en attente',
            date: null,
            comments: '',
          },
        ];

        setEvaluations(mockEvaluations);
        setError('');
      } catch (err) {
        setError('Erreur lors du chargement des évaluations');
        console.error('Erreur:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user?.id]);

  const filteredEvaluations = evaluations.filter(evaluation => {
    const matchesFormation = !filterFormation || evaluation.formationId === filterFormation;
    const matchesStatus = !filterStatus || evaluation.status === filterStatus;
    return matchesFormation && matchesStatus;
  });

  const averageScore = evaluations.length > 0
    ? Math.round(
        evaluations
          .filter(e => e.score !== null)
          .reduce((sum, e) => sum + (e.score / e.maxScore) * 100, 0) /
          evaluations.filter(e => e.score !== null).length
      )
    : 0;

  if (loading) {
    return (
      <div className="evaluations-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Chargement des évaluations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="evaluations-container">
      <div className="eval-header">
        <h1>⭐ Évaluations des Étudiants</h1>
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Retour
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {/* Résumé */}
      <div className="eval-summary">
        <div className="summary-card">
          <span className="summary-icon">📊</span>
          <div>
            <p className="summary-label">Note Moyenne</p>
            <p className="summary-value">{averageScore}%</p>
          </div>
        </div>
        <div className="summary-card">
          <span className="summary-icon">✅</span>
          <div>
            <p className="summary-label">Évaluations Complétées</p>
            <p className="summary-value">{evaluations.filter(e => e.status === 'complétée').length}</p>
          </div>
        </div>
        <div className="summary-card">
          <span className="summary-icon">⏳</span>
          <div>
            <p className="summary-label">En Attente</p>
            <p className="summary-value">{evaluations.filter(e => e.status === 'en attente').length}</p>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="filters-section">
        {formations.length > 0 && (
          <select
            value={filterFormation}
            onChange={(e) => setFilterFormation(e.target.value)}
            className="filter-select"
          >
            <option value="">Toutes les formations</option>
            {formations.map(f => (
              <option key={f.id} value={f.id}>{f.title}</option>
            ))}
          </select>
        )}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="filter-select"
        >
          <option value="">Tous les statuts</option>
          <option value="complétée">Complétées</option>
          <option value="en attente">En attente</option>
        </select>
      </div>

      {/* Liste des évaluations */}
      {filteredEvaluations.length === 0 ? (
        <div className="empty-state">
          <h2>Aucune évaluation trouvée</h2>
          <p>Essayez de modifier vos filtres</p>
        </div>
      ) : (
        <div className="evaluations-list">
          {filteredEvaluations.map(evaluation => (
            <div key={evaluation.id} className="evaluation-card">
              <div className="eval-header-card">
                <div className="student-info">
                  <div className="student-avatar">{evaluation.studentName[0]}</div>
                  <div>
                    <h3>{evaluation.studentName}</h3>
                    <p className="formation-name">{evaluation.formation}</p>
                  </div>
                </div>
                <span className={`status-badge status-${evaluation.status}`}>
                  {evaluation.status === 'complétée' ? '✅ Complétée' : '⏳ En attente'}
                </span>
              </div>

              {evaluation.score !== null && (
                <div className="eval-score">
                  <div className="score-display">
                    <span className="score-value">{evaluation.score}/{evaluation.maxScore}</span>
                    <div className="score-percentage">{Math.round((evaluation.score / evaluation.maxScore) * 100)}%</div>
                  </div>
                  <div className="score-bar">
                    <div
                      className="score-fill"
                      style={{ width: `${(evaluation.score / evaluation.maxScore) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {evaluation.comments && (
                <div className="eval-comments">
                  <p><strong>Commentaires:</strong> {evaluation.comments}</p>
                </div>
              )}

              <div className="eval-date">
                {evaluation.date && <span>📅 {new Date(evaluation.date).toLocaleDateString('fr-FR')}</span>}
              </div>

              <div className="eval-actions">
                {evaluation.status === 'en attente' && (
                  <button className="btn-evaluate">
                    ✏️ Évaluer
                  </button>
                )}
                {evaluation.status === 'complétée' && (
                  <button className="btn-edit">
                    📝 Modifier
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Evaluations;
