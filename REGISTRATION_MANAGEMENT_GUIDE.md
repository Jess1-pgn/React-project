# Guide de Gestion des Inscriptions - Frontend

## 📋 Vue d'ensemble

Ce guide explique comment les individus peuvent s'inscrire aux formations et comment les administrateurs/assistants peuvent gérer ces inscriptions et assigner les formateurs.

## 🎯 Flux complet d'inscription

### 1. Page d'accueil (HomePage)
**Route:** `/`

Les visiteurs non authentifiés peuvent :
- 🔍 Rechercher une formation par titre ou description
- 📊 Filtrer par niveau (Débutant, Intermédiaire, Avancé)
- 📑 Voir les détails de chaque formation
- 📝 Cliquer sur "S'inscrire" pour accéder au formulaire

### 2. Formulaire d'inscription (RegisterParticipant)
**Route:** `/register/{formationId}`

Les participants remplissent :

#### Informations personnelles
- **Prénom** (obligatoire)
- **Nom** (obligatoire)
- **Date de naissance** (obligatoire) - Vérification: minimum 16 ans
- **Ville** (obligatoire)

#### Coordonnées
- **Email** (obligatoire) - Validation format email
- **Téléphone** (obligatoire) - Validation format téléphone

**Fonctionnalités :**
- Récapitulatif de la formation sélectionnée
- Image, niveau, durée et coût affichés
- Validation côté client avant soumission
- Message de confirmation après inscription

### 3. Gestion des inscriptions (ParticipantManagement)
**Route:** `/admin/participants`
**Accès :** Admin et Assistant uniquement

#### Statistiques
- Nombre total d'inscrits
- Nombre de formations ouvertes
- Nombre de groupes avec formateur assigné

#### Recherche et filtrage
- Recherche par nom, prénom, email ou ville du participant
- Filtrage par formation

#### Gestion des groupes
Pour chaque formation avec inscrits :

**Informations formation**
- Niveau
- Durée
- Coût

