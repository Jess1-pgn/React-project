import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../config/api';
import './PublicFormationsList.css';

const PublicFormationsList = () => {
  const navigate = useNavigate();
  const [formations, setFormations] = useState([]);
  const [filteredFormations, setFilteredFormations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filtres
  const [filters, setFilters] = useState({
    category: '',
    city: '',
    date: '',
    searchText: ''
  });

  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);

  // Charger les formations au montage
  useEffect(() => {
    loadFormations();
  }, []);

  // Appliquer les filtres quand ils changent
  useEffect(() => {
    applyFilters();
  }, [filters, formations]);

  const loadFormations = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.get('/formations');
      const publicFormations = response.data || [];
      
      setFormations(publicFormations);

      // Extraire les catégories et villes uniques
      const uniqueCategories = [...new Set(publicFormations.map(f => f.category).filter(Boolean))];
      const uniqueCities = [...new Set(publicFormations.map(f => f.city).filter(Boolean))];
      
      setCategories(uniqueCategories);
      setCities(uniqueCities);
    } catch (err) {
      setError('Erreur lors du chargement des formations');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = formations;

    // Filtre par catégorie
    if (filters.category) {
      filtered = filtered.filter(f => f.category === filters.category);
    }

    // Filtre par ville
    if (filters.city) {
      filtered = filtered.filter(f => f.city === filters.city);
    }

    // Filtre par date (formations à venir)
    if (filters.date === 'upcoming') {
      const today = new Date();
      filtered = filtered.filter(f => {
        if (!f.startDate) return true;
        return new Date(f.startDate) >= today;
      });
    } else if (filters.date === 'past') {
      const today = new Date();
      filtered = filtered.filter(f => {
        if (!f.startDate) return false;
        return new Date(f.startDate) < today;
      });
    }

    // Filtre par texte de recherche
    if (filters.searchText) {
      const searchLower = filters.searchText.toLowerCase();
      filtered = filtered.filter(f =>
        f.title?.toLowerCase().includes(searchLower) ||
        f.description?.toLowerCase().includes(searchLower)
      );
    }

    setFilteredFormations(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      category: '',
      city: '',
      date: '',
      searchText: ''
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'À définir';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="public-formations-container">
        <div className="loading">
          <p>Chargement des formations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="public-formations-container">
      <div className="public-header">
        <div className="header-content">
          <h1>📚 Nos Formations</h1>
          <p>Découvrez nos formations publiques et inscrivez-vous</p>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="filters-section">
        <div className="filters-title">
          <h2>🔍 Filtrer les formations</h2>
        </div>

        <div className="filters-grid">
          <div className="filter-group">
            <label htmlFor="searchText">Rechercher</label>
            <input
              type="text"
              id="searchText"
              name="searchText"
              value={filters.searchText}
              onChange={handleFilterChange}
              placeholder="Titre ou description..."
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <label htmlFor="category">Catégorie</label>
            <select
              id="category"
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">Toutes les catégories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="city">Ville</label>
            <select
              id="city"
              name="city"
              value={filters.city}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">Toutes les villes</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="date">Date</label>
            <select
              id="date"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">Toutes les dates</option>
              <option value="upcoming">À venir</option>
              <option value="past">Passées</option>
            </select>
          </div>

          <button onClick={handleResetFilters} className="reset-filters-btn">
            ↺ Réinitialiser
          </button>
        </div>
      </div>

      <div className="formations-results">
        <div className="results-info">
          <p><strong>{filteredFormations.length}</strong> formation(s) trouvée(s)</p>
        </div>

        {filteredFormations.length === 0 ? (
          <div className="no-formations">
            <p>😕 Aucune formation ne correspond à vos critères</p>
            <button onClick={handleResetFilters} className="reset-link">
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="formations-grid">
            {filteredFormations.map(formation => (
              <div key={formation.id} className="formation-card">
                {formation.imageUrl && (
                  <img src={formation.imageUrl} alt={formation.title} className="formation-image" />
                )}
                
                <div className="formation-content">
                  <div className="formation-header">
                    <h3>{formation.title}</h3>
                    {formation.category && (
                      <span className="category-badge">{formation.category}</span>
                    )}
                  </div>

                  <p className="formation-description">{formation.description}</p>

                  <div className="formation-meta">
                    {formation.hours && (
                      <div className="meta-item">
                        <span className="icon">⏱️</span>
                        <span>{formation.hours} heures</span>
                      </div>
                    )}
                    {formation.cost !== undefined && (
                      <div className="meta-item">
                        <span className="icon">💰</span>
                        <span>{formation.cost}€</span>
                      </div>
                    )}
                    {formation.level && (
                      <div className="meta-item">
                        <span className="icon">📊</span>
                        <span>{formation.level}</span>
                      </div>
                    )}
                  </div>

                  {formation.city && (
                    <div className="formation-city">
                      <span className="icon">📍</span>
                      {formation.city}
                    </div>
                  )}

                  {formation.startDate && (
                    <div className="formation-date">
                      <span className="icon">📅</span>
                      {formatDate(formation.startDate)}
                    </div>
                  )}

                  <div className="formation-actions">
                    <button
                      onClick={() => navigate(`/formations/${formation.id}`)}
                      className="btn-details"
                    >
                      📋 Détails
                    </button>
                    <button
                      onClick={() => navigate(`/formations/${formation.id}/register`)}
                      className="btn-register"
                    >
                      ✓ S'inscrire
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicFormationsList;
