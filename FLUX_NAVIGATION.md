# 🔐 Flux de Connexion et Navigation - Guide Complet

## 📍 Après connexion en tant qu'**ADMIN**

### Étape 1: Page de Connexion
**URL:** `http://localhost:5173/login`
- Identifiants de test: `admin / admin123`

### Étape 2: Redirection Automatique
Après connexion réussie → Redirection automatique vers `/admin/dashboard`

### Étape 3: Tableau de Bord Admin
**URL:** `http://localhost:5173/admin/dashboard`

```
📊 TABLEAU DE BORD ADMIN
├── 📋 Gestion des Formations
├── 👥 Gestion des Formateurs
├── 🏢 Gestion des Entreprises
├── 👨‍🎓 Gestion des Participants
├── ⭐ Gestion des Évaluations
└── 📅 Planification des Formations
```

---

## 🎯 Menu de Navigation ADMIN

Après accès au dashboard, l'admin a accès à:

### 1️⃣ **FORMATIONS** (`/admin/formations`)
- **Consulter** les formations existantes
- **Ajouter** une nouvelle formation (`/admin/formations/add`)
  - Spécifier: heures, coût, objectifs, programme détaillé
- **Modifier** une formation (`/admin/formations/edit/:id`)
- **Consulter détails** (`/admin/formations/details/:id`)
- **Planifier** une formation (`/admin/formations/plan`)
  - Sélectionner formateur + entreprise + dates

### 2️⃣ **FORMATEURS** (`/admin/formateurs`)
- **Consulter** liste des formateurs
- **Ajouter** formateur (`/admin/formateurs/add`)
  - Spécifier: mots-clés (compétences), remarques
- **Modifier** formateur (`/admin/formateurs/edit/:id`)
- **Consulter détails** (`/admin/formateurs/details/:id`)

### 3️⃣ **ENTREPRISES** (`/admin/entreprises`)
- **Consulter** liste des entreprises
- **Ajouter** entreprise (`/admin/entreprises/add`)
  - Spécifier: nom, adresse, téléphone, URL, email
- **Modifier** entreprise (`/admin/entreprises/edit/:id`)
- **Consulter détails** (`/admin/entreprises/details/:id`)

### 4️⃣ **PARTICIPANTS** (`/admin/participants`)
- **Consulter** liste des participants
- **Gérer** les groupes par formation
- **Affecter** formateur aux groupes
- **Exporter** données participants

### 5️⃣ **ÉVALUATIONS** (`/admin/evaluations`)
- **Consulter** évaluations des participants
- **Voir statistiques** par formation/formateur
  - Qualité pédagogique
  - Rythme/cadence
  - Support de cours
  - Maîtrise du sujet

### 6️⃣ **PLANIFICATION** (`/admin/formations/plan`)
- **Créer** une nouvelle planification
- **Sélectionner** formation
- **Sélectionner** formateur
- **Sélectionner** entreprise
- **Choisir** dates (calendrier)

---

## 📱 Flux Complet d'ADMIN

```
LOGIN (/login)
    ↓ (identifiants: admin/admin123)
DASHBOARD (/admin/dashboard)
    ├── FORMATIONS
    │   ├── Liste (/admin/formations)
    │   ├── Ajouter (/admin/formations/add)
    │   ├── Modifier (/admin/formations/edit/:id)
    │   ├── Détails (/admin/formations/details/:id)
    │   └── Planifier (/admin/formations/plan)
    │
    ├── FORMATEURS
    │   ├── Liste (/admin/formateurs)
    │   ├── Ajouter (/admin/formateurs/add)
    │   ├── Modifier (/admin/formateurs/edit/:id)
    │   └── Détails (/admin/formateurs/details/:id)
    │
    ├── ENTREPRISES
    │   ├── Liste (/admin/entreprises)
    │   ├── Ajouter (/admin/entreprises/add)
    │   ├── Modifier (/admin/entreprises/edit/:id)
    │   └── Détails (/admin/entreprises/details/:id)
    │
    ├── PARTICIPANTS
    │   └── Gestion (/admin/participants)
    │
    └── ÉVALUATIONS
        └── Gestion (/admin/evaluations)
```

---

## 🔐 Flux de Connexion FORMATEUR

### Étape 1: Page de Connexion
**URL:** `http://localhost:5173/login`
- Identifiants de test: `formateur / form123`

### Étape 2: Redirection
Après connexion → `/formateur/dashboard`

### Étape 3: Accès Limité
Le formateur a accès à:
- ✅ **Évaluations** (`/formateur/evaluations`) - Voir ses évaluations
- ✅ **Page d'accueil** - Voir formations publiques

