# 📝 Checklist Complète - Avant de Tester

## ✅ Fichiers créés

### Composants Nouveau Système d'Inscription

#### HomePage (Page d'accueil)
- ✅ `src/components/home/HomePage.jsx` - Affichage formations
- ✅ `src/components/home/HomePage.css` - Styling

#### Formulaire d'Inscription
- ✅ `src/components/participant/RegisterParticipant.jsx` - Formulaire
- ✅ `src/components/participant/RegisterParticipant.css` - Styling

#### Gestion des Inscriptions (Admin)
- ✅ `src/components/participant/ParticipantManagement.jsx` - Gestion
- ✅ `src/components/participant/ParticipantManagement.css` - Styling

#### Service API Participants
- ✅ `src/services/participantService.js` - Service complet

### Mises à jour des Dashboards
- ✅ `src/components/dashboard/AdminDashboard.jsx` - Ajout bouton inscriptions
- ✅ `src/components/dashboard/AssistantDashboard.jsx` - Ajout bouton inscriptions

### Documentation
- ✅ `REGISTRATION_MANAGEMENT_GUIDE.md` - Guide utilisateur
- ✅ `REGISTRATION_IMPLEMENTATION.md` - Détails techniques
- ✅ `REGISTRATION_SYSTEM_SUMMARY.md` - Résumé complet
- ✅ `ROUTES_INTEGRATION_GUIDE.md` - Guide d'intégration routes
- ✅ `PROJECT_OVERVIEW.md` - Vue d'ensemble complète

---

## 🔧 Avant de démarrer les tests

### 1. Vérification des imports
```bash
# Assurez-vous que ces fichiers existent :
- src/services/formationService.js
- src/services/formatorService.js  
- src/services/participantService.js
- src/config/api.js
```

### 2. Vérification de l'API configurée
Dans `src/config/api.js`, l'URL doit être :
```javascript
const api = axios.create({
  baseURL: 'http://localhost:8080/api'
});
```

### 3. Routes à ajouter dans App.jsx
Copier/coller le contenu de `ROUTES_INTEGRATION_GUIDE.md` dans votre App.jsx

### 4. Vérifier les imports dans App.jsx
```javascript
import HomePage from './components/home/HomePage';
import RegisterParticipant from './components/participant/RegisterParticipant';
import ParticipantManagement from './components/participant/ParticipantManagement';
```

---

## 🧪 Scénarios de test - Ordre recommandé

### Scénario 1 : Page d'Accueil (PUBLIQUE)
**Durée estimée :** 5 minutes

```
1. Ouvrir http://localhost:5173/
   ✓ Vérifier : Affichage du titre "🎓 Formations Disponibles"
   ✓ Vérifier : Affichage de formations (si backend running)
   
2. Tester la recherche
   ✓ Taper un mot clé
   ✓ Vérifier : Les formations sont filtrées
   
3. Tester les filtres par niveau
   ✓ Cliquer sur "Débutant"
   ✓ Vérifier : Filtrage fonctionne
   ✓ Cliquer sur "Tous les niveaux" pour réinitialiser
   
4. Cliquer sur "S'inscrire"
   ✓ Vérifier : Navigation vers /register/{formationId}
```

### Scénario 2 : Formulaire d'Inscription (PUBLIQUE)
**Durée estimée :** 10 minutes

```
1. Être sur http://localhost:5173/register/{formationId}
   ✓ Vérifier : Récapitulatif formation affiché
   ✓ Vérifier : Image, titre, niveau, durée, coût visibles
   
2. Tester les validations - EMAIL
   ✓ Entrer "email_invalide"
   ✓ Cliquer "S'inscrire"
   ✓ Vérifier : Message d'erreur "Format email invalide"
   
3. Tester les validations - ÂGE
   ✓ Entrer une date de naissance récente (< 16 ans)
   ✓ Cliquer "S'inscrire"
   ✓ Vérifier : Message d'erreur "minimum 16 ans"
   
4. Tester les validations - TÉLÉPHONE
   ✓ Entrer "123" (trop court)
   ✓ Cliquer "S'inscrire"
   ✓ Vérifier : Message d'erreur "Format téléphone invalide"
   
5. Remplir CORRECTEMENT le formulaire
   - Prénom : Jean
   - Nom : Dupont
   - Date : 1990-05-15
   - Ville : Paris
   - Email : jean@example.com
   - Téléphone : +33123456789
   
6. Cliquer "S'inscrire"
   ✓ Vérifier : Message de succès ✅
   ✓ Vérifier : Redirection automatique après 2 secondes
   ✓ Vérifier : Backend API appelée (paramètre --backend requiert implémentation)
   
7. Cliquer "Annuler"
   ✓ Vérifier : Redirection vers /
```

