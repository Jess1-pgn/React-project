import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import formatorService from '../services/formatorService';
import './RegisterFormator.css';

const RegisterFormator = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    keywords: '',
    bio: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError('Veuillez entrer votre nom et prénom');
      setLoading(false);
      return;
    }

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Veuillez entrer un email valide');
      setLoading(false);
      return;
    }

    if (!formData.keywords.trim()) {
      setError('Veuillez entrer au moins un mot clé');
      setLoading(false);
      return;
    }

    try {
      await formatorService.registerExternalFormator(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.phone,
        formData.keywords,
        formData.bio
      );
      setSuccess(true);
      setTimeout(() => navigate('/'), 3000);
    } catch (err) {
      setError(err?.message || 'Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-formator-container">
      <div className="register-formator-card">
        <h1>👨‍🏫 Devenir Formateur</h1>
        <p className="subtitle">Rejoignez notre plateforme en tant que formateur</p>

        {success && (
          <div className="success-message">
            ✅ Inscription réussie! Nous examinerons votre candidature et vous contacterons sous peu.
            Redirection vers l'accueil...
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Informations personnelles</legend>

            <div className="form-row">
              <div className="form-group">
                <label>Prénom *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Votre prénom"
                  required
                />
              </div>
              <div className="form-group">
                <label>Nom *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre.email@exemple.com"
                  required
                />
              </div>
              <div className="form-group">
                <label>Téléphone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+33 6 12 34 56 78"
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Profil professionnel</legend>

            <div className="form-group">
              <label>Mots clés de spécialité *</label>
              <input
                type="text"
                name="keywords"
                value={formData.keywords}
                onChange={handleChange}
                placeholder="ex: Python, React, Data Science, Cloud AWS"
                required
              />
              <small>Entrez les domaines/technologies dans lesquels vous êtes expert</small>
            </div>

            <div className="form-group">
              <label>Biographie</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Parlez-nous de votre expérience, vos succès, votre approche pédagogique..."
                rows="6"
              />
              <small>{formData.bio.length}/1000 caractères</small>
            </div>
          </fieldset>

          <div className="form-actions">
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? '⏳ Inscription en cours...' : '✅ Soumettre ma candidature'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="cancel-btn"
            >
              Annuler
            </button>
          </div>
        </form>

        <p className="form-note">
          ⚠️ Votre candidature sera examinée par nos administrateurs. Vous recevrez une confirmation par email.
        </p>
      </div>
    </div>
  );
};

export default RegisterFormator;
