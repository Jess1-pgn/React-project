import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import formationService from '../services/formationService';
import './HomePage.css';

const HomePage = () => {
  const [formations, setFormations] = useState([]);
  const [filteredFormations, setFilteredFormations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadFormations();
  }, []);

  const loadFormations = async () => {
    try {
      const data = await formationService.getAllFormations();
      setFormations(data || []);
      setFilteredFormations(data || []);
      
      // Extraire les catégories et villes uniques
      const uniqueCategories = [...new Set(data.map(f => f.sector).filter(Boolean))];
      const uniqueCities = [...new Set(data.map(f => f.city).filter(Boolean))];
      
      setCategories(uniqueCategories.sort());
      setCities(uniqueCities.sort());
    } catch (error) {
      console.error('Erreur lors du chargement des formations:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterFormations = (query, level, category, city, date) => {
    let results = formations;

    if (query.trim()) {
      results = results.filter(f =>
        f.title.toLowerCase().includes(query.toLowerCase()) ||
        f.description.toLowerCase().includes(query.toLowerCase()) ||
        f.objectives.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (level) {
      results = results.filter(f => f.level === level);
    }

    if (category) {
      results = results.filter(f => f.sector === category);
    }

    if (city) {
      results = results.filter(f => f.city === city);
    }

    if (date) {
      results = results.filter(f => new Date(f.startDate) >= new Date(date));
    }

    setFilteredFormations(results);
  };

  const handleFilterChange = (filterType, value) => {
    let newQuery = searchQuery;
    let newLevel = selectedLevel;
    let newCategory = selectedCategory;
    let newCity = selectedCity;
    let newDate = selectedDate;

    if (filterType === 'search') newQuery = value;
    if (filterType === 'level') newLevel = value;
    if (filterType === 'category') newCategory = value;
    if (filterType === 'city') newCity = value;
    if (filterType === 'date') newDate = value;

    if (filterType === 'search') setSearchQuery(newQuery);
    if (filterType === 'level') setSelectedLevel(newLevel);
    if (filterType === 'category') setSelectedCategory(newCategory);
    if (filterType === 'city') setSelectedCity(newCity);
    if (filterType === 'date') setSelectedDate(newDate);

    filterFormations(newQuery, newLevel, newCategory, newCity, newDate);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedLevel('');
    setSelectedCategory('');
    setSelectedCity('');
    setSelectedDate('');
    setFilteredFormations(formations);
  };

  if (loading) {
    return <div className="loading">Chargement des formations...</div>;
  }

  return (
    <div className="home-page">
      {/* Header */}
      <header className="home-header">
        <div className="header-content">
          <h1>🎓 Plateforme de Formation</h1>
          <p>Découvrez nos formations professionnelles</p>
          
          <div className="header-actions">
            {user ? (
              <>
                <span className="user-greeting">Bienvenue, {user.username}!</span>
                <button className="btn-dashboard" onClick={() => {
                  if (user.role === 'ADMIN') navigate('/admin');
                  else if (user.role === 'FORMATEUR') navigate('/formateur');
                  else if (user.role === 'ASSISTANT') navigate('/assistant');
                }}>
                  📊 Tableau de bord
                </button>
              </>
            ) : (
              <>
                <button className="btn-login" onClick={() => navigate('/login')}>
                  🔐 Se connecter
                </button>
              </>
            )}
            <button className="btn-register-formator" onClick={() => navigate('/register-formator')}>
              👨‍🏫 Devenir formateur
            </button>
          </div>
        </div>
      </header>

      {/* Filters Section */}
      <section className="filters-section">
        <div className="filters-container">
          <h2>Filtrer les formations</h2>

          <div className="search-bar">
            <input
              type="text"
              placeholder="🔍 Rechercher une formation..."
              value={searchQuery}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-group">
            <div className="filter-item">
              <label>Niveau</label>
              <select
                value={selectedLevel}
                onChange={(e) => handleFilterChange('level', e.target.value)}
                className="filter-select"
              >
                <option value="">Tous les niveaux</option>
                <option value="DÉBUTANT">Débutant</option>
                <option value="INTERMÉDIAIRE">Intermédiaire</option>
                <option value="AVANCÉ">Avancé</option>
              </select>
            </div>

            <div className="filter-item">
              <label>Catégorie</label>
              <select
                value={selectedCategory}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="filter-select"
              >
                <option value="">Toutes les catégories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="filter-item">
              <label>Ville</label>
              <select
                value={selectedCity}
                onChange={(e) => handleFilterChange('city', e.target.value)}
                className="filter-select"
              >
                <option value="">Toutes les villes</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="filter-item">
              <label>À partir du</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => handleFilterChange('date', e.target.value)}
                className="filter-date"
              />
            </div>
          </div>

          <button className="reset-filters-btn" onClick={handleResetFilters}>
            🔄 Réinitialiser les filtres
          </button>
        </div>
      </section>

      {/* Formations Grid */}
      <section className="formations-section">
        <div className="formations-container">
          <h2>Formations disponibles ({filteredFormations.length})</h2>

          {filteredFormations.length === 0 ? (
            <div className="no-formations">
              <p>Aucune formation ne correspond à vos critères.</p>
              <button className="btn-reset" onClick={handleResetFilters}>
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
                    <h3>{formation.title}</h3>
                    
                    <p className="description">{formation.description}</p>
                    
                    <div className="formation-meta">
                      <span className="level-badge">{formation.level}</span>
                      <span className="city-badge">📍 {formation.city}</span>
                    </div>

                    <div className="formation-info">
                      <p><strong>Durée:</strong> {formation.hours}h</p>
                      <p><strong>Prix:</strong> {formation.cost}€</p>
                      <p><strong>Secteur:</strong> {formation.sector}</p>
                      <p><strong>Début:</strong> {new Date(formation.startDate).toLocaleDateString('fr-FR')}</p>
                    </div>

                    <div className="formation-objectives">
                      <p><strong>Objectifs:</strong></p>
                      <p>{formation.objectives}</p>
                    </div>

                    <div className="formation-actions">
                      <button className="btn-details" onClick={() => {/* TODO: afficher détails */}}>
                        📖 Voir détails
                      </button>
                      {user ? (
                        <button className="btn-enroll" onClick={() => {/* TODO: inscription */}}>
                          📝 S'inscrire
                        </button>
                      ) : (
                        <button className="btn-enroll" onClick={() => navigate('/login')}>
                          🔐 Se connecter pour s'inscrire
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
