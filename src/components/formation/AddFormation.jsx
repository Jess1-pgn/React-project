import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../config/api';
import './FormationForm.css';

const AddFormation = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    hours: '',
    cost: '',
    objectives: [],
    program: [],
    maxParticipants: '',
    level: 'beginner',
    category: '',
    imageUrl: '',
    city: '',
    sector: '',
    startDate: '',
  });

  const [objectiveInput, setObjectiveInput] = useState('');
  const [programInput, setProgramInput] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddObjective = () => {
    if (objectiveInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        objectives: [...prev.objectives, objectiveInput],
      }));
      setObjectiveInput('');
    }
  };

  const handleRemoveObjective = (index) => {
    setFormData((prev) => ({
      ...prev,
      objectives: prev.objectives.filter((_, i) => i !== index),
    }));
  };

  const handleAddProgram = () => {
    if (programInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        program: [...prev.program, programInput],
      }));
      setProgramInput('');
    }
  };

  const handleRemoveProgram = (index) => {
    setFormData((prev) => ({
      ...prev,
      program: prev.program.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.description || !formData.hours || !formData.cost) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (formData.objectives.length === 0) {
      setError('Veuillez ajouter au moins un objectif');
      return;
    }

    if (formData.program.length === 0) {
      setError('Veuillez ajouter au moins un élément du programme');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.post('/formations', {
        ...formData,
        hours: parseInt(formData.hours),
        cost: parseFloat(formData.cost),
        maxParticipants: parseInt(formData.maxParticipants) || null,
      });

      setSuccessMessage('Formation ajoutée avec succès!');
      setTimeout(() => {
        navigate('/admin/formations');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'ajout de la formation');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-formation-container">
      <div className="form-header">
        <h1>➕ Ajouter une nouvelle formation</h1>
        <p>Remplissez tous les détails pour créer une formation publique</p>
      </div>

      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <form onSubmit={handleSubmit} className="formation-form">
        {/* Informations générales */}
        <fieldset className="form-section">
          <legend>📋 Informations générales</legend>

          <div className="form-group">
            <label htmlFor="title">Titre de la formation *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Ex: Introduction à React"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Décrivez brièvement la formation..."
              rows="4"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Catégorie/Secteur</label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="Ex: Développement Web"
              />
            </div>

            <div className="form-group">
              <label htmlFor="sector">Secteur d'activité</label>
              <input
                type="text"
                id="sector"
                name="sector"
                value={formData.sector}
                onChange={handleInputChange}
                placeholder="Ex: Informatique"
              />
            </div>

            <div className="form-group">
              <label htmlFor="level">Niveau *</label>
              <select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleInputChange}
              >
                <option value="beginner">Débutant</option>
                <option value="intermediate">Intermédiaire</option>
                <option value="advanced">Avancé</option>
              </select>
            </div>
          </div>
        </fieldset>

        {/* Détails pratiques & Localisation */}
        <fieldset className="form-section">
          <legend>⏱️ Détails pratiques & 📍 Localisation</legend>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="hours">Nombre d'heures *</label>
              <input
                type="number"
                id="hours"
                name="hours"
                value={formData.hours}
                onChange={handleInputChange}
                placeholder="Ex: 40"
                min="1"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="cost">Coût (€) *</label>
              <input
                type="number"
                id="cost"
                name="cost"
                value={formData.cost}
                onChange={handleInputChange}
                placeholder="Ex: 500"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="maxParticipants">Nombre max de participants</label>
              <input
                type="number"
                id="maxParticipants"
                name="maxParticipants"
                value={formData.maxParticipants}
                onChange={handleInputChange}
                placeholder="Ex: 30"
                min="1"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">Ville de la formation</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Ex: Paris"
              />
            </div>

            <div className="form-group">
              <label htmlFor="startDate">Date de début</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
              />
            </div>
          </div>

        {/* Objectifs */}
        <fieldset className="form-section">
          <legend>🎯 Objectifs d'apprentissage *</legend>

          <div className="form-group">
            <label>Ajouter un objectif</label>
            <div className="input-group">
              <input
                type="text"
                value={objectiveInput}
                onChange={(e) => setObjectiveInput(e.target.value)}
                placeholder="Ex: Comprendre les principes fondamentaux"
                onKeyPress={(e) => e.key === 'Enter' && handleAddObjective()}
              />
              <button
                type="button"
                onClick={handleAddObjective}
                className="add-btn"
              >
                Ajouter
              </button>
            </div>
          </div>

          {formData.objectives.length > 0 && (
            <div className="items-list">
              {formData.objectives.map((objective, index) => (
                <div key={index} className="item-tag">
                  <span>{objective}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveObjective(index)}
                    className="remove-btn"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </fieldset>

        {/* Programme détaillé */}
        <fieldset className="form-section">
          <legend>📚 Programme détaillé *</legend>

          <div className="form-group">
            <label>Ajouter un élément du programme</label>
            <div className="input-group">
              <input
                type="text"
                value={programInput}
                onChange={(e) => setProgramInput(e.target.value)}
                placeholder="Ex: Module 1 - Introduction (2h)"
                onKeyPress={(e) => e.key === 'Enter' && handleAddProgram()}
              />
              <button
                type="button"
                onClick={handleAddProgram}
                className="add-btn"
              >
                Ajouter
              </button>
            </div>
          </div>

          {formData.program.length > 0 && (
            <div className="items-list">
              {formData.program.map((item, index) => (
                <div key={index} className="item-tag program-item">
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveProgram(index)}
                    className="remove-btn"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </fieldset>

        {/* Image */}
        <fieldset className="form-section">
          <legend>🖼️ Image (optionnel)</legend>

          <div className="form-group">
            <label htmlFor="imageUrl">URL de l'image</label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </fieldset>

        {/* Actions */}
        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/admin/formations')}
            className="cancel-btn"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'En cours...' : 'Ajouter la formation'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFormation;
