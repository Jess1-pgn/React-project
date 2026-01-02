# Guide d'implémentation - Gestion des Entreprises

## 📋 Vue d'ensemble technique

Ce guide détaille l'implémentation technique du système de gestion des entreprises (Entreprise Management) pour l'application de gestion de formations.

## 🏗️ Architecture

### Composants
```
Entreprise Management System
├── AddEntreprise.jsx              (Formulaire ajout)
├── EditEntreprise.jsx             (Formulaire modification)
├── EntrepriseManagement.jsx       (Liste & gestion)
├── EntrepriseDetails.jsx          (Affichage détail)
└── Services/
    └── entrepriseService.js       (Couche API)
```

### Flux de données
```
User Input
    ↓
React Component (useState)
    ↓
Form Handling (handleInputChange, handleSubmit)
    ↓
Validation (Email regex, Required fields)
    ↓
API Service Call (Axios)
    ↓
Backend (HTTP Request)
    ↓
Response Handling (Success/Error messages)
```

## 📝 Implémentation détaillée

### 1. AddEntreprise.jsx

**Responsabilité :** Afficher le formulaire d'ajout avec validation

**Structure du composant :**
```javascript
const [formData, setFormData] = useState({
  name: '',
  address: '',
  city: '',
  postalCode: '',
  phone: '',
  email: '',
  website: '',
  sector: '',
  description: '',
  logo: '',
  numberOfEmployees: ''
});

const [error, setError] = useState('');
const [success, setSuccess] = useState('');
const [loading, setLoading] = useState(false);
```

**Fonctions clés :**
```javascript
// Gère les changements d'input
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};

// Valide le format email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Soumet le formulaire
const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Validations
  if (!formData.name || !formData.address || !formData.city || 
      !formData.phone || !formData.email) {
    setError('Tous les champs obligatoires doivent être remplis');
    return;
  }
  
  if (!isValidEmail(formData.email)) {
    setError('Format email invalide');
    return;
  }
  
  // Appel API
  try {
    setLoading(true);
    const response = await entrepriseService.createEntreprise(formData);
    setSuccess('Entreprise créée avec succès');
    setTimeout(() => navigate('/admin/entreprises'), 1000);
  } catch (err) {
    setError(err.response?.data?.message || 'Erreur lors de la création');
  } finally {
    setLoading(false);
  }
};
```

**Éléments HTML :**
- Fieldset pour regrouper les champs par section
- Legend pour titrer les sections
- Inputs de type : text, email, tel, url, number, textarea
- Boutons : Créer (submit), Annuler (navigate back)
- Messages d'erreur et de succès

### 2. EditEntreprise.jsx

**Responsabilité :** Afficher le formulaire de modification préchargé

**Différences avec AddEntreprise :**
```javascript
useEffect(() => {
  const fetchEntreprise = async () => {
    try {
      setLoading(true);
      const data = await entrepriseService.getEntrepriseById(id);
      setFormData(data);
    } catch (err) {
      setError('Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };
  
  fetchEntreprise();
}, [id]);

// handleSubmit appelle updateEntreprise au lieu de createEntreprise
const handleSubmit = async (e) => {
  e.preventDefault();
  // ... validations ...
  
  try {
    await entrepriseService.updateEntreprise(id, formData);
    setSuccess('Entreprise mise à jour avec succès');
    setTimeout(() => navigate('/admin/entreprises'), 1000);
  } catch (err) {
    setError('Erreur lors de la mise à jour');
  }
};
```

### 3. EntrepriseManagement.jsx

**Responsabilité :** Afficher liste, recherche, filtrage et actions CRUD

**État du composant :**
```javascript
const [entreprises, setEntreprises] = useState([]);
const [filteredEntreprises, setFilteredEntreprises] = useState([]);
const [searchQuery, setSearchQuery] = useState('');
const [selectedSector, setSelectedSector] = useState('');
const [sectors, setSectors] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
```

**Fonctionnalités principales :**

