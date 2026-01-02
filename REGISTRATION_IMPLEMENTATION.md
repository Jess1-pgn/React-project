# Guide d'implémentation - Système d'Inscription

## 📋 Vue d'ensemble technique

Ce guide détaille l'implémentation technique du système d'inscription aux formations pour les individus.

## 🏗️ Architecture

```
Registration System
├── HomePage.jsx (Public - Affichage formations)
├── RegisterParticipant.jsx (Public - Formulaire d'inscription)
├── ParticipantManagement.jsx (Admin - Gestion des inscriptions)
└── participantService.js (Couche API)
```

## 📝 Composants détaillés

### 1. HomePage.jsx

**Responsabilité :** Afficher les formations disponibles avec recherche et filtrage

**État du composant :**
```javascript
const [formations, setFormations] = useState([]);
const [filteredFormations, setFilteredFormations] = useState([]);
const [searchQuery, setSearchQuery] = useState('');
const [selectedLevel, setSelectedLevel] = useState('');
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
```

**Fonctions clés :**

```javascript
// Charger les formations au montage
useEffect(() => {
  loadFormations();
}, []);

const loadFormations = async () => {
  try {
    setLoading(true);
    const data = await formationService.getAllFormations();
    // Filtrer uniquement les formations pour individus
    const publicFormations = data.filter(f => f.isPublic !== false);
    setFormations(publicFormations);
    setFilteredFormations(publicFormations);
  } catch (err) {
    setError('Erreur lors du chargement des formations');
  } finally {
    setLoading(false);
  }
};

// Recherche en temps réel
const handleSearch = (query) => {
  setSearchQuery(query);
  filterFormations(query, selectedLevel);
};

// Filtrage par niveau
const handleLevelFilter = (level) => {
  setSelectedLevel(level);
  filterFormations(searchQuery, level);
};

const filterFormations = (query, level) => {
  let results = formations;

  // Recherche multi-champs
  if (query.trim()) {
    results = results.filter(f =>
      f.title.toLowerCase().includes(query.toLowerCase()) ||
      (f.description && f.description.toLowerCase().includes(query.toLowerCase())) ||
      (f.objectives && f.objectives.some(obj =>
        obj.toLowerCase().includes(query.toLowerCase())
      ))
    );
  }

  // Filtrage par niveau
  if (level) {
    results = results.filter(f => f.level === level);
  }

  setFilteredFormations(results);
};

// Navigation vers inscription
const handleRegisterClick = (formationId) => {
  navigate(`/register/${formationId}`);
};
```

**Rendu :**
- Grille de cards responsives
- Image, niveau (badge couleur), titre
- Métadonnées : durée, coût
- Liste des objectifs (3 premiers + "X supplémentaires")
- Bouton "S'inscrire à cette formation"

### 2. RegisterParticipant.jsx

**Responsabilité :** Formulaire d'inscription avec validation et récapitulatif

**État du composant :**
```javascript
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
```

**Validations :**
```javascript
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhone = (phone) => {
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
  
  // Vérifications
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
    setError('Vous devez avoir au moins 16 ans');
    return;
  }

  try {
    setLoading(true);
    await participantService.registerForFormation(formData);
    
    setSuccess('✅ Inscription réussie!');
    
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

    // Redirection après 2 secondes
    setTimeout(() => {
      navigate('/');
    }, 2000);
  } catch (err) {
    setError(err.response?.data?.message || 'Erreur lors de l\'inscription');
  } finally {
    setLoading(false);
  }
};
```

**Structure du formulaire :**
- Récapitulatif de la formation (image, titre, niveau, durée, coût)
- 2 fieldsets : "Informations personnelles" et "Coordonnées"
- Inputs avec types appropriés (text, date, email, tel)
- Boutons : S'inscrire, Annuler

### 3. ParticipantManagement.jsx

**Responsabilité :** Gestion administrative des inscriptions et assignation des formateurs

**État du composant :**
```javascript
const [groups, setGroups] = useState([]);
const [formators, setFormators] = useState([]);
const [selectedFormation, setSelectedFormation] = useState('');
const [selectedFormator, setSelectedFormator] = useState('');
const [searchQuery, setSearchQuery] = useState('');
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
const [success, setSuccess] = useState('');
const [expandedFormation, setExpandedFormation] = useState(null);
const [assigningFormator, setAssigningFormator] = useState(null);
```

