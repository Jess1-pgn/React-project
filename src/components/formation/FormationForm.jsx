import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../config/api';
import './FormationForm.css';

const FormationForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    level: 'beginner',
    hours: '',
    instructor: user?.firstName + ' ' + user?.lastName || '',
    startDate: '',
    endDate: '',
    maxParticipants: '',
    imageUrl: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      // Charger la formation pour édition
      const loadFormation = async () => {
        try {
          setLoading(true);
          const response = await api.get(`/formations/${id}`);
          setFormData(response.data);
        } catch (error) {
          setErrors({ submit: 'Erreur lors du chargement de la formation' });
        } finally {
          setLoading(false);
        }
      };
      loadFormation();
    }
  }, [id]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Le titre est requis';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'La description est requise';
    }
    if (!formData.hours || formData.hours <= 0) {
      newErrors.hours = 'Le nombre d\'heures doit être positif';
    }
    if (!formData.startDate) {
      newErrors.startDate = 'La date de début est requise';
    }
    if (!formData.endDate) {
      newErrors.endDate = 'La date de fin est requise';
    }
    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      newErrors.endDate = 'La date de fin doit être après la date de début';
    }
    if (!formData.maxParticipants || formData.maxParticipants <= 0) {
      newErrors.maxParticipants = 'Le nombre max de participants doit être positif';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Effacer l'erreur pour ce champ une fois qu'on modifie
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const payload = {
        ...formData,
        hours: parseInt(formData.hours),
        maxParticipants: parseInt(formData.maxParticipants),
        instructor: user?.firstName + ' ' + user?.lastName,
      };

      if (id) {
        // Mise à jour
        await api.put(`/formations/${id}`, payload);
      } else {
        // Création
        await api.post('/formations', payload);
      }

      // Rediriger vers la liste des formations
      const redirectPath = user?.role?.toLowerCase() === 'formateur' 
        ? '/formateur/trainings' 
        : '/admin/formations';
      navigate(redirectPath);
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || 'Erreur lors de l\'enregistrement',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && id) {
    return <div className="loading-spinner"><p>Chargement...</p></div>;
  }

  return (
    <div className="formation-form-container">
      <div className="form-header">
        <h1>{id ? 'Modifier la formation' : 'Ajouter une nouvelle formation'}</h1>
        <p>Remplissez les informations ci-dessous pour créer ou modifier une formation</p>
      </div>

      <form onSubmit={handleSubmit} className="formation-form">
        <div className="form-group">
          <label htmlFor="title">Titre de la formation *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Ex: React Avancé"
            className={errors.title ? 'error' : ''}
          />
          {errors.title && <span className="error-text">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Décrivez le contenu et les objectifs de la formation..."
            rows="4"
            className={errors.description ? 'error' : ''}
          />
          {errors.description && <span className="error-text">{errors.description}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="level">Niveau *</label>
            <select
              id="level"
              name="level"
              value={formData.level}
              onChange={handleChange}
            >
              <option value="beginner">Débutant</option>
              <option value="intermediate">Intermédiaire</option>
              <option value="advanced">Avancé</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="hours">Durée (heures) *</label>
            <input
              type="number"
              id="hours"
              name="hours"
              value={formData.hours}
              onChange={handleChange}
              placeholder="Ex: 40"
              min="1"
              className={errors.hours ? 'error' : ''}
            />
            {errors.hours && <span className="error-text">{errors.hours}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="startDate">Date de début *</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className={errors.startDate ? 'error' : ''}
            />
            {errors.startDate && <span className="error-text">{errors.startDate}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="endDate">Date de fin *</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className={errors.endDate ? 'error' : ''}
            />
            {errors.endDate && <span className="error-text">{errors.endDate}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="maxParticipants">Nombre max de participants *</label>
            <input
              type="number"
              id="maxParticipants"
              name="maxParticipants"
              value={formData.maxParticipants}
              onChange={handleChange}
              placeholder="Ex: 30"
              min="1"
              className={errors.maxParticipants ? 'error' : ''}
            />
            {errors.maxParticipants && <span className="error-text">{errors.maxParticipants}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="instructor">Instructeur</label>
            <input
              type="text"
              id="instructor"
              name="instructor"
              value={formData.instructor}
              onChange={handleChange}
              placeholder="Nom de l'instructeur"
              disabled
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">URL de l'image</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>

        {errors.submit && <div className="error-message">{errors.submit}</div>}

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn-cancel"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn-submit"
          >
            {loading ? 'Enregistrement...' : id ? 'Modifier' : 'Créer'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormationForm;