### Scénario 3 : Gestion des Inscriptions (ADMIN/ASSISTANT)
**Durée estimée :** 15 minutes
**Prérequis :** Être connecté en tant qu'Admin ou Assistant

```
1. Accès au Dashboard
   ✓ Connectez-vous avec compte Admin
   ✓ Vérifier : Bouton "👥 Gestion des Inscriptions" visible
   ✓ Cliquer sur le bouton
   ✓ Vérifier : Navigation vers /admin/participants
   
2. Vérifier les statistiques
   ✓ Vérifier : Trois cartes (Total inscrits, Formations, Groupes)
   ✓ Vérifier : Nombres affichés (peuvent être 0 si pas d'inscriptions)
   
3. Tester la recherche
   ✓ Entrer "jean" dans la barre de recherche
   ✓ Vérifier : Les participants sont filtrés
   
4. Tester le filtrage par formation
   ✓ Sélectionner une formation
   ✓ Vérifier : Affichage que cette formation
   
5. Voir les groupes
   ✓ Vérifier : Une section par formation avec inscrits
   ✓ Cliquer sur en-tête d'un groupe
   ✓ Vérifier : Groupe se déplie pour montrer les détails
   
6. Tester l'assignation de formateur
   ✓ Dans un groupe, cliquer "👨‍🏫 Assigner un formateur"
   ✓ Vérifier : Liste des formateurs disponibles
   ✓ Sélectionner un formateur
   ✓ Cliquer "✅ Assigner"
   ✓ Vérifier : Message de succès
   ✓ Vérifier : Formateur affiche désormais
   
7. Tester le retrait du formateur
   ✓ Cliquer "Retirer le formateur"
   ✓ Vérifier : Message de succès
   ✓ Vérifier : Formateur retiré
   
8. Tester la suppression de participant
   ✓ Dans la table, cliquer sur 🗑️ pour un participant
   ✓ Vérifier : Confirmation demandée
   ✓ Confirmer
   ✓ Vérifier : Participant supprimé de la liste
   
9. Tester l'export PDF
   ✓ Cliquer "📥 Exporter"
   ✓ Vérifier : PDF téléchargé (nécessite backend)
```

### Scénario 4 : Navigation depuis les dashboards (ADMIN)
**Durée estimée :** 5 minutes

```
1. Dashboard Admin
   ✓ Vérifier : Bouton "🏢 Gestion des entreprises" présent
   ✓ Vérifier : Bouton "📚 Gestion des formations" présent
   ✓ Vérifier : Bouton "👨‍🏫 Gestion des formateurs" présent
   ✓ Vérifier : Bouton "👥 Gestion des Inscriptions" présent ← NEW
   
2. Cliquer sur chaque bouton
   ✓ Vérifier : Navigation fonctionne
   ✓ Vérifier : Pages s'affichent correctement
   
3. Dashboard Assistant
   ✓ Se reconnecter en tant qu'Assistant
   ✓ Vérifier : Tous les boutons présents
   ✓ Tester navigation
```

---

## 🐛 Errors courants et solutions

### Erreur 1 : "Cannot find module"
```
❌ Module not found: Can't resolve './components/home/HomePage'

✅ Solutions :
- Vérifier que le fichier existe : src/components/home/HomePage.jsx
- Vérifier l'import : import HomePage from './components/home/HomePage';
- Vérifier les majuscules/minuscules (sensible à la casse)
```

### Erreur 2 : "is not a function"
```
❌ TypeError: HomePage is not a function

✅ Solutions :
- Vérifier que HomePage exporte par défaut : export default HomePage;
- Vérifier l'import utilise default : import HomePage
```

### Erreur 3 : Les formations ne s'affichent pas
```
❌ HomePage vide, pas de formations

✅ Solutions :
- Vérifier que le backend est running sur http://localhost:8080
- Vérifier que /api/formations a des formations (GET request)
- Vérifier la console pour les erreurs
- Vérifier que formationService.getAllFormations() fonctionne
```

