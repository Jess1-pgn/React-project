import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../config/api';
import './EntrepriseManagement.css';

const EntrepriseManagement = () => {
  const navigate = useNavigate();
  const [entreprises, setEntreprises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSector, setFilterSector] = useState('');
  const [allSectors, setAllSectors] = useState([]);

  useEffect(() => {
    fetchEntreprises();
  }, []);

  const fetchEntreprises = async () => {
    try {
      setLoading(true);
      const response = await api.get('/entreprises');
      
      // Normaliser la réponse (support {message, data} ou tableau direct)
      const data = Array.isArray(response.data) 
        ? response.data 
        : response.data?.data || [];
      
      setEntreprises(data);

      // Extraire tous les secteurs uniques
      const sectors = new Set();
      data.forEach((entreprise) => {
        if (entreprise.sector) sectors.add(entreprise.sector);
      });
      setAllSectors(Array.from(sectors).sort());
      setError('');
    } catch (err) {
      setError('Erreur lors du chargement des entreprises');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEntreprise = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette entreprise ?')) {
      try {
        await api.delete(`/entreprises/${id}`);
        setEntreprises(entreprises.filter((e) => e.id !== id));
      } catch (err) {
        setError('Erreur lors de la suppression');
        console.error('Erreur:', err);
      }
    }
  };

  const filteredEntreprises = Array.isArray(entreprises) 
    ? entreprises.filter((entreprise) => {
        const matchesSearch =
          entreprise.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          entreprise.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          entreprise.email?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesSector = !filterSector || entreprise.sector === filterSector;

        return matchesSearch && matchesSector;
      })
    : [];

  return (
    <div className="entreprise-management">
      <div className="management-header">
        <div className="header-actions">
          <div className="header-text">
            <h1>Gestion des entreprises</h1>
            <p>Créez et gérez la liste des entreprises</p>
          </div>
          <div className="header-buttons">
            <button
              onClick={() => navigate('/admin')}
              className="back-dashboard-btn"
              type="button"
            >
              ← Retour au tableau de bord
            </button>
            <button
              onClick={() => navigate('/admin/entreprises/add')}
              className="add-entreprise-btn"
            >
              ➕ Ajouter une entreprise
            </button>
          </div>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="filters-section">
        <input
          type="text"
          placeholder="Rechercher une entreprise..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={filterSector}
          onChange={(e) => setFilterSector(e.target.value)}
          className="filter-select"
        >
          <option value="">Tous les secteurs</option>
          {allSectors.map((sector) => (
            <option key={sector} value={sector}>
              {sector}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Chargement des entreprises...</p>
        </div>
      ) : filteredEntreprises.length === 0 ? (
        <div className="empty-state">
          <h2>Aucune entreprise trouvée</h2>
          <p>
            {entreprises.length === 0
              ? 'Créez votre première entreprise en cliquant sur "Ajouter une entreprise"'
              : 'Essayez de modifier vos filtres de recherche'}
          </p>
        </div>
      ) : (
        <div className="entreprises-grid">
          {filteredEntreprises.map((entreprise) => (
            <div key={entreprise.id} className="entreprise-card">
              {entreprise.logo && (
                <div className="entreprise-logo">
                  <img src={entreprise.logo} alt={entreprise.name} />
                </div>
              )}

              <div className="entreprise-content">
                <div className="entreprise-header">
                  <h3>{entreprise.name}</h3>
                  {entreprise.sector && (
                    <span className="sector-badge">{entreprise.sector}</span>
                  )}
                </div>

                {entreprise.description && (
                  <p className="entreprise-description">{entreprise.description}</p>
                )}

                <div className="entreprise-details">
                  <div className="detail-item">
                    <span className="detail-icon">📍</span>
                    <span>{entreprise.address}, {entreprise.city}</span>
                  </div>
                  {entreprise.postalCode && (
                    <div className="detail-item">
                      <span className="detail-icon">📮</span>
                      <span>{entreprise.postalCode}</span>
                    </div>
                  )}
                  <div className="detail-item">
                    <span className="detail-icon">📞</span>
                    <a href={`tel:${entreprise.phone}`}>{entreprise.phone}</a>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">📧</span>
                    <a href={`mailto:${entreprise.email}`}>{entreprise.email}</a>
                  </div>
                  {entreprise.website && (
                    <div className="detail-item">
                      <span className="detail-icon">🌐</span>
                      <a href={entreprise.website} target="_blank" rel="noopener noreferrer">
                        Site web
                      </a>
                    </div>
                  )}
                  {entreprise.numberOfEmployees && (
                    <div className="detail-item">
                      <span className="detail-icon">👥</span>
                      <span>{entreprise.numberOfEmployees} employés</span>
                    </div>
                  )}
                </div>

                <div className="entreprise-actions">
                  <button
                    onClick={() => navigate(`/admin/entreprises/edit/${entreprise.id}`)}
                    className="edit-btn"
                  >
                    ✏️ Modifier
                  </button>
                  <button
                    onClick={() => navigate(`/admin/entreprises/${entreprise.id}`)}
                    className="view-btn"
                  >
                    👁️ Voir
                  </button>
                  <button
                    onClick={() => handleDeleteEntreprise(entreprise.id)}
                    className="delete-btn"
                  >
                    🗑️ Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EntrepriseManagement;
