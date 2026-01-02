import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../config/api';
import './FormatorManagement.css';

const FormatorManagement = () => {
  const navigate = useNavigate();
  const [formators, setFormators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSkill, setFilterSkill] = useState('');
  const [allSkills, setAllSkills] = useState([]);

  useEffect(() => {
    fetchFormators();
  }, []);

  const fetchFormators = async () => {
    try {
      setLoading(true);
      const response = await api.get('/formateurs');
      setFormators(response.data);

      // Extraire tous les skills uniques
      const skills = new Set();
      response.data.forEach((formator) => {
        formator.specializations?.forEach((skill) => skills.add(skill));
      });
      setAllSkills(Array.from(skills).sort());
      setError('');
    } catch (err) {
      setError('Erreur lors du chargement des formateurs');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFormator = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce formateur ?')) {
      try {
        await api.delete(`/formateurs/${id}`);
        setFormators(formators.filter((f) => f.id !== id));
      } catch (err) {
        setError('Erreur lors de la suppression');
        console.error('Erreur:', err);
      }
    }
  };

  const filteredFormators = formators.filter((formator) => {
    const matchesSearch =
      `${formator.firstName} ${formator.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formator.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formator.expertise?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSkill =
      !filterSkill ||
      formator.specializations?.some((skill) =>
        skill.toLowerCase().includes(filterSkill.toLowerCase())
      );

    return matchesSearch && matchesSkill;
  });

  return (
    <div className="formator-management">
      <div className="management-header">
        <div>
          <h1>👨‍🏫 Gestion des formateurs</h1>
          <p>Créez et gérez les formateurs</p>
        </div>
        <button
          onClick={() => navigate('/admin/formateurs/add')}
          className="add-formator-btn"
        >
          ➕ Ajouter un formateur
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="filters-section">
        <input
          type="text"
          placeholder="Rechercher un formateur..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={filterSkill}
          onChange={(e) => setFilterSkill(e.target.value)}
          className="filter-select"
        >
          <option value="">Toutes les compétences</option>
          {allSkills.map((skill) => (
            <option key={skill} value={skill}>
              {skill}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Chargement des formateurs...</p>
        </div>
      ) : filteredFormators.length === 0 ? (
        <div className="empty-state">
          <h2>Aucun formateur trouvé</h2>
          <p>
            {formators.length === 0
              ? 'Créez votre premier formateur en cliquant sur "Ajouter un formateur"'
              : 'Essayez de modifier vos filtres de recherche'}
          </p>
        </div>
      ) : (
        <div className="formators-grid">
          {filteredFormators.map((formator) => (
            <div key={formator.id} className="formator-card">
              <div className="formator-avatar">
                {formator.avatar ? (
                  <img src={formator.avatar} alt={`${formator.firstName} ${formator.lastName}`} />
                ) : (
                  <div className="avatar-placeholder">
                    {formator.firstName[0]}
                    {formator.lastName[0]}
                  </div>
                )}
              </div>

              <div className="formator-content">
                <div className="formator-header">
                  <h3>{formator.firstName} {formator.lastName}</h3>
                </div>

                <p className="formator-email">📧 {formator.email}</p>

                {formator.phone && (
                  <p className="formator-phone">📞 {formator.phone}</p>
                )}

                {formator.expertise && (
                  <p className="formator-expertise">💼 {formator.expertise}</p>
                )}

                {formator.bio && (
                  <p className="formator-bio">{formator.bio}</p>
                )}

                {formator.specializations && formator.specializations.length > 0 && (
                  <div className="formator-skills">
                    <strong>🎯 Compétences:</strong>
                    <div className="skills-list">
                      {formator.specializations.map((skill, idx) => (
                        <span key={idx} className="skill-badge">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {formator.remarks && (
                  <div className="formator-remarks">
                    <strong>📝 Remarques:</strong>
                    <p>{formator.remarks}</p>
                  </div>
                )}

                <div className="formator-actions">
                  <button
                    onClick={() => navigate(`/admin/formateurs/edit/${formator.id}`)}
                    className="edit-btn"
                  >
                    ✏️ Modifier
                  </button>
                  <button
                    onClick={() => navigate(`/admin/formateurs/${formator.id}`)}
                    className="view-btn"
                  >
                    👁️ Voir
                  </button>
                  <button
                    onClick={() => handleDeleteFormator(formator.id)}
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

export default FormatorManagement;
