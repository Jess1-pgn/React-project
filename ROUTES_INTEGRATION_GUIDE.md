# Guide d'intégration des Routes

## Routes à ajouter dans App.jsx ou routes.jsx

Ajoutez ces routes dans votre configuration de routage principal :

```jsx
import HomePage from './components/home/HomePage';
import RegisterParticipant from './components/participant/RegisterParticipant';
import ParticipantManagement from './components/participant/ParticipantManagement';

// ... autres imports

const AppRoutes = () => {
  return (
    <Routes>
      {/* Routes publiques */}
      <Route path="/" element={<HomePage />} />
      <Route path="/register/:formationId" element={<RegisterParticipant />} />
      
      {/* Routes authentifiées */}
      <Route path="/login" element={<Login />} />
      
      {/* Routes protégées - Admin */}
      <Route path="/admin/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
      <Route path="/admin/formations" element={<PrivateRoute><FormationManagement /></PrivateRoute>} />
      <Route path="/admin/formations/add" element={<PrivateRoute><AddFormation /></PrivateRoute>} />
      <Route path="/admin/formations/edit/:id" element={<PrivateRoute><EditFormation /></PrivateRoute>} />
      <Route path="/admin/formations/:id" element={<PrivateRoute><FormationDetails /></PrivateRoute>} />
      
      <Route path="/admin/formateurs" element={<PrivateRoute><FormatorManagement /></PrivateRoute>} />
      <Route path="/admin/formateurs/add" element={<PrivateRoute><AddFormator /></PrivateRoute>} />
      <Route path="/admin/formateurs/edit/:id" element={<PrivateRoute><EditFormator /></PrivateRoute>} />
      <Route path="/admin/formateurs/:id" element={<PrivateRoute><FormatorDetails /></PrivateRoute>} />
      
      <Route path="/admin/entreprises" element={<PrivateRoute><EntrepriseManagement /></PrivateRoute>} />
      <Route path="/admin/entreprises/add" element={<PrivateRoute><AddEntreprise /></PrivateRoute>} />
      <Route path="/admin/entreprises/edit/:id" element={<PrivateRoute><EditEntreprise /></PrivateRoute>} />
      <Route path="/admin/entreprises/:id" element={<PrivateRoute><EntrepriseDetails /></PrivateRoute>} />
      
      {/* NEW: Routes pour inscriptions */}
      <Route path="/admin/participants" element={<PrivateRoute><ParticipantManagement /></PrivateRoute>} />
      
      {/* Routes protégées - Assistant */}
      <Route path="/assistant/dashboard" element={<PrivateRoute><AssistantDashboard /></PrivateRoute>} />
      
      {/* Page non trouvée */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
```

## Alternative avec gestion des rôles

Si vous voulez être plus précis sur les rôles :

```jsx
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ element, requiredRole }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (requiredRole && !requiredRole.includes(user.role)) {
    return <Navigate to="/dashboard" />;
  }
  
  return element;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* ... routes publiques ... */}
      
      {/* Routes admin uniquement */}
      <Route 
        path="/admin/participants" 
        element={<ProtectedRoute element={<ParticipantManagement />} requiredRole={['admin', 'assistant']} />} 
      />
    </Routes>
  );
};
```

## Structure complète de App.jsx

Voici un exemple de structure complète d'App.jsx :