```javascript
// Charger les entreprises au montage
useEffect(() => {
  loadEntreprises();
  loadSectors();
}, []);

const loadEntreprises = async () => {
  try {
    setLoading(true);
    const data = await entrepriseService.getAllEntreprises();
    setEntreprises(data);
    setFilteredEntreprises(data);
  } catch (err) {
    setError('Erreur lors du chargement');
  } finally {
    setLoading(false);
  }
};

// Recherche en temps réel
const handleSearch = (query) => {
  setSearchQuery(query);
  
  let results = entreprises;
  
  if (query.trim()) {
    results = results.filter(e =>
      e.name.toLowerCase().includes(query.toLowerCase()) ||
      e.city.toLowerCase().includes(query.toLowerCase()) ||
      e.email.toLowerCase().includes(query.toLowerCase())
    );
  }
  
  if (selectedSector) {
    results = results.filter(e => e.sector === selectedSector);
  }
  
  setFilteredEntreprises(results);
};

// Filtrage par secteur
const handleSectorFilter = (sector) => {
  setSelectedSector(sector);
  
  let results = entreprises;
  
  if (searchQuery.trim()) {
    results = results.filter(e =>
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  if (sector) {
    results = results.filter(e => e.sector === sector);
  }
  
  setFilteredEntreprises(results);
};

// Suppression
const handleDelete = async (id) => {
  if (window.confirm('Êtes-vous sûr?')) {
    try {
      await entrepriseService.deleteEntreprise(id);
      loadEntreprises(); // Rechargez la liste
    } catch (err) {
      setError('Erreur lors de la suppression');
    }
  }
};
```

**Affichage en grille :**
```javascript
<div className="entreprise-grid">
  {filteredEntreprises.map(entreprise => (
    <div key={entreprise.id} className="entreprise-card">
      {entreprise.logo && (
        <div className="logo-container">
          <img src={entreprise.logo} alt={entreprise.name} />
        </div>
      )}
      <h3>{entreprise.name}</h3>
      {entreprise.sector && <span className="sector-badge">{entreprise.sector}</span>}
      
      <div className="contact-details">
        <p><strong>Ville:</strong> {entreprise.city}</p>
        <p><strong>Téléphone:</strong> <a href={`tel:${entreprise.phone}`}>{entreprise.phone}</a></p>
        <p><strong>Email:</strong> <a href={`mailto:${entreprise.email}`}>{entreprise.email}</a></p>
      </div>
      
      <div className="actions">
        <button onClick={() => navigate(`/admin/entreprises/${entreprise.id}`)}>👁️ Voir</button>
        <button onClick={() => navigate(`/admin/entreprises/edit/${entreprise.id}`)}>✏️ Modifier</button>
        <button onClick={() => handleDelete(entreprise.id)} className="delete-btn">🗑️ Supprimer</button>
      </div>
    </div>
  ))}
</div>
```

### 4. EntrepriseDetails.jsx

**Responsabilité :** Afficher les détails complets d'une entreprise

**Contenu affiché :**
```javascript
- En-tête : Logo large
- Titre : Nom de l'entreprise
- Secteur : Badge couleur
- Description : Texte complet
- Adresse : Rue, Ville, Code postal
- Contact : 
  - Téléphone (cliquable)
  - Email (cliquable)
  - Site web (lien)
- Nombre d'employés
- Boutons : Modifier, Retour
```