**Assignation du formateur**
- Voir le formateur assigné (s'il existe)
- Assigner un nouveau formateur
- Retirer un formateur

**Liste des participants**
- Table avec tous les inscrits
- Colonnes : Prénom, Nom, Email, Téléphone, Ville, Date de naissance
- Actions : Supprimer un participant
- Bouton Exporter pour récupérer la liste en PDF

## 📁 Structure des fichiers

```
src/
├── components/
│   ├── home/
│   │   ├── HomePage.jsx
│   │   └── HomePage.css
│   ├── participant/
│   │   ├── RegisterParticipant.jsx
│   │   ├── RegisterParticipant.css
│   │   ├── ParticipantManagement.jsx
│   │   └── ParticipantManagement.css
│   ├── dashboard/
│   │   ├── AdminDashboard.jsx (mis à jour)
│   │   └── AssistantDashboard.jsx (mis à jour)
├── services/
│   └── participantService.js
└── App.jsx ou routes.jsx
```

## 🔑 Services API

Le fichier `src/services/participantService.js` expose :

```javascript
// Inscription
participantService.registerForFormation(data)

// Gestion des participants
participantService.getAllParticipants()
participantService.getParticipantById(id)
participantService.getParticipantsByFormation(formationId)
participantService.updateParticipant(id, data)
participantService.deleteParticipant(id)

// Gestion des groupes
participantService.getGroups()
participantService.assignFormatorToGroup(groupData)
participantService.removeFormatorFromGroup(formationId)
participantService.getGroupFormator(formationId)

// Fonctionnalités avancées
participantService.searchParticipants(query)
participantService.getParticipantsByCity(city)
participantService.exportParticipants(formationId, format)
participantService.sendEmailToGroup(formationId, emailData)
participantService.markAsPresent(participantId, sessionDate)
participantService.getAttendanceHistory(participantId)
participantService.getRegistrationStats()
```

## 📊 Structure des données Participant

```javascript
{
  id: "uuid",
  firstName: "Jean",
  lastName: "Dupont",
  birthDate: "1990-05-15",
  city: "Paris",
  email: "jean.dupont@example.com",
  phone: "+33 1 23 45 67 89",
  formationId: "formation-123",
  registrationDate: "2024-01-02T...",
  status: "active", // active, cancelled, completed
  attendance: [],
  notes: ""
}
```

## 🎨 Design et UX

- **HomePage** : Gradient Purple/Indigo, grille responsive
- **RegisterParticipant** : Formulaire avec récapitulatif formation
- **ParticipantManagement** : Groupes dépliables, tables responsives
- **Validation** : Email regex, date min 16 ans, téléphone format libre
- **Messages** : Erreurs en rouge, succès en vert

## 🔐 Sécurité & Autorisation

- **HomePage** : Accessible à tous (pas d'authentification requise)
- **RegisterParticipant** : Accessible à tous
- **ParticipantManagement** : Routes protégées par PrivateRoute
  - Accessible à : Admin et Assistant
  - Authentification requise

## 🚀 Intégration Backend

### Endpoints requis

```
POST   /api/participants/register        # S'inscrire
GET    /api/participants                 # Lister tous
GET    /api/participants/groups/all      # Obtenir groupes
GET    /api/participants/formation/{id}  # Participants d'une formation
GET    /api/participants/{id}            # Détails participant
PUT    /api/participants/{id}            # Mettre à jour
DELETE /api/participants/{id}            # Supprimer

POST   /api/participants/assign-formator # Assigner formateur
DELETE /api/participants/group/{formationId}/formator

GET    /api/participants/search?q={query}
GET    /api/participants/city/{city}
GET    /api/participants/group/{formationId}/formator
GET    /api/participants/{id}/attendance
POST   /api/participants/{id}/attendance

GET    /api/participants/formation/{id}/export?format=pdf
POST   /api/participants/group/{formationId}/send-email
GET    /api/participants/stats
```

### Structure de réponse d'inscription

```json
{
  "success": true,
  "message": "Inscription réussie",
  "data": {
    "id": "participant-123",
    "firstName": "Jean",
    "lastName": "Dupont",
    "email": "jean.dupont@example.com",
    "formationId": "formation-123"
  }
}
```

### Structure de groupes

```json
[
  {
    "formationId": "formation-123",
    "participants": [
      {
        "id": "p1",
        "firstName": "Jean",
        "lastName": "Dupont",
        "email": "jean@example.com",
        "phone": "+33...",
        "city": "Paris",
        "birthDate": "1990-05-15"
      }
    ],
    "assignedFormator": {
      "id": "f1",
      "firstName": "Marie",
      "lastName": "Martin",
      "email": "marie@example.com",
      "expertise": "Développement Web"
    }
  }
]
```

## ✨ Fonctionnalités avancées

1. **Recherche intelligente**
   - Cherche par nom, email, ville en temps réel

2. **Filtrage**
   - Par formation spécifique

3. **Export**
   - Exporter la liste en PDF
   - Inclut tous les détails des participants

4. **Email groupé**
   - Envoyer des emails à tous les participants d'une formation

5. **Assiduité**
   - Marquer les présences
   - Consulter l'historique

6. **Statistiques**
   - Nombre d'inscrits par formation
   - Taux de complétude
   - Répartition géographique

## 📝 Champs formulaire d'inscription

| Champ | Type | Validation | Notes |
|-------|------|-----------|-------|
| Prénom | text | Requis | Max 100 chars |
| Nom | text | Requis | Max 100 chars |
| Date de naissance | date | Requis + Min 16 ans | - |
| Ville | text | Requis | Max 100 chars |
| Email | email | Requis + Regex | Format valide |
| Téléphone | tel | Requis | Min 10 chiffres |
| Formation | select | Caché (URL) | Passé en paramètre |

## 🔄 Workflow complet

```
1. Visiteur accède à /
   ↓
2. Parcourt les formations (recherche, filtrage)
   ↓
3. Clique "S'inscrire"
   ↓
4. Est redirigé vers /register/{formationId}
   ↓
5. Remplit le formulaire d'inscription
   ↓
6. Valide et soumet
   ↓
7. Backend crée le participant
   ↓
8. Message de confirmation
   ↓
9. Redirection vers accueil après 2s
   ↓
10. Admin/Assistant voit l'inscription dans ParticipantManagement
   ↓
11. Admin/Assistant assigne un formateur au groupe
   ↓
12. Les participants du groupe sont notifiés (mail)
```

## 📱 Points d'accès

1. **HomePage** → `/`
2. **Inscription** → `/register/{formationId}`
3. **Gestion inscriptions** → `/admin/participants`
4. **Dashboard Admin** → Bouton "Gestion des Inscriptions"
5. **Dashboard Assistant** → Bouton "Gestion des Inscriptions"

---

**Dernière mise à jour :** 2 Janvier 2026  
**Version :** 1.0
