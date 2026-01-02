import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../config/api';
import './EntrepriseDetails.css';

const EntrepriseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entreprise, setEntreprise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEntreprise();
  }, [id]);

  const fetchEntreprise = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/entreprises/${id}`);
      setEntreprise(response.data);
      setError('');
    } catch (err) {
      setError('Erreur lors du chargement de l\'entreprise');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="entreprise-details">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  if (error || !entreprise) {
    return (
      <div className="entreprise-details">
        <div className="error-container">
          <h2>{error || 'Entreprise non trouvée'}</h2>
          <button onClick={() => navigate('/admin/entreprises')} className="back-btn">
            ← Retour aux entreprises
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="entreprise-details">
      <button onClick={() => navigate('/admin/entreprises')} className="back-link">
        ← Retour aux entreprises
      </button>

      <div className="details-container">
        {entreprise.logo && (
          <div className="details-hero">
            <img src={entreprise.logo} alt={entreprise.name} />
          </div>
        )}

        <div className="details-content">
          <div className="details-header">
            <div>
              <h1>{entreprise.name}</h1>
              {entreprise.sector && (
                <p className="sector-subtitle">{entreprise.sector}</p>
              )}
            </div>
          </div>

          {entreprise.description && (
            <section className="section">
              <h2>📝 Description</h2>
              <p className="description-text">{entreprise.description}</p>
            </section>
          )}

          <section className="section">
            <h2>📍 Adresse</h2>
            <div className="address-box">
              <p>{entreprise.address}</p>
              <p>
                {entreprise.city}
                {entreprise.postalCode && ` - ${entreprise.postalCode}`}
              </p>
            </div>
          </section>

          <section className="section">
            <h2>📞 Coordonnées de contact</h2>
            <div className="contact-grid">
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <div>
                  <p className="contact-label">Téléphone</p>
                  <p className="contact-value">
                    <a href={`tel:${entreprise.phone}`}>{entreprise.phone}</a>
                  </p>
                </div>
              </div>

              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <div>
                  <p className="contact-label">Email</p>
                  <p className="contact-value">
                    <a href={`mailto:${entreprise.email}`}>{entreprise.email}</a>
                  </p>
                </div>
              </div>

              {entreprise.website && (
                <div className="contact-item">
                  <span className="contact-icon">🌐</span>
                  <div>
                    <p className="contact-label">Site web</p>
                    <p className="contact-value">
                      <a href={entreprise.website} target="_blank" rel="noopener noreferrer">
                        {entreprise.website}
                      </a>
                    </p>
                  </div>
                </div>
              )}

              {entreprise.numberOfEmployees && (
                <div className="contact-item">
                  <span className="contact-icon">👥</span>
                  <div>
                    <p className="contact-label">Nombre d'employés</p>
                    <p className="contact-value">{entreprise.numberOfEmployees}</p>
                  </div>
                </div>
              )}
            </div>
          </section>

          <div className="details-actions">
            <button
              onClick={() => navigate(`/admin/entreprises/edit/${id}`)}
              className="edit-btn"
            >
              ✏️ Modifier
            </button>
            <button
              onClick={() => navigate('/admin/entreprises')}
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

export default EntrepriseDetails;
