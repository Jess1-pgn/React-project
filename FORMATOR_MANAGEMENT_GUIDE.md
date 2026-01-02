# Guide de Gestion des Formateurs - Frontend

## 📋 Vue d'ensemble

Ce guide explique comment l'administrateur peut ajouter, modifier, voir et supprimer les formateurs avec leurs compétences et remarques.

## 🎯 Fonctionnalités principales

### 1. Ajouter un formateur
**Route:** `/admin/formateurs/add`

Les administrateurs peuvent créer un nouveau formateur en spécifiant :

#### Informations personnelles
- **Prénom** (obligatoire) : Le prénom du formateur
- **Nom** (obligatoire) : Le nom du formateur
- **Email** (obligatoire) : L'adresse email du formateur
- **Téléphone** : Le numéro de téléphone (optionnel)
- **Avatar** : URL d'une photo de profil (optionnel)

#### Profil professionnel
- **Domaine d'expertise** : Le domaine principal d'expertise (optionnel)
- **Biographie** : Description de l'expérience et des réalisations (optionnel)

#### Compétences et mots-clés (obligatoire)
- Au minimum 1 compétence requise
- Format : Mots-clés ou technologies
- Exemples : React, JavaScript, Node.js, Python, etc.
- Possibilité de supprimer les compétences avec le bouton ✕

#### Remarques internes
- **Remarques** : Notes non visibles publiquement (optionnel)
- Destinées à usage interne uniquement

### 2. Gérer les formateurs
**Route:** `/admin/formateurs`

#### Fonctionnalités disponibles:
- **Recherche** : Chercher par nom, email ou domaine d'expertise
- **Filtrage** : Filtrer par compétence
- **Affichage en grille** : Vue cards avec avatar
- **Actions rapides** :
  - ✏️ Modifier : Éditer le formateur
  - 👁️ Voir : Afficher les détails complets
  - 🗑️ Supprimer : Supprimer le formateur

### 3. Voir les détails d'un formateur
**Route:** `/admin/formateurs/{id}`

Affiche :
- Avatar du formateur
- Nom et domaine d'expertise
- Contact (email, téléphone)
- Biographie complète
- Liste des compétences avec checkmarks
- Remarques internes
- Boutons pour modifier ou retourner

### 4. Modifier un formateur
**Route:** `/admin/formateurs/edit/{id}`

Même interface que l'ajout, mais préchargée avec les données existantes.

## 📁 Structure des fichiers

```
src/
├── components/
│   ├── formator/
│   │   ├── AddFormator.jsx           # Page d'ajout
│   │   ├── EditFormator.jsx          # Page de modification
│   │   ├── FormatorManagement.jsx    # Gestion et listing
│   │   ├── FormatorDetails.jsx       # Affichage détaillé
│   │   ├── FormatorForm.css          # Styles du formulaire
│   │   ├── FormatorManagement.css    # Styles du listing
│   │   └── FormatorDetails.css       # Styles des détails
│   └── dashboard/
│       └── AdminDashboard.jsx        # Dashboard admin
├── services/
│   ├── formatorService.js            # Service API
│   └── authService.js                # Service authentification
└── config/
    └── api.js                        # Configuration Axios
```

## 🔑 Services API

Le fichier `src/services/formatorService.js` expose les méthodes suivantes :

```javascript
// Récupérer tous les formateurs
formatorService.getAllFormators()

// Récupérer un formateur par ID
formatorService.getFormatorById(id)

// Créer un nouveau formateur
formatorService.createFormator(formatorData)

// Mettre à jour un formateur
formatorService.updateFormator(id, formatorData)

// Supprimer un formateur
formatorService.deleteFormator(id)

// Filtrer par compétence
formatorService.getFormatorsBySkill(skill)

// Obtenir toutes les compétences
formatorService.getAllSkills()

// Assigner à une formation
formatorService.assignToFormation(formatorId, formationId)

// Retirer d'une formation
formatorService.removeFromFormation(formatorId, formationId)

// Récupérer les formations d'un formateur
formatorService.getFormatorFormations(formatorId)
```

## 📊 Structure des données Formateur

```javascript
{
  id: "uuid",
  firstName: "Jean",
  lastName: "Dupont",
  email: "jean.dupont@exemple.com",
  phone: "+33 6 XX XX XX XX",
  expertise: "Développement Web",
  bio: "Description de l'expérience...",
  specializations: [
    "React",
    "JavaScript",
    "Node.js",
    "..."
  ],
  remarks: "Notes internes sur le formateur",
  avatar: "https://...",
  createdAt: "2024-01-02T...",
  updatedAt: "2024-01-02T..."
}
```

## 🎨 Design et UX

- **Responsive** : Compatible mobile, tablette, desktop
- **Gradient** : Pink/Red (f093fb → f5576c)
- **Icônes** : Emojis pour meilleure lisibilité
- **Avatar** : Affichage circulaire avec initiales si pas d'image
- **Animations** : Transitions fluides et feedback visuel
- **Accessibilité** : Labels clairs, validation côté client

## 🚀 Intégration Backend

Les endpoints attendus sur le backend :

```
POST   /api/formateurs              # Créer
GET    /api/formateurs              # Lister
GET    /api/formateurs/{id}         # Détails
PUT    /api/formateurs/{id}         # Mettre à jour
DELETE /api/formateurs/{id}         # Supprimer
GET    /api/formateurs/skill/{skill}
GET    /api/formateurs/skills/all
POST   /api/formateurs/{id}/formations
DELETE /api/formateurs/{id}/formations/{formationId}
GET    /api/formateurs/{id}/formations
```

## 📝 Notes importantes

1. **Validation** : Au minimum 1 compétence obligatoire
2. **Email** : Format email validé côté client
3. **Avatar** : Les URLs d'image doivent être en HTTP/HTTPS
4. **Remarques** : Stockées mais non visibles publiquement
5. **Recherche** : Cherche dans nom, email et expertise

## 🔧 Configuration requise

- Node.js 14+
- React 18+
- React Router DOM 6+
- Axios
- Backend API fonctionnel sur `http://localhost:8080/api`

## 📱 Points d'accès

1. **Dashboard Admin** → Cliquer sur "Gestion des formateurs"
2. **URL directe** → `/admin/formateurs`
3. **Ajouter un formateur** → `/admin/formateurs/add`

## 🎓 Intégration avec les formations

Les formateurs peuvent être assignés à des formations :
- Un formateur peut avoir plusieurs formations
- Un formation peut avoir plusieurs formateurs
- Gestion via les endpoints d'assignation

---

**Dernière mise à jour :** 2 Janvier 2026  
**Version :** 1.0
