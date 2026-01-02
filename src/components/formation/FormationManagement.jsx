import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../config/api';
import './FormationManagement.css';

const FormationManagement = () => {
  const navigate = useNavigate();
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('');

  useEffect(() => {
    fetchFormations();
  }, []);

  const fetchFormations = async () => {
    try {
      setLoading(true);
      const response = await api.get('/formations');
      setFormations(response.data);
      setError('');
    } catch (err) {
      setError('Erreur lors du chargement des formations');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFormation = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
      try {
        await api.delete(`/formations/${id}`);
        setFormations(formations.filter((f) => f.id !== id));
      } catch (err) {
        setError('Erreur lors de la suppression');
        console.error('Erreur:', err);
      }
    }
  };

  const filteredFormations = formations.filter((formation) => {
    const matchesSearch =
      formation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formation.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = !filterLevel || formation.level === filterLevel;
    return matchesSearch && matchesLevel;
  });

  const getLevelBadgeClass = (level) => {
    switch (level) {
      case 'beginner':
        return 'badge-beginner';
      case 'intermediate':
        return 'badge-intermediate';
      case 'advanced':
        return 'badge-advanced';
      default:
        return '';
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

  return (
    <div className="formation-management">
      <div className="management-header">
        <div>
          <h1>📚 Gestion des formations</h1>
          <p>Créez et gérez les formations publiques</p>
        </div>
        <button
          onClick={() => navigate('/admin/formations/add')}
          className="add-formation-btn"
        >
          ➕ Ajouter une formation
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="filters-section">
        <input
          type="text"
          placeholder="Rechercher une formation..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={filterLevel}
          onChange={(e) => setFilterLevel(e.target.value)}
          className="filter-select"
        >
          <option value="">Tous les niveaux</option>
          <option value="beginner">Débutant</option>
          <option value="intermediate">Intermédiaire</option>
          <option value="advanced">Avancé</option>
        </select>
      </div>

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Chargement des formations...</p>
        </div>
      ) : filteredFormations.length === 0 ? (
        <div className="empty-state">
          <h2>Aucune formation trouvée</h2>
          <p>
            {formations.length === 0
              ? 'Créez votre première formation en cliquant sur "Ajouter une formation"'
              : 'Essayez de modifier vos filtres de recherche'}
          </p>
        </div>
      ) : (
        <div className="formations-grid">
          {filteredFormations.map((formation) => (
            <div key={formation.id} className="formation-card">
              {formation.imageUrl && (
                <div className="formation-image">
                  <img src={formation.imageUrl} alt={formation.title} />
                </div>
              )}

              <div className="formation-content">
                <div className="formation-header">
                  <h3>{formation.title}</h3>
                  <span className={`level-badge ${getLevelBadgeClass(formation.level)}`}>
                    {getLevelLabel(formation.level)}
                  </span>
                </div>

                <p className="formation-description">{formation.description}</p>

                <div className="formation-details">
                  <div className="detail-item">
                    <span className="detail-icon">⏱️</span>
                    <span>{formation.hours} heures</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">💰</span>
                    <span>{formation.cost}€</span>
                  </div>
                  {formation.maxParticipants && (
                    <div className="detail-item">
                      <span className="detail-icon">👥</span>
                      <span>Max {formation.maxParticipants} participants</span>
                    </div>
                  )}
                  {formation.category && (
                    <div className="detail-item">
                      <span className="detail-icon">📂</span>
                      <span>{formation.category}</span>
                    </div>
                  )}
                </div>

                {formation.objectives && formation.objectives.length > 0 && (
                  <div className="formation-objectives">
                    <strong>🎯 Objectifs:</strong>
                    <ul>
                      {formation.objectives.slice(0, 2).map((obj, idx) => (
                        <li key={idx}>{obj}</li>
                      ))}
                      {formation.objectives.length > 2 && (
                        <li className="more-items">
                          +{formation.objectives.length - 2} autres...
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                <div className="formation-actions">
                  <button
                    onClick={() => navigate(`/admin/formations/edit/${formation.id}`)}
                    className="edit-btn"
                  >
                    ✏️ Modifier
                  </button>
                  <button
                    onClick={() => navigate(`/admin/formations/${formation.id}`)}
                    className="view-btn"
                  >
                    👁️ Voir détails
                  </button>
                  <button
                    onClick={() => handleDeleteFormation(formation.id)}
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

export default FormationManagement;
