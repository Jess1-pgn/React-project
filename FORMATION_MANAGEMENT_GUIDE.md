# Guide de Gestion des Formations - Frontend

## 📋 Vue d'ensemble

Ce guide explique comment l'administrateur peut ajouter, modifier, voir et supprimer les formations publiques dans le système.

## 🎯 Fonctionnalités principales

### 1. Ajouter une formation
**Route:** `/admin/formations/add`

Les administrateurs peuvent créer une nouvelle formation en spécifiant :

#### Informations générales
- **Titre** (obligatoire) : Le nom de la formation
- **Description** (obligatoire) : Une description détaillée
- **Catégorie** : La catégorie de la formation (ex: Développement Web)
- **Niveau** (obligatoire) : Débutant, Intermédiaire ou Avancé

#### Détails pratiques
- **Nombre d'heures** (obligatoire) : La durée totale de la formation en heures
- **Coût** (obligatoire) : Le prix en euros
- **Nombre max de participants** : Limite optionnelle du nombre de participants

#### Contenu pédagogique
- **Objectifs d'apprentissage** (obligatoire) : Au minimum 1
  - Format : Liste d'objectifs à ajouter un par un
  - Bouton "Ajouter" pour inclure chaque objectif
  - Possibilité de supprimer les objectifs avec le bouton ✕

- **Programme détaillé** (obligatoire) : Au minimum 1 élément
  - Format : Liste numérotée des modules ou chapitres
  - Ex: "Module 1 - Introduction à React (8h)"
  - Possibilité de supprimer les éléments avec le bouton ✕

#### Ressources visuelles
- **Image** (optionnel) : URL d'une image représentative

### 2. Gérer les formations
**Route:** `/admin/formations`

#### Fonctionnalités disponibles:
- **Recherche** : Chercher une formation par titre ou description
- **Filtrage** : Filtrer par niveau (Débutant, Intermédiaire, Avancé)
- **Affichage en grille** : Vue cards responsive
- **Actions rapides** :
  - ✏️ Modifier : Éditer la formation
  - 👁️ Voir détails : Afficher les détails complets
  - 🗑️ Supprimer : Supprimer la formation

### 3. Voir les détails d'une formation
**Route:** `/admin/formations/{id}`

Affiche :
- Image de couverture
- Titre et niveau
- Métadonnées (heures, coût, max participants, catégorie)
- Description complète
- Liste complète des objectifs avec checkmarks
- Programme détaillé numéroté
- Boutons pour modifier ou retourner

### 4. Modifier une formation
**Route:** `/admin/formations/edit/{id}`

Même interface que l'ajout, mais préchargée avec les données existantes.

## 📁 Structure des fichiers

```
src/
├── components/
│   ├── formation/
│   │   ├── AddFormation.jsx          # Page d'ajout
│   │   ├── EditFormation.jsx         # Page de modification
│   │   ├── FormationManagement.jsx   # Gestion et listing
│   │   ├── FormationDetails.jsx      # Affichage détaillé
│   │   └── FormationForm.css         # Styles du formulaire
│   │   └── FormationManagement.css   # Styles du listing
│   │   └── FormationDetails.css      # Styles des détails
│   └── dashboard/
│       └── AdminDashboard.jsx        # Dashboard admin
├── services/
│   ├── formationService.js           # Service API
│   └── authService.js                # Service authentification
├── config/
│   ├── api.js                        # Configuration Axios
│   └── routes.jsx                    # Configuration des routes
└── context/
    └── AuthContext.jsx               # Contexte d'authentification
```

## 🔑 Services API

Le fichier `src/services/formationService.js` expose les méthodes suivantes :

```javascript
// Récupérer toutes les formations
formationService.getAllFormations()

// Récupérer une formation par ID
formationService.getFormationById(id)

// Créer une nouvelle formation
formationService.createFormation(formationData)

// Mettre à jour une formation
formationService.updateFormation(id, formationData)

// Supprimer une formation
formationService.deleteFormation(id)

// Filtrer par catégorie
formationService.getFormationsByCategory(category)

// Filtrer par niveau
formationService.getFormationsByLevel(level)

// Ajouter un participant
formationService.addParticipant(formationId, userId)

// Retirer un participant
formationService.removeParticipant(formationId, userId)

// Récupérer les participants
formationService.getParticipants(formationId)
```

## 🔐 Authentification et autorisation

- Les routes de gestion des formations sont protégées
- Seuls les utilisateurs avec le rôle `admin` peuvent y accéder
- Utilise le composant `<PrivateRoute>` pour la protection

## 📊 Structure des données Formation

```javascript
{
  id: "uuid",
  title: "Titre de la formation",
  description: "Description complète",
  hours: 40,
  cost: 500,
  objectives: [
    "Objectif 1",
    "Objectif 2",
    "..."
  ],
  program: [
    "Module 1 - Introduction",
    "Module 2 - Principes fondamentaux",
    "..."
  ],
  level: "beginner|intermediate|advanced",
  category: "Développement Web",
  imageUrl: "https://...",
  maxParticipants: 30,
  createdAt: "2024-01-02T...",
  updatedAt: "2024-01-02T..."
}
```

## 🎨 Design et UX

- **Responsive** : Compatible mobile, tablette, desktop
- **Gradient** : Purple/Indigo (667eea → 764ba2)
- **Icônes** : Emojis pour meilleure lisibilité
- **Animations** : Transitions fluides et feedback visuel
- **Accessibilité** : Labels clairs, validation côté client

## 🚀 Intégration Backend

Les endpoints attendus sur le backend :

```
POST   /api/formations              # Créer
GET    /api/formations              # Lister
GET    /api/formations/{id}         # Détails
PUT    /api/formations/{id}         # Mettre à jour
DELETE /api/formations/{id}         # Supprimer
GET    /api/formations/category/{category}
GET    /api/formations/level/{level}
POST   /api/formations/{id}/participants
DELETE /api/formations/{id}/participants/{userId}
GET    /api/formations/{id}/participants
```

## 📝 Notes importantes

1. **Validation** : Les champs obligatoires sont validés côté client
2. **Erreurs** : Messages d'erreur clairs et informatifs
3. **Feedback utilisateur** : Messages de succès après les actions
4. **Redirection** : Redirection automatique après succès
5. **Images** : Les URLs d'image doivent être en HTTP/HTTPS

## 🔧 Configuration requise

- Node.js 14+
- React 18+
- React Router DOM 6+
- Axios
- Backend API fonctionnel sur `http://localhost:8080/api`

## 📱 Points d'accès

1. **Dashboard Admin** → Cliquer sur "Gestion des formations"
2. **URL directe** → `/admin/formations`
3. **Ajouter une formation** → `/admin/formations/add`

---

**Dernière mise à jour :** 2 Janvier 2026
**Version :** 1.0
