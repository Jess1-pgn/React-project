# 🎓 LMS - Learning Management System

Plateforme de gestion des formations en ligne avec support de rôles multiples (Admin, Formateur, Assistant).

## 🌟 Fonctionnalités

### Pour Tous
- 🏠 Page d'accueil publique avec formations filtrables
- 🔍 Filtres: Catégorie, Ville, Date, Recherche texte
- 📖 Détails complets des formations
- 📝 Formulaire d'inscription en ligne

### Pour Admin
- 📚 Gestion complète des formations
- 👨‍🏫 Gestion des formateurs et leurs compétences
- 🏢 Gestion des entreprises partenaires
- 📅 Planification des formations
- 👥 Gestion des participants
- 📊 Statistiques et analyses
- ⚙️ Configuration système

### Pour Formateur
- 📚 Consultation des formations assignées
- 👥 Liste des étudiants
- 📊 Statistiques personnelles
- ⭐ Consultation des évaluations
- 📅 Calendrier des cours

### Pour Assistant
- 📋 Gestion des tâches
- 👥 Support aux étudiants
- 🏢 Gestion des entreprises
- 👥 Gestion des inscriptions
- 📝 Rapports d'activité

## 🏗️ Architecture

### Structure des Répertoires
```
src/
├── components/           # Composants React
│   ├── dashboard/       # Dashboards par rôle
│   ├── formation/       # Gestion des formations
│   ├── formator/        # Gestion des formateurs
│   ├── entreprise/      # Gestion des entreprises
│   └── participant/     # Gestion des participants
├── services/            # Services API et utilitaires
│   ├── authService.js
│   ├── validationService.js  (NEW)
│   └── errorService.js       (NEW)
├── hooks/              # Hooks personnalisés
│   └── useFormValidation.js  (NEW)
├── context/            # Context API
│   └── AuthContext.jsx
├── config/             # Configuration
│   ├── api.js
│   └── routes.jsx
└── assets/            # Images et styles globaux
```

### Technologie Stack
- **Frontend:** React 18 + Vite
- **Routage:** React Router v6
- **HTTP:** Axios
- **Authentification:** JWT + AuthContext
- **Styling:** CSS3 (Flexbox, Grid, CSS Variables)
- **Validation:** Service centralisé

## 🚀 Démarrage Rapide

### Installation
```bash
npm install
```

### Développement
```bash
npm run dev
```
Le site sera disponible à `http://localhost:5173`

### Build Production
```bash
npm run build
```

### Preview
```bash
npm run preview
```

## 📋 Routes Principales

### Public (Sans authentification)
- `/` - Page d'accueil avec formations
- `/login` - Connexion
- `/formations/:id` - Détails d'une formation
- `/formations/:id/register` - Inscription participant

### Admin (Authentification requise)
- `/admin/dashboard` - Dashboard admin
- `/admin/formations` - Gestion formations
- `/admin/formations/add` - Ajouter formation
- `/admin/formations/plan` - Planifier formation
- `/admin/formateurs` - Gestion formateurs
- `/admin/entreprises` - Gestion entreprises
- `/admin/participants` - Gestion participants
- `/admin/statistics` - Statistiques
- `/admin/settings` - Paramètres
- `/admin/logs` - Logs système

### Formateur
- `/formateur/dashboard` - Dashboard formateur
- `/formateur/formations` - Mes formations
- `/formateur/students` - Mes étudiants
- `/formateur/evaluations` - Mes évaluations

### Assistant
- `/assistant/dashboard` - Dashboard assistant
- `/assistant/tasks` - Tâches assignées
- `/assistant/students` - Support étudiants
- `/assistant/reports` - Rapports

## 🔐 Authentification

L'application utilise JWT pour l'authentification:
1. Connexion via `/login`
2. Token stocké dans localStorage
3. Rôle utilisateur détermine les accès
4. Routes protégées avec `PrivateRoute`

### Rôles Disponibles
- `admin` - Accès complet
- `formateur` - Gestion formations et étudiants
- `assistant` - Support et gestion
- `user` - Utilisateur standard

## 📚 Services Clés

### authService.js
Gestion de l'authentification et des utilisateurs.

### validationService.js (NEW)
Validation centralisée pour:
- Email, téléphone, URL
- Dates et âge
- Formations, formateurs, participants, entreprises

