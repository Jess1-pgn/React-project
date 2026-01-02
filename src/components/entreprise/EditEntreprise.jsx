import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../config/api';
import './EntrepriseForm.css';

const EditEntreprise = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    email: '',
    website: '',
    description: '',
    logo: '',
    sector: '',
    numberOfEmployees: '',
  });

  useEffect(() => {
    fetchEntreprise();
  }, [id]);

  const fetchEntreprise = async () => {
    try {
      const response = await api.get(`/entreprises/${id}`);
      setFormData({
        name: response.data.name || '',
        address: response.data.address || '',
        city: response.data.city || '',
        postalCode: response.data.postalCode || '',
        phone: response.data.phone || '',
        email: response.data.email || '',
        website: response.data.website || '',
        description: response.data.description || '',
        logo: response.data.logo || '',
        sector: response.data.sector || '',
        numberOfEmployees: response.data.numberOfEmployees || '',
      });
      setError('');
    } catch (err) {
      setError('Erreur lors du chargement de l\'entreprise');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.address || !formData.city || !formData.phone || !formData.email) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Veuillez entrer une adresse email valide');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await api.put(`/entreprises/${id}`, {
        ...formData,
        numberOfEmployees: formData.numberOfEmployees ? parseInt(formData.numberOfEmployees) : null,
      });

      setSuccessMessage('Entreprise mise à jour avec succès!');
      setTimeout(() => {
        navigate('/admin/entreprises');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la mise à jour');
      console.error('Erreur:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="add-entreprise-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="add-entreprise-container">
      <div className="form-header">
        <h1>✏️ Modifier l'entreprise</h1>
        <p>Mettez à jour les informations de l'entreprise</p>
      </div>

      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <form onSubmit={handleSubmit} className="entreprise-form">
        {/* Informations de base */}
        <fieldset className="form-section">
          <legend>🏢 Informations de base</legend>

          <div className="form-group">
            <label htmlFor="name">Nom de l'entreprise *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Ex: Acme Corporation"
              required
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
              placeholder="Ex: Technologie, Finance, Santé..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Décrivez l'entreprise et ses activités..."
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="numberOfEmployees">Nombre d'employés</label>
            <input
              type="number"
              id="numberOfEmployees"
              name="numberOfEmployees"
              value={formData.numberOfEmployees}
              onChange={handleInputChange}
              placeholder="Ex: 150"
              min="1"
            />
          </div>
        </fieldset>

        {/* Adresse */}
        <fieldset className="form-section">
          <legend>📍 Adresse</legend>

          <div className="form-group">
            <label htmlFor="address">Adresse *</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Ex: 123 Rue de la Paix"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">Ville *</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Ex: Paris"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="postalCode">Code postal</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                placeholder="Ex: 75001"
              />
            </div>
          </div>
        </fieldset>

        {/* Contact */}
        <fieldset className="form-section">
          <legend>📞 Contact</legend>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Téléphone *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+33 1 XX XX XX XX"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="contact@exemple.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="website">Site web</label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              placeholder="https://www.exemple.com"
            />
          </div>
        </fieldset>

        {/* Logo */}
        <fieldset className="form-section">
          <legend>🖼️ Logo (optionnel)</legend>

          <div className="form-group">
            <label htmlFor="logo">URL du logo</label>
            <input
              type="url"
              id="logo"
              name="logo"
              value={formData.logo}
              onChange={handleInputChange}
              placeholder="https://exemple.com/logo.png"
            />
          </div>
        </fieldset>

        {/* Actions */}
        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/admin/entreprises')}
            className="cancel-btn"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="submit-btn"
            disabled={submitting}
          >
            {submitting ? 'En cours...' : 'Mettre à jour'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEntreprise;
