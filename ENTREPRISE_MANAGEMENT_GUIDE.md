# Guide de Gestion des Entreprises - Frontend

## 📋 Vue d'ensemble

Ce guide explique comment l'admin ou l'assistant peuvent ajouter, modifier, voir et supprimer les entreprises partenaires avec leurs coordonnées complètes.

## 🎯 Fonctionnalités principales

### 1. Ajouter une entreprise
**Route:** `/admin/entreprises/add`

Les administrateurs et assistants peuvent créer une nouvelle entreprise en spécifiant :

#### Informations de base
- **Nom de l'entreprise** (obligatoire) : Le nom complet
- **Secteur d'activité** : Domaine d'activité (optionnel)
- **Description** : Présentation de l'entreprise (optionnel)
- **Nombre d'employés** : Effectif de l'entreprise (optionnel)

#### Adresse
- **Adresse** (obligatoire) : Rue et numéro
- **Ville** (obligatoire) : Ville de localisation
- **Code postal** : Code postal (optionnel)

#### Contact
- **Téléphone** (obligatoire) : Numéro de contact
- **Email** (obligatoire) : Adresse email avec validation
- **Site web** : URL du site internet (optionnel)

#### Logo
- **Logo** : URL d'un fichier image (optionnel)

### 2. Gérer les entreprises
**Route:** `/admin/entreprises`

#### Fonctionnalités disponibles:
- **Recherche** : Chercher par nom, ville ou email
- **Filtrage** : Filtrer par secteur d'activité
- **Affichage en grille** : Vue cards avec logo
- **Actions rapides** :
  - ✏️ Modifier : Éditer l'entreprise
  - 👁️ Voir : Afficher les détails complets
  - 🗑️ Supprimer : Supprimer l'entreprise

### 3. Voir les détails d'une entreprise
**Route:** `/admin/entreprises/{id}`

Affiche :
- Logo de l'entreprise
- Nom et secteur d'activité
- Description complète
- Adresse complète
- Coordonnées de contact (téléphone, email, site web)
- Nombre d'employés
- Boutons pour modifier ou retourner

### 4. Modifier une entreprise
**Route:** `/admin/entreprises/edit/{id}`

Même interface que l'ajout, mais préchargée avec les données existantes.

## 📁 Structure des fichiers

```
src/
├── components/
│   ├── entreprise/
│   │   ├── AddEntreprise.jsx            # Page d'ajout
│   │   ├── EditEntreprise.jsx           # Page de modification
│   │   ├── EntrepriseManagement.jsx     # Gestion et listing
│   │   ├── EntrepriseDetails.jsx        # Affichage détaillé
│   │   ├── EntrepriseForm.css           # Styles formulaire
│   │   ├── EntrepriseManagement.css     # Styles listing
│   │   └── EntrepriseDetails.css        # Styles détails
│   ├── dashboard/
│   │   ├── AdminDashboard.jsx           # Dashboard admin
│   │   └── AssistantDashboard.jsx       # Dashboard assistant
├── services/
│   └── entrepriseService.js             # Service API
└── config/
    └── api.js                           # Configuration Axios
```

## 🔑 Services API

Le fichier `src/services/entrepriseService.js` expose les méthodes suivantes :

```javascript
// Récupérer toutes les entreprises
entrepriseService.getAllEntreprises()

// Récupérer une entreprise par ID
entrepriseService.getEntrepriseById(id)

// Créer une nouvelle entreprise
entrepriseService.createEntreprise(entrepriseData)

// Mettre à jour une entreprise
entrepriseService.updateEntreprise(id, entrepriseData)

// Supprimer une entreprise
entrepriseService.deleteEntreprise(id)

// Filtrer par secteur
entrepriseService.getEntreprisesBySector(sector)

// Obtenir tous les secteurs
entrepriseService.getAllSectors()

// Filtrer par ville
entrepriseService.getEntreprisesByCity(city)

// Rechercher les entreprises
entrepriseService.searchEntreprises(query)
```

## 📊 Structure des données Entreprise

```javascript
{
  id: "uuid",
  name: "Acme Corporation",
  address: "123 Rue de la Paix",
  city: "Paris",
  postalCode: "75001",
  phone: "+33 1 XX XX XX XX",
  email: "contact@acme.com",
  website: "https://www.acme.com",
  description: "Description de l'entreprise",
  logo: "https://...",
  sector: "Technologie",
  numberOfEmployees: 150,
  createdAt: "2024-01-02T...",
  updatedAt: "2024-01-02T..."
}
```

## 🎨 Design et UX

- **Responsive** : Compatible mobile, tablette, desktop
- **Gradient** : Purple/Indigo (#667eea → #764ba2)
- **Logo** : Affichage en boîte carrée
- **Icônes** : Emojis pour meilleure lisibilité
- **Animations** : Transitions fluides et feedback visuel
- **Accessibilité** : Labels clairs, validation côté client

## 🔐 Sécurité & Autorisation

- Routes protégées par `<PrivateRoute>`
- Accessible à : Admin et Assistant
- Authentification requise
- Validation email côté client

## 🚀 Intégration Backend

Les endpoints attendus sur le backend :

```
POST   /api/entreprises              # Créer
GET    /api/entreprises              # Lister
GET    /api/entreprises/{id}         # Détails
PUT    /api/entreprises/{id}         # Mettre à jour
DELETE /api/entreprises/{id}         # Supprimer
GET    /api/entreprises/sector/{sector}
GET    /api/entreprises/sectors/all
GET    /api/entreprises/city/{city}
GET    /api/entreprises/search?q={query}
```

## ✨ Champs du formulaire

| Champ | Type | Obligatoire | Notes |
|-------|------|-------------|-------|
| Nom | text | ✅ | - |
| Adresse | text | ✅ | - |
| Ville | text | ✅ | - |
| Code postal | text | ❌ | - |
| Téléphone | tel | ✅ | Format libre |
| Email | email | ✅ | Validation format |
| Site web | url | ❌ | HTTP/HTTPS |
| Description | textarea | ❌ | - |
| Logo | url | ❌ | HTTP/HTTPS |
| Secteur | text | ❌ | Libre |
| Employés | number | ❌ | Min 1 |

## 📝 Notes importantes

1. **Validation email** : Format validé côté client
2. **Secteurs** : Libres, gérés en base
3. **Logo** : Les URLs d'image doivent être valides
4. **Téléphone** : Format libre (stocké comme string)
5. **Recherche** : Cherche dans nom, ville et email

## 🔧 Configuration requise

- Node.js 14+
- React 18+
- React Router DOM 6+
- Axios
- Backend API fonctionnel sur `http://localhost:8080/api`

## 📱 Points d'accès

1. **Dashboard Admin** → "Gestion des entreprises"
2. **Dashboard Assistant** → "Gestion des entreprises"
3. **URL directe** → `/admin/entreprises`
4. **Ajouter** → `/admin/entreprises/add`
5. **Modifier** → `/admin/entreprises/edit/{id}`
6. **Détails** → `/admin/entreprises/{id}`

---

**Dernière mise à jour :** 2 Janvier 2026  
**Version :** 1.0