**Exemple de structure :**
```javascript
useEffect(() => {
  const fetchEntreprise = async () => {
    try {
      const data = await entrepriseService.getEntrepriseById(id);
      setEntreprise(data);
    } catch (err) {
      setError('Erreur lors du chargement');
    }
  };
  
  fetchEntreprise();
}, [id]);

return (
  <div className="entreprise-details-container">
    <button onClick={() => navigate('/admin/entreprises')}>← Retour</button>
    
    {entreprise.logo && (
      <div className="hero-section">
        <img src={entreprise.logo} alt={entreprise.name} />
      </div>
    )}
    
    <h1>{entreprise.name}</h1>
    {entreprise.sector && <span className="sector-badge">{entreprise.sector}</span>}
    
    <section className="address-section">
      <h2>Adresse</h2>
      <p>{entreprise.address}, {entreprise.city} {entreprise.postalCode}</p>
    </section>
    
    <section className="contact-section">
      <h2>Contact</h2>
      <div className="contact-grid">
        <div className="contact-item">
          <span>📱 Téléphone</span>
          <a href={`tel:${entreprise.phone}`}>{entreprise.phone}</a>
        </div>
        <div className="contact-item">
          <span>📧 Email</span>
          <a href={`mailto:${entreprise.email}`}>{entreprise.email}</a>
        </div>
        {entreprise.website && (
          <div className="contact-item">
            <span>🌐 Site web</span>
            <a href={entreprise.website} target="_blank" rel="noopener noreferrer">{entreprise.website}</a>
          </div>
        )}
      </div>
    </section>
    
    {entreprise.numberOfEmployees && (
      <section className="employees-section">
        <h2>Taille</h2>
        <p>{entreprise.numberOfEmployees} employés</p>
      </section>
    )}
    
    <button onClick={() => navigate(`/admin/entreprises/edit/${id}`)}>✏️ Modifier</button>
  </div>
);
```

## 🔌 Service API - entrepriseService.js

**Configuration :**
```javascript
import api from '../config/api';

const ENDPOINT = '/entreprises';

const entrepriseService = {
  // CRUD de base
  getAllEntreprises: () => api.get(ENDPOINT),
  getEntrepriseById: (id) => api.get(`${ENDPOINT}/${id}`),
  createEntreprise: (data) => api.post(ENDPOINT, data),
  updateEntreprise: (id, data) => api.put(`${ENDPOINT}/${id}`, data),
  deleteEntreprise: (id) => api.delete(`${ENDPOINT}/${id}`),
  
  // Requêtes spécialisées
  getEntreprisesBySector: (sector) => 
    api.get(`${ENDPOINT}/sector/${sector}`),
  getAllSectors: () => 
    api.get(`${ENDPOINT}/sectors/all`),
  getEntreprisesByCity: (city) => 
    api.get(`${ENDPOINT}/city/${city}`),
  searchEntreprises: (query) => 
    api.get(`${ENDPOINT}/search`, { params: { q: query } })
};

export default entrepriseService;
```

## 🎨 Fichiers CSS

### EntrepriseForm.css
```css
.entreprise-form-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-section {
  margin-bottom: 2rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 2rem;
}

.form-section legend {
  font-size: 1.2rem;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.required::after {
  content: ' *';
  color: #e74c3c;
}

.error {
  background-color: #fee;
  color: #c33;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  border-left: 4px solid #e74c3c;
}

.success {
  background-color: #efe;
  color: #3c3;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  border-left: 4px solid #27ae60;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.form-actions button {
  flex: 1;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.form-actions button[type="submit"] {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.form-actions button[type="submit"]:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.form-actions button[type="button"] {
  background: #f0f0f0;
  color: #333;
}

.form-actions button[type="button"]:hover {
  background: #e0e0e0;
}
```