```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/login/login';

// Composants publics
import HomePage from './components/home/HomePage';
import RegisterParticipant from './components/participant/RegisterParticipant';

// Composants Formation
import FormationManagement from './components/formation/FormationManagement';
import AddFormation from './components/formation/AddFormation';
import EditFormation from './components/formation/EditFormation';
import FormationDetails from './components/formation/FormationDetails';

// Composants Formateur
import FormatorManagement from './components/formator/FormatorManagement';
import AddFormator from './components/formator/AddFormator';
import EditFormator from './components/formator/EditFormator';
import FormatorDetails from './components/formator/FormatorDetails';

// Composants Entreprise
import EntrepriseManagement from './components/entreprise/EntrepriseManagement';
import AddEntreprise from './components/entreprise/AddEntreprise';
import EditEntreprise from './components/entreprise/EditEntreprise';
import EntrepriseDetails from './components/entreprise/EntrepriseDetails';

// Composants Participants
import ParticipantManagement from './components/participant/ParticipantManagement';

// Dashboards
import AdminDashboard from './components/dashboard/AdminDashboard';
import AssistantDashboard from './components/dashboard/AssistantDashboard';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* ROUTES PUBLIQUES */}
        <Route path="/" element={<HomePage />} />
        <Route path="/register/:formationId" element={<RegisterParticipant />} />
        <Route path="/login" element={<Login />} />
        
        {/* ROUTES PROTÉGÉES - DASHBOARDS */}
        <Route 
          path="/admin/dashboard" 
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/assistant/dashboard" 
          element={
            <PrivateRoute>
              <AssistantDashboard />
            </PrivateRoute>
          } 
        />
        
        {/* ROUTES PROTÉGÉES - FORMATIONS */}
        <Route 
          path="/admin/formations" 
          element={
            <PrivateRoute>
              <FormationManagement />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/admin/formations/add" 
          element={
            <PrivateRoute>
              <AddFormation />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/admin/formations/edit/:id" 
          element={
            <PrivateRoute>
              <EditFormation />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/admin/formations/:id" 
          element={
            <PrivateRoute>
              <FormationDetails />
            </PrivateRoute>
          } 
        />
        
        {/* ROUTES PROTÉGÉES - FORMATEURS */}
        <Route 
          path="/admin/formateurs" 
          element={
            <PrivateRoute>
              <FormatorManagement />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/admin/formateurs/add" 
          element={
            <PrivateRoute>
              <AddFormator />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/admin/formateurs/edit/:id" 
          element={
            <PrivateRoute>
              <EditFormator />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/admin/formateurs/:id" 
          element={
            <PrivateRoute>
              <FormatorDetails />
            </PrivateRoute>
          } 
        />
        
        {/* ROUTES PROTÉGÉES - ENTREPRISES */}
        <Route 
          path="/admin/entreprises" 
          element={
            <PrivateRoute>
              <EntrepriseManagement />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/admin/entreprises/add" 
          element={
            <PrivateRoute>
              <AddEntreprise />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/admin/entreprises/edit/:id" 
          element={
            <PrivateRoute>
              <EditEntreprise />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/admin/entreprises/:id" 
          element={
            <PrivateRoute>
              <EntrepriseDetails />
            </PrivateRoute>
          } 
        />
        
        {/* ROUTES PROTÉGÉES - PARTICIPANTS/INSCRIPTIONS */}
        <Route 
          path="/admin/participants" 
          element={
            <PrivateRoute>
              <ParticipantManagement />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
```

## Navigation programmée

Pour naviguer vers ces routes depuis des composants :

```jsx
import { useNavigate } from 'react-router-dom';

const MyComponent = () => {
  const navigate = useNavigate();
  
  // Navigation vers la page d'accueil
  const goHome = () => navigate('/');
  
  // Navigation vers inscription à une formation
  const registerToFormation = (formationId) => {
    navigate(`/register/${formationId}`);
  };
  
  // Navigation vers gestion des inscriptions
  const manageParticipants = () => {
    navigate('/admin/participants');
  };
  
  return (
    <div>
      <button onClick={goHome}>Accueil</button>
      <button onClick={() => registerToFormation('123')}>S'inscrire</button>
      <button onClick={manageParticipants}>Gérer inscriptions</button>
    </div>
  );
};
```

## Vérification de l'intégration

Voici une checklist pour vérifier que tout est bien intégré :

- [ ] Routes publiques fonctionnent sans authentification
  - [ ] `/` affiche HomePage
  - [ ] `/register/:formationId` affiche RegisterParticipant
  - [ ] `/login` affiche le formulaire de connexion

- [ ] Routes protégées requièrent authentification
  - [ ] `/admin/formations` redirige vers login si non authentifié
  - [ ] `/admin/participants` redirige vers login si non authentifié

- [ ] Navigation depuis dashboards
  - [ ] AdminDashboard a les boutons "Formations", "Formateurs", "Entreprises", "Inscriptions"
  - [ ] AssistantDashboard a les mêmes boutons
  - [ ] Les boutons naviguent vers les bonnes routes

- [ ] Composants importés correctement
  - [ ] Pas d'erreur "Cannot find module"
  - [ ] Pas d'erreur "is not a function"

- [ ] PrivateRoute fonctionne
  - [ ] Routes protégées inaccessibles sans login
  - [ ] Routes protégées accessibles après login pour admin/assistant

---

**Dernière mise à jour :** 2 Janvier 2026
