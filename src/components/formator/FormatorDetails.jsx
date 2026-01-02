import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../config/api';
import './FormatorDetails.css';

const FormatorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formator, setFormator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFormator();
  }, [id]);

  const fetchFormator = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/formateurs/${id}`);
      setFormator(response.data);
      setError('');
    } catch (err) {
      setError('Erreur lors du chargement du formateur');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="formator-details">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  if (error || !formator) {
    return (
      <div className="formator-details">
        <div className="error-container">
          <h2>{error || 'Formateur non trouvé'}</h2>
          <button onClick={() => navigate('/admin/formateurs')} className="back-btn">
            ← Retour aux formateurs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="formator-details">
      <button onClick={() => navigate('/admin/formateurs')} className="back-link">
        ← Retour aux formateurs
      </button>

      <div className="details-container">
        <div className="details-hero">
          <div className="formator-avatar-large">
            {formator.avatar ? (
              <img src={formator.avatar} alt={`${formator.firstName} ${formator.lastName}`} />
            ) : (
              <div className="avatar-placeholder-large">
                {formator.firstName[0]}
                {formator.lastName[0]}
              </div>
            )}
          </div>
        </div>

        <div className="details-content">
          <div className="details-header">
            <div>
              <h1>{formator.firstName} {formator.lastName}</h1>
              {formator.expertise && (
                <p className="expertise-subtitle">{formator.expertise}</p>
              )}
            </div>
          </div>

          <div className="contact-info">
            <div className="info-item">
              <span className="info-icon">📧</span>
              <div>
                <p className="info-label">Email</p>
                <p className="info-value">
                  <a href={`mailto:${formator.email}`}>{formator.email}</a>
                </p>
              </div>
            </div>

            {formator.phone && (
              <div className="info-item">
                <span className="info-icon">📞</span>
                <div>
                  <p className="info-label">Téléphone</p>
                  <p className="info-value">
                    <a href={`tel:${formator.phone}`}>{formator.phone}</a>
                  </p>
                </div>
              </div>
            )}
          </div>

          {formator.bio && (
            <section className="section">
              <h2>👤 Biographie</h2>
              <p className="bio-text">{formator.bio}</p>
            </section>
          )}

          {formator.specializations && formator.specializations.length > 0 && (
            <section className="section">
              <h2>🎯 Compétences et mots-clés</h2>
              <div className="skills-grid">
                {formator.specializations.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <span className="skill-icon">✓</span>
                    <span className="skill-name">{skill}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {formator.remarks && (
            <section className="section remarks-section">
              <h2>📝 Remarques internes</h2>
              <div className="remarks-box">
                <p>{formator.remarks}</p>
              </div>
            </section>
          )}

          <div className="details-actions">
            <button
              onClick={() => navigate(`/admin/formateurs/edit/${id}`)}
              className="edit-btn"
            >
              ✏️ Modifier
            </button>
            <button
              onClick={() => navigate('/admin/formateurs')}
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

export default FormatorDetails;