### errorService.js (NEW)
Gestion cohérente des erreurs API:
- Messages d'erreur localisés
- Identification des types d'erreurs
- Logging pour développement

### Autres Services
- `formationService.js` - Gestion des formations
- `formatorService.js` - Gestion des formateurs
- `entrepriseService.js` - Gestion des entreprises
- `participantService.js` - Gestion des participants
- `evaluationService.js` - Gestion des évaluations

## 🎨 Composants Réutilisables

### Notification (NEW)
Affiche des notifications toast (success, error, warning, info).

```jsx
<Notification
  type="success"
  message="Formation créée!"
  onClose={() => {}}
  autoClose={true}
  duration={4000}
/>
```

### Hook useFormValidation (NEW)
Gère l'état et la validation d'un formulaire.

```jsx
const form = useFormValidation(
  { field: '' },
  async (data) => { /* submit */ },
  validationSchema
);
```

## 📖 Documentation Détaillée

- **[IMPLEMENTATION_COMPLETE.md](IMPLEMENTATION_COMPLETE.md)** - Résumé des implémentations
- **[GUIDE_NOUVELLES_FONCTIONNALITES.md](GUIDE_NOUVELLES_FONCTIONNALITES.md)** - Guide d'utilisation complet
- **[CHECKLIST_TEST.md](CHECKLIST_TEST.md)** - Checklist de test exhaustive
- **[IMPLEMENTATION_SUMMARY_FINAL.md](IMPLEMENTATION_SUMMARY_FINAL.md)** - Résumé final

## ✅ Conformité Projet

✅ Condition 1: Interface authentification 3 rôles
✅ Condition 2: Admin ajoute formations (heures, coût, objectifs, programme)
✅ Condition 3: Admin ajoute formateurs (mots clés + remarques)
✅ Condition 4: Admin/Assistant ajoute entreprises
✅ Condition 5: Planifier formation (formateur + entreprise + dates)
✅ Condition 6: Inscriptions participants + affectation formateur
✅ Condition 7: Homepage publique + filtres
✅ Condition 8: Formulaire évaluation 4 critères
✅ Condition 9: Formateurs externes s'inscrivent
✅ Condition 10: Sécurité, design, modélisation en couches

## 🧪 Tests

Pour tester l'application:
1. Consulter [CHECKLIST_TEST.md](CHECKLIST_TEST.md)
2. 100+ points de test couvrant toutes les fonctionnalités
3. Tests responsiveness, accessibilité, sécurité

## 🐛 Troubleshooting

### Les formations ne s'affichent pas
- Vérifiez que l'API retourne les données
- Vérifiez la console pour les erreurs

### Erreur d'authentification
- Vérifiez que vous êtes connecté
- Vérifiez que le rôle autorise l'accès
- Vérifiez le token JWT

### Validation du formulaire
- Vérifiez tous les champs obligatoires
- Vérifiez les formats (email, téléphone, date)
- Consultez les messages d'erreur

Voir [GUIDE_NOUVELLES_FONCTIONNALITES.md](GUIDE_NOUVELLES_FONCTIONNALITES.md) pour plus de détails.

## 🚀 Déploiement

### Variables d'Environnement
Créer un fichier `.env`:
```
VITE_API_URL=https://votre-api.com
VITE_APP_NAME=LMS
```

### Build pour Production
```bash
npm run build
npm run preview
```

## 📊 Statistiques du Projet

- **Composants:** 50+
- **Services:** 8
- **Hooks:** 1 centralisé
- **Routes:** 20+
- **Lignes de code:** 5000+
- **CSS:** 3000+ lignes
- **Documentation:** 3 fichiers complets

## 🤝 Contribution

Pour contribuer au projet:
1. Fork le repository
2. Créer une branche feature
3. Commit les changements
4. Push et créer une Pull Request

## 📄 Licence

Propriété de l'entreprise. Tous droits réservés.

## 👥 Équipe

- **Frontend:** Développement React/Vite
- **Backend:** API Node.js/Express (externe)
- **QA:** Tests et validation

## 📞 Support

Pour toute question:
- Consulter la documentation
- Voir les guides d'utilisation
- Vérifier les logs/console

---

**Version:** 1.0.0
**Dernière mise à jour:** Janvier 2026
**Statut:** ✅ Production Ready
