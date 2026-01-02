import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import formationService from '../../services/formationService';
import './HomePage.css';

const HomePage = () => {
  const [formations, setFormations] = useState([]);
  const [filteredFormations, setFilteredFormations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Charger les formations au montage
  useEffect(() => {
    loadFormations();
  }, []);

  const loadFormations = async () => {
    try {
      setLoading(true);
      const data = await formationService.getAllFormations();
      // Filtrer uniquement les formations pour individus (isPublic: true)
      const publicFormations = data.filter(f => f.isPublic !== false);
      setFormations(publicFormations);
      setFilteredFormations(publicFormations);
      setError('');

      // Extraire les catégories (secteurs) et villes uniques
      const uniqueCategories = [...new Set(publicFormations
        .filter(f => f.sector)
        .map(f => f.sector)
      )].sort();
      const uniqueCities = [...new Set(publicFormations
        .filter(f => f.city)
        .map(f => f.city)
      )].sort();

      setCategories(uniqueCategories);
      setCities(uniqueCities);
    } catch (err) {
      console.error('Erreur lors du chargement des formations:', err);
      setError('Erreur lors du chargement des formations');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterFormations(query, selectedLevel, selectedCategory, selectedCity, selectedDate);
  };

  const handleLevelFilter = (level) => {
    setSelectedLevel(level);
    filterFormations(searchQuery, level, selectedCategory, selectedCity, selectedDate);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    filterFormations(searchQuery, selectedLevel, category, selectedCity, selectedDate);
  };

  const handleCityFilter = (city) => {
    setSelectedCity(city);
    filterFormations(searchQuery, selectedLevel, selectedCategory, city, selectedDate);
  };

  const handleDateFilter = (date) => {
    setSelectedDate(date);
    filterFormations(searchQuery, selectedLevel, selectedCategory, selectedCity, date);
  };

  const filterFormations = (query, level, category, city, date) => {
    let results = formations;

    // Filtre par recherche (titre, description, objectifs)
    if (query.trim()) {
      results = results.filter(f =>
        f.title.toLowerCase().includes(query.toLowerCase()) ||
        (f.description && f.description.toLowerCase().includes(query.toLowerCase())) ||
        (f.objectives && f.objectives.some(obj =>
          obj.toLowerCase().includes(query.toLowerCase())
        ))
      );
    }

    // Filtre par niveau
    if (level) {
      results = results.filter(f => f.level === level);
    }

    // Filtre par catégorie/secteur
    if (category) {
      results = results.filter(f => f.sector === category);
    }

    // Filtre par ville
    if (city) {
      results = results.filter(f => f.city === city);
    }

    // Filtre par date (formations à partir de cette date)
    if (date) {
      results = results.filter(f => {
        if (!f.startDate) return true;
        const formationDate = new Date(f.startDate);
        const filterDate = new Date(date);
        return formationDate >= filterDate;
      });
    }

    setFilteredFormations(results);
  };

  const handleRegisterClick = (formationId) => {
    navigate(`/register/${formationId}`);
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Débutant':
        return '#27ae60';
      case 'Intermédiaire':
        return '#f39c12';
      case 'Avancé':
        return '#e74c3c';
      default:
        return '#667eea';
    }
  };

  if (loading) {
    return <div className="home-page-container loading">Chargement des formations...</div>;
  }

  return (
    <div className="home-page-container">
      {/* En-tête */}
      <div className="home-header">
        <h1>🎓 Formations Disponibles</h1>
        <p>Choisissez une formation et inscrivez-vous dès maintenant</p>
      </div>

      {/* Section de recherche et filtrage */}
      <div className="search-filter-container">
        <div className="search-box">
          <input
            type="text"
            placeholder="Rechercher une formation..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {/* Filtres */}
        <div className="filters-section">
          {/* Filtre Niveau */}
          <div className="filter-group">
            <label>📊 Niveau</label>
            <div className="filter-buttons">
              <button
                className={selectedLevel === '' ? 'active' : ''}
                onClick={() => handleLevelFilter('')}
              >
                Tous
              </button>
              <button
                className={selectedLevel === 'Débutant' ? 'active' : ''}
                onClick={() => handleLevelFilter('Débutant')}
                style={selectedLevel === 'Débutant' ? { backgroundColor: getLevelColor('Débutant') } : {}}
              >
                Débutant
              </button>
              <button
                className={selectedLevel === 'Intermédiaire' ? 'active' : ''}
                onClick={() => handleLevelFilter('Intermédiaire')}
                style={selectedLevel === 'Intermédiaire' ? { backgroundColor: getLevelColor('Intermédiaire') } : {}}
              >
                Intermédiaire
              </button>
              <button
                className={selectedLevel === 'Avancé' ? 'active' : ''}
                onClick={() => handleLevelFilter('Avancé')}
                style={selectedLevel === 'Avancé' ? { backgroundColor: getLevelColor('Avancé') } : {}}
              >
                Avancé
              </button>
            </div>
          </div>

          {/* Filtre Catégorie */}
          <div className="filter-group">
            <label>🏷️ Catégorie</label>
            <select 
              value={selectedCategory} 
              onChange={(e) => handleCategoryFilter(e.target.value)}
              className="filter-select"
            >
              <option value="">Toutes les catégories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Filtre Ville */}
          <div className="filter-group">
            <label>📍 Ville</label>
            <select 
              value={selectedCity} 
              onChange={(e) => handleCityFilter(e.target.value)}
              className="filter-select"
            >
              <option value="">Toutes les villes</option>
              {cities.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Filtre Date */}
          <div className="filter-group">
            <label>📅 À partir du</label>
            <input 
              type="date" 
              value={selectedDate} 
              onChange={(e) => handleDateFilter(e.target.value)}
              className="filter-date"
            />
          </div>

          {/* Bouton réinitialiser */}
          {(selectedLevel || selectedCategory || selectedCity || selectedDate) && (
            <button 
              className="reset-filters-btn"
              onClick={() => {
                setSelectedLevel('');
                setSelectedCategory('');
                setSelectedCity('');
                setSelectedDate('');
                filterFormations('', '', '', '', '');
              }}
            >
              ↺ Réinitialiser
            </button>
          )}
        </div>
      </div>

      {/* Message d'erreur */}
      {error && <div className="error-message">{error}</div>}

      {/* Grille de formations */}
      {filteredFormations.length > 0 ? (
        <div className="formations-grid">
          {filteredFormations.map((formation) => (
            <div key={formation.id} className="formation-card">
              {formation.image && (
                <div className="formation-image">
                  <img src={formation.image} alt={formation.title} />
                </div>
              )}
              <div className="formation-badge" style={{ backgroundColor: getLevelColor(formation.level) }}>
                {formation.level}
              </div>

              <h2>{formation.title}</h2>

              {formation.description && (
                <p className="description">{formation.description}</p>
              )}

              <div className="formation-meta">
                <div className="meta-item">
                  <span className="meta-icon">⏱️</span>
                  <span>{formation.hours} h</span>
                </div>
                <div className="meta-item">
                  <span className="meta-icon">💰</span>
                  <span>{formation.cost}€</span>
                </div>
              </div>

              {formation.objectives && formation.objectives.length > 0 && (
                <div className="objectives">
                  <h4>Objectifs</h4>
                  <ul>
                    {formation.objectives.slice(0, 3).map((obj, idx) => (
                      <li key={idx}>{obj}</li>
                    ))}
                    {formation.objectives.length > 3 && (
                      <li className="more">+{formation.objectives.length - 3} objectifs supplémentaires</li>
                    )}
                  </ul>
                </div>
              )}

              <button
                className="register-button"
                onClick={() => handleRegisterClick(formation.id)}
              >
                📝 S'inscrire à cette formation
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-formations">
          <p>Aucune formation ne correspond à votre recherche.</p>
          <button onClick={() => {
            setSearchQuery('');
            setSelectedLevel('');
            filterFormations('', '');
          }}>
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
