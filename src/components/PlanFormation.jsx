import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../config/api';
import './PlanFormation.css';

const PlanFormation = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    formationId: '',
    formateurId: '',
    entrepriseId: '',
    startDate: '',
    endDate: '',
    location: '',
    maxParticipants: '',
    status: 'scheduled'
  });

  const [formations, setFormations] = useState([]);
  const [formateurs, setFormateurs] = useState([]);
  const [entreprises, setEntreprises] = useState([]);
  const [selectedFormation, setSelectedFormation] = useState(null);

  // Charger les données au montage
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [formResponse, formRes, entRes] = await Promise.all([
        api.get('/formations'),
        api.get('/formateurs'),
        api.get('/entreprises')
      ]);

      const normalize = (res) => {
        if (!res) return [];
        if (Array.isArray(res.data)) return res.data;
        return res.data?.data || [];
      };

      setFormations(normalize(formResponse));
      setFormateurs(normalize(formRes));
      setEntreprises(normalize(entRes));
    } catch (err) {
      setError('Erreur lors du chargement des données');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Si la formation change, mettre à jour la sélection
    if (name === 'formationId') {
      const formation = formations.find(f => f.id === value);
      setSelectedFormation(formation);
    }
  };

  const validateForm = () => {
    if (!formData.formationId) {
      setError('Veuillez sélectionner une formation');
      return false;
    }
    if (!formData.formateurId) {
      setError('Veuillez sélectionner un formateur');
      return false;
    }
    if (!formData.entrepriseId) {
      setError('Veuillez sélectionner une entreprise');
      return false;
    }
    if (!formData.startDate) {
      setError('Veuillez sélectionner une date de début');
      return false;
    }
    if (!formData.endDate) {
      setError('Veuillez sélectionner une date de fin');
      return false;
    }
    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      setError('La date de fin doit être après la date de début');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const payload = {
        ...formData,
        maxParticipants: formData.maxParticipants ? parseInt(formData.maxParticipants) : null
      };

      await api.post('/formations-planifiees', payload);

      setSuccessMessage('Formation planifiée avec succès!');
      setTimeout(() => {
        navigate('/admin/formations');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la planification');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="plan-formation-container">
      <div className="form-header">
        <div className="header-actions">
          <div className="header-text">
            <h1>Planifier une Formation</h1>
            <p>Assignez un formateur et une entreprise à une formation</p>
          </div>
          <button
            onClick={() => navigate('/admin')}
            className="back-dashboard-btn"
            type="button"
          >
            ← Retour au tableau de bord
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <form onSubmit={handleSubmit} className="plan-formation-form">
        {/* Sélection de la formation */}
        <fieldset className="form-section">
          <legend>📚 Sélection de la formation</legend>

          <div className="form-group">
            <label htmlFor="formationId">Formation *</label>
            <select
              id="formationId"
              name="formationId"
              value={formData.formationId}
              onChange={handleInputChange}
              required
              className="form-select"
            >
              <option value="">-- Sélectionner une formation --</option>
              {formations.map(f => (
                <option key={f.id} value={f.id}>
                  {f.title} ({f.hours}h - {f.cost}€)
                </option>
              ))}
            </select>
          </div>

          {selectedFormation && (
            <div className="formation-info">
              <div className="info-row">
                <span className="label">Description:</span>
                <span className="value">{selectedFormation.description}</span>
              </div>
              <div className="info-row">
                <span className="label">Catégorie:</span>
                <span className="value">{selectedFormation.category || 'Non définie'}</span>
              </div>
              <div className="info-row">
                <span className="label">Niveau:</span>
                <span className="value">{selectedFormation.level || 'Non défini'}</span>
              </div>
            </div>
          )}
        </fieldset>

        {/* Sélection du formateur */}
        <fieldset className="form-section">
          <legend>👨‍🏫 Assignation du formateur</legend>

          <div className="form-group">
            <label htmlFor="formateurId">Formateur *</label>
            <select
              id="formateurId"
              name="formateurId"
              value={formData.formateurId}
              onChange={handleInputChange}
              required
              className="form-select"
            >
              <option value="">-- Sélectionner un formateur --</option>
              {formateurs.map(f => (
                <option key={f.id} value={f.id}>
                  {f.firstName} {f.lastName}
                </option>
              ))}
            </select>
          </div>
        </fieldset>

        {/* Sélection de l'entreprise */}
        <fieldset className="form-section">
          <legend>🏢 Assignation de l'entreprise</legend>

          <div className="form-group">
            <label htmlFor="entrepriseId">Entreprise *</label>
            <select
              id="entrepriseId"
              name="entrepriseId"
              value={formData.entrepriseId}
              onChange={handleInputChange}
              required
              className="form-select"
            >
              <option value="">-- Sélectionner une entreprise --</option>
              {entreprises.map(e => (
                <option key={e.id} value={e.id}>
                  {e.name} ({e.city})
                </option>
              ))}
            </select>
          </div>
        </fieldset>

        {/* Dates et lieu */}
        <fieldset className="form-section">
          <legend>📅 Dates et localisation</legend>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="startDate">Date de début *</label>
              <input
                type="datetime-local"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="endDate">Date de fin *</label>
              <input
                type="datetime-local"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                required
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="location">Lieu de formation</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Ex: Salle 101, Bâtiment A"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="maxParticipants">Nombre maximum de participants</label>
            <input
              type="number"
              id="maxParticipants"
              name="maxParticipants"
              value={formData.maxParticipants}
              onChange={handleInputChange}
              placeholder="Laissez vide pour pas de limite"
              min="1"
              className="form-input"
            />
          </div>
        </fieldset>

        {/* Statut */}
        <fieldset className="form-section">
          <legend>⚙️ Statut</legend>

          <div className="form-group">
            <label htmlFor="status">Statut de la planification</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="scheduled">Programmée</option>
              <option value="confirmed">Confirmée</option>
              <option value="in-progress">En cours</option>
              <option value="completed">Terminée</option>
              <option value="cancelled">Annulée</option>
            </select>
          </div>
        </fieldset>

        {/* Actions */}
        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/admin/formations')}
            className="btn-cancel"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn-submit"
          >
            {loading ? 'Planification en cours...' : '✓ Planifier la formation'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlanFormation;
