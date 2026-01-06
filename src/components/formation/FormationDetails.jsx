import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../config/api';
import './FormationDetails.css';

const FormationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formation, setFormation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFormation();
  }, [id]);

  const fetchFormation = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/formations/${id}`);
      setFormation(response.data);
      setError('');
    } catch (err) {
      setError('Erreur lors du chargement de la formation');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const getLevelLabel = (level) => {
    const labels = {
      beginner: 'Débutant',
      intermediate: 'Intermédiaire',
      advanced: 'Avancé',
    };
    return labels[level] || level;
  };

  if (loading) {
    return (
      <div className="formation-details">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  if (error || !formation) {
    return (
      <div className="formation-details">
        <div className="error-container">
          <h2>{error || 'Formation non trouvée'}</h2>
          <button onClick={() => navigate(-1)} className="back-btn">
            ← Retour
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="formation-details">
      <button onClick={() => navigate(-1)} className="back-link">
        ← Retour
      </button>

      <div className="details-container">
        {formation.imageUrl && (
          <div className="details-hero">
            <img src={formation.imageUrl} alt={formation.title} />
          </div>
        )}

        <div className="details-content">
          <div className="details-header">
            <div>
              <h1>{formation.title}</h1>
              <span className={`level-badge level-${formation.level}`}>
                {getLevelLabel(formation.level)}
              </span>
            </div>
            <div className="details-meta">
              <div className="meta-item">
                <span className="meta-icon">⏱️</span>
                <div>
                  <p className="meta-label">Durée</p>
                  <p className="meta-value">{formation.hours} heures</p>
                </div>
              </div>
              <div className="meta-item">
                <span className="meta-icon">💰</span>
                <div>
                  <p className="meta-label">Coût</p>
                  <p className="meta-value">{formation.cost}€</p>
                </div>
              </div>
              {formation.maxParticipants && (
                <div className="meta-item">
                  <span className="meta-icon">👥</span>
                  <div>
                    <p className="meta-label">Max Participants</p>
                    <p className="meta-value">{formation.maxParticipants}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {formation.category && (
            <div className="category-section">
              <span className="category-tag">📂 {formation.category}</span>
            </div>
          )}

          <section className="section">
            <h2>📝 Description</h2>
            <p className="description-text">{formation.description}</p>
          </section>

          {formation.objectives && formation.objectives.length > 0 && (
            <section className="section">
              <h2>🎯 Objectifs d'apprentissage</h2>
              <ul className="objectives-list">
                {formation.objectives.map((objective, index) => (
                  <li key={index}>{objective}</li>
                ))}
              </ul>
            </section>
          )}

          {formation.program && formation.program.length > 0 && (
            <section className="section">
              <h2>📚 Programme détaillé</h2>
              <div className="program-list">
                {formation.program.map((item, index) => (
                  <div key={index} className="program-item">
                    <span className="program-number">{index + 1}</span>
                    <span className="program-text">{item}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="details-actions">
            <button
              onClick={() => navigate(`/admin/formations/edit/${id}`)}
              className="edit-btn"
            >
              ✏️ Modifier
            </button>
            <button
              onClick={() => navigate(-1)}
              className="back-btn"
            >
              ← Retour
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormationDetails;