**Chargement des données :**
```javascript
useEffect(() => {
  loadData();
}, []);

const loadData = async () => {
  try {
    setLoading(true);
    
    // Appels parallèles
    const [groupsData, formationsData, formatorsData] = await Promise.all([
      participantService.getGroups(),
      formationService.getAllFormations(),
      formatorService.getAllFormators()
    ]);

    // Enrichissement des groupes
    const enrichedGroups = await Promise.all(
      groupsData.map(async (group) => {
        const formation = formationsData.find(f => f.id === group.formationId);
        return {
          ...group,
          formation: formation
        };
      })
    );

    setGroups(enrichedGroups);
    setFormators(formatorsData);
  } catch (err) {
    setError('Erreur lors du chargement');
  } finally {
    setLoading(false);
  }
};
```

**Assignation du formateur :**
```javascript
const handleAssignFormator = async () => {
  if (!assigningFormator || !selectedFormator) {
    setError('Veuillez sélectionner un formateur');
    return;
  }

  try {
    setLoading(true);
    await participantService.assignFormatorToGroup({
      formationId: assigningFormator,
      formatorId: selectedFormator
    });

    setSuccess('✅ Formateur assigné avec succès!');
    setAssigningFormator(null);
    setSelectedFormator('');
    loadData(); // Rechargement
  } catch (err) {
    setError(err.response?.data?.message || 'Erreur lors de l\'assignation');
  } finally {
    setLoading(false);
  }
};
```

**Structure du rendu :**
- **Statistiques** : Cartes avec Total inscrits, Formations ouvertes, Groupes avec formateur
- **Recherche/Filtrage** : Input texte et select formation
- **Groupes dépliables** :
  - En-tête : Nom formation + nombre participants
  - Détails (au clic) :
    - Infos formation (niveau, durée, coût)
    - Section assignation formateur
    - Table des participants avec actions

## 🔌 Service API - participantService.js

```javascript
import api from '../config/api';

const ENDPOINT = '/participants';

const participantService = {
  // Inscription
  registerForFormation: (data) => 
    api.post(`${ENDPOINT}/register`, data),

  // Gestion de base
  getAllParticipants: () => 
    api.get(ENDPOINT),
  getParticipantById: (id) => 
    api.get(`${ENDPOINT}/${id}`),
  getParticipantsByFormation: (formationId) => 
    api.get(`${ENDPOINT}/formation/${formationId}`),
  updateParticipant: (id, data) => 
    api.put(`${ENDPOINT}/${id}`, data),
  deleteParticipant: (id) => 
    api.delete(`${ENDPOINT}/${id}`),

  // Groupes et formateurs
  getGroups: () => 
    api.get(`${ENDPOINT}/groups/all`),
  assignFormatorToGroup: (groupData) => 
    api.post(`${ENDPOINT}/assign-formator`, groupData),
  removeFormatorFromGroup: (formationId) => 
    api.delete(`${ENDPOINT}/group/${formationId}/formator`),
  getGroupFormator: (formationId) => 
    api.get(`${ENDPOINT}/group/${formationId}/formator`),

  // Avancées
  searchParticipants: (query) => 
    api.get(`${ENDPOINT}/search`, { params: { q: query } }),
  getParticipantsByCity: (city) => 
    api.get(`${ENDPOINT}/city/${city}`),
  exportParticipants: (formationId, format = 'pdf') => 
    api.get(`${ENDPOINT}/formation/${formationId}/export`, { 
      params: { format },
      responseType: 'blob'
    }),
  sendEmailToGroup: (formationId, emailData) => 
    api.post(`${ENDPOINT}/group/${formationId}/send-email`, emailData),
  getRegistrationStats: () => 
    api.get(`${ENDPOINT}/stats`),
  markAsPresent: (participantId, sessionDate) => 
    api.post(`${ENDPOINT}/${participantId}/attendance`, { sessionDate }),
  getAttendanceHistory: (participantId) => 
    api.get(`${ENDPOINT}/${participantId}/attendance`)
};

export default participantService;
```

## 🎨 Fichiers CSS