### Erreur 4 : Erreur 404 sur les routes
```
❌ Cannot GET /register/123

✅ Solutions :
- Vérifier que Route est bien définie dans App.jsx
- Vérifier que l'URL est correcte
- Vérifier que BrowserRouter wraps les Routes
```

### Erreur 5 : Validation ne fonctionne pas
```
❌ Email/téléphone invalides acceptés

✅ Solutions :
- Vérifier le regex dans RegisterParticipant.jsx
- Vérifier que handleSubmit vérifie les champs
- Vérifier que setError affiche le message
```

---

## 📊 Vérifications de code

### Vérifier les imports (App.jsx)
```javascript
// DOIT contenir :
import HomePage from './components/home/HomePage';
import RegisterParticipant from './components/participant/RegisterParticipant';
import ParticipantManagement from './components/participant/ParticipantManagement';
```

### Vérifier les routes (App.jsx)
```javascript
// DOIT contenir :
<Route path="/" element={<HomePage />} />
<Route path="/register/:formationId" element={<RegisterParticipant />} />
<Route path="/admin/participants" element={<PrivateRoute><ParticipantManagement /></PrivateRoute>} />
```

### Vérifier les services
```javascript
// Ces fichiers DOIVENT exister :
src/services/participantService.js
src/services/formationService.js
src/services/formatorService.js
```

### Vérifier les CSS
```javascript
// Ces fichiers DOIVENT exister :
src/components/home/HomePage.css
src/components/participant/RegisterParticipant.css
src/components/participant/ParticipantManagement.css
```

---

## 💾 Avant de terminer les tests

### Si tout fonctionne :
1. ✅ Tous les scénarios réussis
2. ✅ Pas d'erreurs console (sauf warnings React)
3. ✅ Navigation fluide
4. ✅ Validations correctes
5. ✅ Styling correct

### Préparer pour GitHub :
```bash
# 1. Vérifier statut git
git status

# 2. Ajouter les fichiers
git add .

# 3. Créer un commit
git commit -m "feat: Add complete registration system for individuals"

# 4. Pousser vers GitHub (quand vous êtes prêt)
git push origin main
```

---

## 📞 Informations pour le backend

Si vous devez implémenter le backend, voici ce qui est attendu :

### Endpoint POST /api/participants/register
```json
REQUEST BODY:
{
  "firstName": "Jean",
  "lastName": "Dupont",
  "birthDate": "1990-05-15",
  "city": "Paris",
  "email": "jean@example.com",
  "phone": "+33123456789",
  "formationId": "uuid-formation"
}

RESPONSE 200:
{
  "success": true,
  "message": "Inscription réussie",
  "data": {
    "id": "uuid-participant",
    "firstName": "Jean",
    "lastName": "Dupont",
    "email": "jean@example.com",
    "formationId": "uuid-formation"
  }
}
```

### Endpoint GET /api/participants/groups/all
```json
RESPONSE 200:
[
  {
    "formationId": "uuid-formation",
    "participants": [
      {
        "id": "uuid1",
        "firstName": "Jean",
        "lastName": "Dupont",
        "email": "jean@example.com",
        "phone": "+33...",
        "city": "Paris",
        "birthDate": "1990-05-15"
      }
    ],
    "assignedFormator": null
  }
]
```

---

## ⏱️ Temps estimé total

| Scénario | Durée |
|----------|-------|
| HomePage | 5 min |
| Inscription | 10 min |
| Gestion inscriptions | 15 min |
| Navigation | 5 min |
| **TOTAL** | **35 minutes** |

---

## 🎯 Objectifs des tests

✅ Confirmer que HomePage s'affiche correctement
✅ Confirmer que le formulaire valide les données
✅ Confirmer que les inscriptions sont gérables
✅ Confirmer que les formateurs peuvent être assignés
✅ Confirmer que la navigation fonctionne
✅ Identifier les bugs (s'il y en a)

---

**Bonne chance pour vos tests ! 🚀**

Si vous avez des questions ou des problèmes, référez-vous à :
- REGISTRATION_MANAGEMENT_GUIDE.md (utilisation)
- REGISTRATION_IMPLEMENTATION.md (détails techniques)
- ROUTES_INTEGRATION_GUIDE.md (routes)
- PROJECT_OVERVIEW.md (vue globale)