### EntrepriseManagement.css
```css
.entreprise-management-container {
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.header {
  text-align: center;
  color: white;
  margin-bottom: 2rem;
}

.header h1 {
  font-size: 2.5rem;
  margin: 0;
}

.header p {
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 0.5rem 0 0 0;
}

.add-button {
  display: inline-block;
  background: white;
  color: #667eea;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
}

.add-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.search-filter-section {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.search-box {
  position: relative;
  margin-bottom: 1rem;
}

.search-box input {
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}

.search-box input:focus {
  outline: none;
  border-color: #667eea;
}

.sector-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.sector-filter button {
  padding: 0.5rem 1rem;
  border: 2px solid #ddd;
  background: white;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.sector-filter button.active,
.sector-filter button:hover {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.entreprise-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.entreprise-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.entreprise-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.logo-container {
  width: 100%;
  height: 180px;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.logo-container img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.entreprise-card h3 {
  padding: 1rem 1rem 0.5rem;
  margin: 0;
  font-size: 1.2rem;
  color: #333;
}

.sector-badge {
  display: inline-block;
  background: #667eea;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  margin: 0 1rem;
}

.contact-details {
  padding: 0 1rem 1rem;
  font-size: 0.9rem;
  color: #666;
}

.contact-details p {
  margin: 0.5rem 0;
}

.contact-details a {
  color: #667eea;
  text-decoration: none;
}

.actions {
  display: flex;
  padding: 1rem;
  gap: 0.5rem;
  border-top: 1px solid #eee;
}

.actions button {
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: #f0f0f0;
  transition: all 0.3s ease;
  font-size: 0.85rem;
}

.actions button:hover {
  background: #e0e0e0;
}

.actions button.delete-btn {
  background: #fee;
  color: #c33;
}

.actions button.delete-btn:hover {
  background: #fdd;
}

.empty-state {
  text-align: center;
  padding: 3rem 2rem;
  color: white;
}

.empty-state p {
  font-size: 1.2rem;
  margin: 1rem 0;
}
```

### EntrepriseDetails.css
```css
.entreprise-details-container {
  max-width: 800px;
  margin: 2rem auto;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.back-button {
  display: inline-block;
  margin: 1rem;
  padding: 0.5rem 1rem;
  background: #f0f0f0;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-button:hover {
  background: #e0e0e0;
}

.hero-section {
  width: 100%;
  height: 300px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-section img {
  max-width: 90%;
  max-height: 100%;
  object-fit: contain;
}

.details-content {
  padding: 2rem;
}

.details-content h1 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 2rem;
}

.details-content .sector-badge {
  display: inline-block;
  background: #667eea;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  margin-bottom: 1.5rem;
}

.details-section {
  margin-bottom: 2rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 2rem;
}

.details-section h2 {
  color: #667eea;
  font-size: 1.3rem;
  margin: 0 0 1rem 0;
}

.address-section p {
  color: #666;
  line-height: 1.6;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.contact-item {
  display: flex;
  flex-direction: column;
}

.contact-item span {
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
}

.contact-item a {
  color: #667eea;
  text-decoration: none;
  word-break: break-word;
}

.contact-item a:hover {
  text-decoration: underline;
}

.employees-section {
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 6px;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.action-buttons button {
  flex: 1;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-buttons button:first-child {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.action-buttons button:first-child:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}
```

## 🔄 Intégration des routes

Les routes doivent être ajoutées dans votre configuration de routage (ex: `App.jsx` ou `routes.jsx`):

```javascript
// Routes pour la gestion des entreprises
<Route path="/admin/entreprises" element={<EntrepriseManagement />} />
<Route path="/admin/entreprises/add" element={<AddEntreprise />} />
<Route path="/admin/entreprises/edit/:id" element={<EditEntreprise />} />
<Route path="/admin/entreprises/:id" element={<EntrepriseDetails />} />
```

## 📊 Points d'intégration

### Dashboard Admin
```javascript
<NavCard 
  title="🏢 Gestion des entreprises"
  description="Gérer les entreprises partenaires"
  onClick={() => navigate('/admin/entreprises')}
/>
```

### Dashboard Assistant
```javascript
<NavCard 
  title="🏢 Gestion des entreprises"
  description="Consulter et gérer les entreprises"
  onClick={() => navigate('/admin/entreprises')}
/>
```

## ✅ Checklist de déploiement

- [ ] Routes configurées dans App.jsx ou routes.jsx
- [ ] Composants importés correctement
- [ ] Service entrepriseService.js testé
- [ ] Backend API /api/entreprises opérationnel
- [ ] CSS files liés correctement
- [ ] PrivateRoute appliquée aux routes
- [ ] Dashboard buttons intégrées
- [ ] Tests en local effectués
- [ ] Validation email et champs obligatoires fonctionnelle

---

**Version :** 1.0  
**Dernière mise à jour :** 2 Janvier 2026
