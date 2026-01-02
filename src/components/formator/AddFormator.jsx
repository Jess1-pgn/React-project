import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../config/api';
import './FormatorForm.css';

const AddFormator = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    expertise: '',
    bio: '',
    specializations: [],
    remarks: '',
    avatar: '',
  });

  const [competenceInput, setCompetenceInput] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddCompetence = () => {
    if (competenceInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        specializations: [...prev.specializations, competenceInput],
      }));
      setCompetenceInput('');
    }
  };

  const handleRemoveCompetence = (index) => {
    setFormData((prev) => ({
      ...prev,
      specializations: prev.specializations.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (formData.specializations.length === 0) {
      setError('Veuillez ajouter au moins une compétence');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.post('/formateurs', {
        ...formData,
      });

      setSuccessMessage('Formateur ajouté avec succès!');
      setTimeout(() => {
        navigate('/admin/formateurs');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'ajout du formateur');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-formator-container">
      <div className="form-header">
        <h1>➕ Ajouter un nouveau formateur</h1>
        <p>Remplissez les détails du formateur et ses compétences</p>
      </div>

      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <form onSubmit={handleSubmit} className="formator-form">
        {/* Informations personnelles */}
        <fieldset className="form-section">
          <legend>👤 Informations personnelles</legend>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">Prénom *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Ex: Jean"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Nom *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Ex: Dupont"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="jean.dupont@exemple.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Téléphone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+33 6 XX XX XX XX"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="avatar">Avatar (URL)</label>
            <input
              type="url"
              id="avatar"
              name="avatar"
              value={formData.avatar}
              onChange={handleInputChange}
              placeholder="https://exemple.com/avatar.jpg"
            />
          </div>
        </fieldset>

        {/* Professionnel */}
        <fieldset className="form-section">
          <legend>💼 Profil professionnel</legend>

          <div className="form-group">
            <label htmlFor="expertise">Domaine d'expertise</label>
            <input
              type="text"
              id="expertise"
              name="expertise"
              value={formData.expertise}
              onChange={handleInputChange}
              placeholder="Ex: Développement Web et Mobile"
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Biographie</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Décrivez votre expérience et vos réalisations..."
              rows="4"
            />
          </div>
        </fieldset>

        {/* Compétences */}
        <fieldset className="form-section">
          <legend>🎯 Compétences et mots-clés *</legend>

          <div className="form-group">
            <label>Ajouter une compétence</label>
            <div className="input-group">
              <input
                type="text"
                value={competenceInput}
                onChange={(e) => setCompetenceInput(e.target.value)}
                placeholder="Ex: React, JavaScript, Node.js"
                onKeyPress={(e) => e.key === 'Enter' && handleAddCompetence()}
              />
              <button
                type="button"
                onClick={handleAddCompetence}
                className="add-btn"
              >
                Ajouter
              </button>
            </div>
          </div>

          {formData.specializations.length > 0 && (
            <div className="items-list">
              {formData.specializations.map((skill, index) => (
                <div key={index} className="skill-tag">
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveCompetence(index)}
                    className="remove-btn"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </fieldset>

        {/* Remarques */}
        <fieldset className="form-section">
          <legend>📝 Remarques et notes</legend>

          <div className="form-group">
            <label htmlFor="remarks">Remarques internes</label>
            <textarea
              id="remarks"
              name="remarks"
              value={formData.remarks}
              onChange={handleInputChange}
              placeholder="Notes additionnelles sur le formateur (non visibles publiquement)..."
              rows="5"
            />
          </div>
        </fieldset>

        {/* Actions */}
        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/admin/formateurs')}
            className="cancel-btn"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'En cours...' : 'Ajouter le formateur'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFormator;
