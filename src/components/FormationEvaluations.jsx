import React, { useState, useEffect } from 'react';
import evaluationService from '../services/evaluationService';
import '../components/Evaluation.css';

const FormationEvaluations = ({ formationId, formatorName }) => {
  const [stats, setStats] = useState(null);
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvaluations();
  }, [formationId]);

  const loadEvaluations = async () => {
    try {
      const [statsData, evals] = await Promise.all([
        evaluationService.getEvaluationStats(formationId),
        evaluationService.getFormationEvaluations(formationId),
      ]);
      setStats(statsData);
      setEvaluations(evals || []);
    } catch (error) {
      console.error('Erreur lors du chargement des évaluations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Chargement des évaluations...</div>;

  if (!stats) return <div className="no-evaluations">Aucune évaluation pour cette formation</div>;

  const renderStars = (rating) => {
    return (
      <div className="stats-stars">
        {[1, 2, 3, 4, 5].map(star => (
          <span key={star} className={star <= rating ? 'filled' : ''}>
            ⭐
          </span>
        ))}
        <span className="rating-text">({rating.toFixed(1)}/5)</span>
      </div>
    );
  };

  return (
    <div className="evaluations-section">
      <h3>📊 Évaluations de la formation</h3>
      <p className="formator-name">Formateur: <strong>{formatorName}</strong></p>

      <div className="evaluation-stats">
        <div className="stat-item">
          <label>Qualité pédagogique</label>
          {renderStars(stats.avgPedagogicalQuality || 0)}
        </div>
        <div className="stat-item">
          <label>Rythme</label>
          {renderStars(stats.avgPace || 0)}
        </div>
        <div className="stat-item">
          <label>Support de cours</label>
          {renderStars(stats.avgCourseSupport || 0)}
        </div>
        <div className="stat-item">
          <label>Maîtrise du sujet</label>
          {renderStars(stats.avgSubjectMastery || 0)}
        </div>
      </div>

      <div className="evaluations-count">
        <strong>{evaluations.length}</strong> évaluation(s)
      </div>

      {evaluations.length > 0 && (
        <div className="evaluations-list">
          <h4>Commentaires des participants</h4>
          {evaluations.map((eval, idx) => (
            <div key={idx} className="evaluation-item">
              <div className="evaluation-header">
                <span className="participant-name">{eval.participantName || 'Participant'}</span>
                <span className="evaluation-date">
                  {new Date(eval.createdAt).toLocaleDateString('fr-FR')}
                </span>
              </div>
              {eval.comment && <p className="evaluation-comment">{eval.comment}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormationEvaluations;