---

## 🔐 Flux de Connexion ASSISTANT

### Étape 1: Page de Connexion
**URL:** `http://localhost:5173/login`
- Identifiants de test: `assistant / assist123`

### Étape 2: Redirection
Après connexion → `/assistant/dashboard`

### Étape 3: Accès Étendu
L'assistant peut:
- ✅ **Planifier** formations (`/assistant/formations/plan`)
- ✅ **Gérer** entreprises (`/assistant/entreprises`)
- ✅ **Gérer** participants (`/assistant/participants`)
- ✅ **Voir** formations publiques

---

## 🌍 Accès PUBLIQUE (Sans Connexion)

N'importe qui peut accéder à:

### 1️⃣ **Page d'Accueil** (`/`)
- **Voir** toutes les formations
- **Filtrer** par:
  - 🔍 Texte de recherche
  - 📂 Catégorie
  - 🏙️ Ville
  - 📅 Date
- **Cliquer** sur une formation pour voir détails
- **Cliquer** "S'inscrire" pour inscription

### 2️⃣ **Détails Formation** (`/formations/:id`)
- Voir description complète
- Voir objectives
- Voir programme détaillé
- Voir coût et durée
- Voir formateur assigné
- Bouton "S'inscrire"

### 3️⃣ **Inscription Participant** (`/formations/:formationId/register`)
- Remplir formulaire:
  - Nom
  - Prénom
  - Date de naissance
  - Ville
  - Email
  - Téléphone
- Soumettre l'inscription

### 4️⃣ **Inscription Formateur** (`/register-formator`)
- S'inscrire comme formateur
- Spécifier mots-clés (compétences)
- Montrer son intérêt pour des formations

### 5️⃣ **Connexion** (`/login`)
- Pour accéder aux fonctionnalités restreintes

---

## 🔑 Résumé des Points d'Entrée

| Rôle | Après Login | Routes Accessibles |
|------|-------------|-------------------|
| **Anonyme** | - | `/`, `/login`, `/register-formator`, `/formations/:id`, `/formations/:id/register` |
| **Admin** | `/admin/dashboard` | Toutes les routes `/admin/*` |
| **Formateur** | `/formateur/dashboard` | `/formateur/evaluations`, `/` (accueil) |
| **Assistant** | `/assistant/dashboard` | `/assistant/*` (formations/plan, entreprises, participants) |

---

## 🚀 Utilisation Typique

### Scénario ADMIN:
1. Va à `http://localhost:5173/login`
2. Entre `admin` / `admin123`
3. Arrive sur `/admin/dashboard`
4. Clique sur "Gestion des Formations"
5. Peut ajouter/modifier/planifier formations
6. Peut gérer formateurs, entreprises, participants

### Scénario Participant:
1. Va à `http://localhost:5173`
2. Voit formations avec filtres
3. Clique sur une formation
4. Clique "S'inscrire"
5. Rempli le formulaire
6. Envoie l'inscription

### Scénario Formateur Externe:
1. Va à `http://localhost:5173`
2. Clique "S'inscrire en tant que formateur"
3. Va à `/register-formator`
4. Remplit ses infos + mots-clés
5. Admin approuve et peut l'assigner

---

## 📊 Schéma de Navigation Visuelle

```
                    ACCUEIL PUBLIC (/)
                           ↓
         ┌──────────────────┼──────────────────┐
         ↓                  ↓                  ↓
    [S'inscrire]   [Voir Détails]      [S'inscrire Formateur]
      Participant         Formation           (/register-formator)
    /formations/:id/register
                           ↓
                    [LOGIN] (/login)
                           ↓
         ┌─────────────────┬────────────────┬──────────────────┐
         ↓                 ↓                ↓                  ↓
    ADMIN DASHBOARD  FORMATEUR DASHBOARD  ASSISTANT DASHBOARD
    (/admin/...)     (/formateur/...)     (/assistant/...)
         
    Admin Dashboard contient:
    ├── Formations CRUD + Planification
    ├── Formateurs CRUD
    ├── Entreprises CRUD
    ├── Participants
    └── Évaluations
```

---

## ✅ Résumé

**Après connexion en tant qu'ADMIN:**
- 🎯 Destination: `/admin/dashboard`
- 📊 Accès: 5 modules principaux (Formations, Formateurs, Entreprises, Participants, Évaluations)
- 🔐 Sécurité: Protégé par PrivateRoute + AuthContext
- 🌐 Routes: 20+ routes sous `/admin/*`

