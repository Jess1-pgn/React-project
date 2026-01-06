import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../config/api';
import './FormationDetailsPublic.css';

const FormationDetailsPublic = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formation, setFormation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadFormation();
  }, [id]);

  const loadFormation = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/formations/${id}`);
      setFormation(response.data);
      setError('');
    } catch (err) {
      setError('Formation non trouvée');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="formation-details-public">
        <div className="loading">Chargement...</div>
      </div>
    );
  }

  if (error || !formation) {
    return (
      <div className="formation-details-public">
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button onClick={() => navigate('/')} className="btn-back">
            Retour aux formations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="formation-details-public">
      <button onClick={() => navigate('/')} className="btn-back-top">
        ← Retour
      </button>

      {formation.imageUrl && (
        <div className="formation-banner">
          <img src={formation.imageUrl} alt={formation.title} />
          <div className="banner-overlay">
            <h1>{formation.title}</h1>
          </div>
        </div>
      )}

      <div className="details-container">
        <div className="details-main">
          {/* Description */}
          <section className="section">
            <h2>À propos de la formation</h2>
            <p className="description">{formation.description}</p>
          </section>

          {/* Caractéristiques */}
          <section className="section">
            <h2>Caractéristiques</h2>
            <div className="characteristics-grid">
              {formation.hours && (
                <div className="characteristic">
                  <span className="icon">⏱️</span>
                  <span className="label">Durée</span>
                  <span className="value">{formation.hours} heures</span>
                </div>
              )}
              {formation.cost !== undefined && (
                <div className="characteristic">
                  <span className="icon">💰</span>
                  <span className="label">Coût</span>
                  <span className="value">{formation.cost}€</span>
                </div>
              )}
              {formation.level && (
                <div className="characteristic">
                  <span className="icon">📊</span>
                  <span className="label">Niveau</span>
                  <span className="value">{formation.level}</span>
                </div>
              )}
              {formation.category && (
                <div className="characteristic">
                  <span className="icon">🏷️</span>
                  <span className="label">Catégorie</span>
                  <span className="value">{formation.category}</span>
                </div>
              )}
            </div>
          </section>

          {/* Objectifs */}
          {formation.objectives && formation.objectives.length > 0 && (
            <section className="section">
              <h2>Objectifs de la formation</h2>
              <ul className="objectives-list">
                {formation.objectives.map((objective, idx) => (
                  <li key={idx}>
                    <span className="bullet">✓</span>
                    {objective}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Programme */}
          {formation.program && formation.program.length > 0 && (
            <section className="section">
              <h2>Programme détaillé</h2>
              <div className="program-list">
                {formation.program.map((item, idx) => (
                  <div key={idx} className="program-item">
                    <span className="number">{idx + 1}</span>
                    <span className="content">{item}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Localisation */}
          {(formation.city || formation.startDate) && (
            <section className="section">
              <h2>Localisation et dates</h2>
              <div className="location-info">
                {formation.city && (
                  <div className="info-item">
                    <span className="icon">📍</span>
                    <span>{formation.city}</span>
                  </div>
                )}
                {formation.startDate && (
                  <div className="info-item">
                    <span className="icon">📅</span>
                    <span>
                      {new Date(formation.startDate).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="details-sidebar">
          <div className="info-card">
            <h3>Résumé</h3>
            <div className="info-grid">
              {formation.hours && (
                <div className="info-row">
                  <span className="label">Durée:</span>
                  <span className="value">{formation.hours}h</span>
                </div>
              )}
              {formation.cost !== undefined && (
                <div className="info-row">
                  <span className="label">Prix:</span>
                  <span className="value">{formation.cost}€</span>
                </div>
              )}
              {formation.maxParticipants && (
                <div className="info-row">
                  <span className="label">Places:</span>
                  <span className="value">{formation.maxParticipants} max</span>
                </div>
              )}
            </div>

            <button
              onClick={() => navigate(`/formations/${formation.id}/register`)}
              className="btn-register-large"
            >
              ✓ S'inscrire à cette formation
            </button>
          </div>

          {formation.sector && (
            <div className="info-card">
              <h3>Secteur</h3>
              <p>{formation.sector}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormationDetailsPublic;
