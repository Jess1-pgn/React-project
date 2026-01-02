import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import formationService from '../../services/formationService';
import participantService from '../../services/participantService';
import './RegisterParticipant.css';

const RegisterParticipant = () => {
  const { formationId } = useParams();
  const navigate = useNavigate();

  const [formation, setFormation] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    city: '',
    email: '',
    phone: '',
    formationId: formationId
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Charger la formation
  useEffect(() => {
    const loadFormation = async () => {
      try {
        setLoading(true);
        const data = await formationService.getFormationById(formationId);
        setFormation(data);
        setError('');
      } catch (err) {
        console.error('Erreur lors du chargement de la formation:', err);
        setError('Formation non trouvée');
      } finally {
        setLoading(false);
      }
    };

    loadFormation();
  }, [formationId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone) => {
    // Accepte formats internationaux et locaux
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validations
    if (!formData.firstName.trim() || !formData.lastName.trim() || 
        !formData.birthDate || !formData.city.trim() || 
        !formData.email.trim() || !formData.phone.trim()) {
      setError('Tous les champs sont obligatoires');
      return;
    }

    if (!isValidEmail(formData.email)) {
      setError('Format email invalide');
      return;
    }

    if (!isValidPhone(formData.phone)) {
      setError('Format téléphone invalide');
      return;
    }

    const age = calculateAge(formData.birthDate);
    if (age < 16) {
      setError('Vous devez avoir au moins 16 ans pour vous inscrire');
      return;
    }

    try {
      setLoading(true);
      const response = await participantService.registerForFormation(formData);
      
      setSuccess('✅ Inscription réussie! Vérifiez votre email pour la confirmation.');
      
      // Réinitialiser le formulaire
      setFormData({
        firstName: '',
        lastName: '',
        birthDate: '',
        city: '',
        email: '',
        phone: '',
        formationId: formationId
      });

      // Rediriger vers l'accueil après 2 secondes
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      console.error('Erreur lors de l\'inscription:', err);
      setError(
        err.response?.data?.message || 
        'Erreur lors de l\'inscription. Veuillez réessayer.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formation) {
    return <div className="register-container loading">Chargement...</div>;
  }

  return (
    <div className="register-container">
      <button className="back-button" onClick={() => navigate('/')}>
        ← Retour aux formations
      </button>

      {formation && (
        <div className="register-content">
          {/* Récapitulatif de la formation */}
          <div className="formation-summary">
            {formation.image && (
              <div className="summary-image">
                <img src={formation.image} alt={formation.title} />
              </div>
            )}
            <div className="summary-info">
              <h2>{formation.title}</h2>
              <div className="summary-meta">
                <p><strong>Niveau :</strong> {formation.level}</p>
                <p><strong>Durée :</strong> {formation.hours} heures</p>
                <p><strong>Coût :</strong> {formation.cost}€</p>
              </div>
            </div>
          </div>

          {/* Formulaire d'inscription */}
          <form onSubmit={handleSubmit} className="register-form">
            <h3>Formulaire d'inscription</h3>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            {/* Informations personnelles */}
            <fieldset>
              <legend>Informations personnelles</legend>

              <div className="form-group">
                <label htmlFor="firstName" className="required">Prénom</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Jean"
                  maxLength={100}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName" className="required">Nom</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Dupont"
                  maxLength={100}
                />
              </div>

              <div className="form-group">
                <label htmlFor="birthDate" className="required">Date de naissance</label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="city" className="required">Ville</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Paris"
                  maxLength={100}
                />
              </div>
            </fieldset>

            {/* Coordonnées */}
            <fieldset>
              <legend>Coordonnées</legend>

              <div className="form-group">
                <label htmlFor="email" className="required">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="jean.dupont@example.com"
                  maxLength={255}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="required">Téléphone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+33 1 23 45 67 89"
                  maxLength={20}
                />
              </div>
            </fieldset>

            {/* Boutons */}
            <div className="form-actions">
              <button type="submit" disabled={loading}>
                {loading ? 'Inscription en cours...' : '✅ S\'inscrire'}
              </button>
              <button 
                type="button" 
                onClick={() => navigate('/')}
                disabled={loading}
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {error && !formation && (
        <div className="error-container">
          <p>{error}</p>
          <button onClick={() => navigate('/')}>Retour aux formations</button>
        </div>
      )}
    </div>
  );
};

export default RegisterParticipant;