### HomePage.css
```css
/* Gradient principal Purple/Indigo */
.home-page-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* En-tête */
.home-header {
  text-align: center;
  color: white;
  animation: slideDown 0.6s ease-out;
}

/* Recherche et filtres */
.search-filter-container {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 1200px;
  margin: 0 auto 3rem;
}

.search-box input {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.search-box input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* Filtres par niveau */
.level-filter {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.level-filter button {
  padding: 0.5rem 1.25rem;
  border: 2px solid #ddd;
  background: white;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.level-filter button:hover {
  border-color: #667eea;
  color: #667eea;
}

.level-filter button.active {
  color: white;
  border-color: transparent;
}

/* Grille de formations */
.formations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.formation-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.formation-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.formation-image {
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;
  position: relative;
}

.formation-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.formation-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.formation-card h2 {
  padding: 1.5rem 1.5rem 0.5rem;
  margin: 0;
  color: #333;
  font-size: 1.3rem;
}

.description {
  padding: 0 1.5rem;
  color: #666;
  font-size: 0.95rem;
  line-height: 1.5;
}

.formation-meta {
  display: flex;
  gap: 1.5rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #eee;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
}

.objectives {
  padding: 1rem 1.5rem;
}

.objectives h4 {
  margin: 0 0 0.5rem 0;
  color: #667eea;
}

.objectives ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.objectives li {
  padding: 0.25rem 0 0.25rem 1.25rem;
  color: #666;
  position: relative;
}

.objectives li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #667eea;
  font-weight: bold;
}

.objectives li.more {
  font-style: italic;
  color: #999;
}

.register-button {
  margin: 1.5rem 1.5rem;
  padding: 0.875rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  width: calc(100% - 3rem);
}

.register-button:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}
```

### RegisterParticipant.css
```css
.register-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 2rem;
}

.back-button {
  display: inline-block;
  margin-bottom: 2rem;
  padding: 0.75rem 1.5rem;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-button:hover {
  transform: translateX(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.register-content {
  max-width: 800px;
  margin: 0 auto;
}

/* Récapitulatif formation */
.formation-summary {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  margin-bottom: 2rem;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  padding: 2rem;
}

.summary-image {
  width: 100%;
  height: 250px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.summary-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.summary-info h2 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.5rem;
}

.summary-meta {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.summary-meta p {
  margin: 0;
  color: #666;
}

/* Formulaire */
.register-form {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.register-form h3 {
  margin: 0 0 2rem 0;
  color: #333;
  text-align: center;
  font-size: 1.5rem;
}

/* Messages */
.error-message {
  background: #fee;
  color: #c33;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  border-left: 4px solid #e74c3c;
}

.success-message {
  background: #efe;
  color: #3c3;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  border-left: 4px solid #27ae60;
}

/* Fieldsets */
fieldset {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  background: #f9f9f9;
}

legend {
  font-size: 1.1rem;
  font-weight: bold;
  color: #667eea;
  padding: 0 0.5rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.required::after {
  content: ' *';
  color: #e74c3c;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* Actions */
.form-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 2rem;
}

.form-actions button {
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.form-actions button[type="submit"] {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.form-actions button[type="submit"]:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.form-actions button[type="button"] {
  background: #f0f0f0;
  color: #333;
}

.form-actions button[type="button"]:hover:not(:disabled) {
  background: #e0e0e0;
}
```

### ParticipantManagement.css
(Voir le fichier CSS créé séparément - Contient statistiques, groupes dépliables, tables responsives, etc.)

## 🔄 Intégration des routes

Routes à ajouter dans App.jsx ou routes.jsx :

```javascript
import HomePage from './components/home/HomePage';
import RegisterParticipant from './components/participant/RegisterParticipant';
import ParticipantManagement from './components/participant/ParticipantManagement';

// Routes publiques
<Route path="/" element={<HomePage />} />
<Route path="/register/:formationId" element={<RegisterParticipant />} />

// Routes protégées (Admin/Assistant)
<Route path="/admin/participants" element={<PrivateRoute><ParticipantManagement /></PrivateRoute>} />
```

## 📊 Intégration Dashboards

### AdminDashboard
```javascript
<div className="dashboard-card">
  <h3>👥 Gestion des Inscriptions</h3>
  <p>Voir les inscriptions et assigner les formateurs</p>
  <button onClick={() => navigate('/admin/participants')}>Gérer</button>
</div>
```

### AssistantDashboard
```javascript
<div className="dashboard-card">
  <h3>👥 Gestion des Inscriptions</h3>
  <p>Voir les inscriptions et assigner les formateurs</p>
  <button onClick={() => navigate('/admin/participants')}>Gérer</button>
</div>
```

## ✅ Checklist de déploiement

- [ ] Routes configurées (/, /register/:formationId, /admin/participants)
- [ ] Composants HomePage, RegisterParticipant, ParticipantManagement créés
- [ ] CSS files liés correctement
- [ ] participantService.js créé avec tous les endpoints
- [ ] Backend API /api/participants implémenté
- [ ] Dashboards mis à jour avec boutons
- [ ] PrivateRoute appliquée à /admin/participants
- [ ] Validations email et téléphone testées
- [ ] Âge minimum 16 ans vérifié
- [ ] Formation accessible dans RegisterParticipant
- [ ] Assignation des formateurs fonctionnelle
- [ ] Tests locaux effectués

---

**Version :** 1.0  
**Dernière mise à jour :** 2 Janvier 2026
