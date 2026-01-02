import React, { useState } from 'react';
import '../components/Evaluation.css';

const EvaluationForm = ({ formationId, formatorName, onSubmit, onCancel }) => {
  const [evaluation, setEvaluation] = useState({
    pedagogicalQuality: 0,
    pace: 0,
    courseSupport: 0,
    subjectMastery: 0,
    comment: '',
  });
  const [loading, setLoading] = useState(false);

  const handleRating = (field, value) => {
    setEvaluation(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!evaluation.pedagogicalQuality || !evaluation.pace || !evaluation.courseSupport || !evaluation.subjectMastery) {
      alert('Veuillez évaluer tous les critères');
      return;
    }

    setLoading(true);
    try {
      await onSubmit(evaluation);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (field, value) => {
    return (
      <div className="stars-container">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            type="button"
            className={`star ${value >= star ? 'filled' : ''}`}
            onClick={() => handleRating(field, star)}
          >
            ⭐
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="evaluation-modal-overlay">
      <div className="evaluation-modal">
        <h2>📝 Évaluer la formation</h2>
        <p>Formateur: <strong>{formatorName}</strong></p>

        <form onSubmit={handleSubmit}>
          <div className="evaluation-criterion">
            <label>Qualité pédagogique</label>
            <p>Clarté et efficacité de l'enseignement</p>
            {renderStars('pedagogicalQuality', evaluation.pedagogicalQuality)}
          </div>

          <div className="evaluation-criterion">
            <label>Rythme de la formation</label>
            <p>Adéquation du rythme avec le niveau</p>
            {renderStars('pace', evaluation.pace)}
          </div>

          <div className="evaluation-criterion">
            <label>Support de cours et TP</label>
            <p>Qualité et pertinence des ressources</p>
            {renderStars('courseSupport', evaluation.courseSupport)}
          </div>

          <div className="evaluation-criterion">
            <label>Maîtrise du sujet</label>
            <p>Expertise et connaissance du domaine</p>
            {renderStars('subjectMastery', evaluation.subjectMastery)}
          </div>

          <div className="evaluation-criterion">
            <label>Commentaire (optionnel)</label>
            <textarea
              value={evaluation.comment}
              onChange={(e) => setEvaluation(prev => ({ ...prev, comment: e.target.value }))}
              placeholder="Partagez vos impressions..."
              maxLength={500}
            />
            <small>{evaluation.comment.length}/500</small>
          </div>

          <div className="evaluation-buttons">
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? 'Envoi...' : 'Soumettre l\'évaluation'}
            </button>
            <button type="button" onClick={onCancel} className="cancel-btn">
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EvaluationForm;
