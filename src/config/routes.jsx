import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages d'authentification
import Login from '../components/login';
import Register from '../components/Register';
import RegisterFormator from '../components/RegisterFormator';
import PrivateRoute from '../components/PrivateRoute';

// Dashboards
import AdminDashboard from '../components/dashboard/AdminDashboard';
import FormateurDashboard from '../components/dashboard/FormateurDashboard';
import AssistantDashboard from '../components/dashboard/AssistantDashboard';

// Gestion des formations
import AddFormation from '../components/formation/AddFormation';
import FormationManagement from '../components/formation/FormationManagement';
import FormationDetails from '../components/formation/FormationDetails';
import EditFormation from '../components/formation/EditFormation';

// Gestion des formateurs
import AddFormator from '../components/formator/AddFormator';
import FormatorManagement from '../components/formator/FormatorManagement';
import FormatorDetails from '../components/formator/FormatorDetails';
import EditFormator from '../components/formator/EditFormator';
import FormatorApplicationsList from '../components/FormatorApplicationsList';

// Gestion des entreprises
import AddEntreprise from '../components/entreprise/AddEntreprise';
import EntrepriseManagement from '../components/entreprise/EntrepriseManagement';
import EntrepriseDetails from '../components/entreprise/EntrepriseDetails';
import EditEntreprise from '../components/entreprise/EditEntreprise';

// Pages publiques
import HomePage from '../components/HomePage';
import PublicFormationsList from '../components/PublicFormationsList';
import FormationDetailsPublic from '../components/FormationDetailsPublic';
import PlanFormation from '../components/PlanFormation';

// Pages participants et évaluations
import RegisterParticipant from '../components/participant/RegisterParticipant';
import ParticipantManagement from '../components/participant/ParticipantManagement';
import Evaluations from '../components/evaluations/Evaluations';

// Admin modules
import AdminSettings from '../components/admin/AdminSettings';
import AdminStatistics from '../components/admin/AdminStatistics';
import AdminLogs from '../components/admin/AdminLogs';
import Statistics from '../components/statistics/Statistics';

const AppRoutes = () => {
  return (
    <Routes>
      {/* ============== ROUTES PUBLIQUES ============== */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/accueil" element={<HomePage />} />
      <Route path="/formations" element={<PublicFormationsList />} />
      <Route path="/formations/:id" element={<FormationDetailsPublic />} />
      <Route path="/formations/:formationId/register" element={<RegisterParticipant />} />
      <Route path="/register-formator" element={<RegisterFormator />} />

      {/* ============== DASHBOARDS PROTÉGÉS ============== */}
      {/* Routes raccourcies pour redirection après login */}
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/formateur" element={<Navigate to="/formateur/dashboard" replace />} />
      <Route path="/assistant" element={<Navigate to="/assistant/dashboard" replace />} />

      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute requiredRole="admin">
            <AdminDashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/formateur/dashboard"
        element={
          <PrivateRoute requiredRole="formateur">
            <FormateurDashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/assistant/dashboard"
        element={
          <PrivateRoute requiredRole="assistant">
            <AssistantDashboard />
          </PrivateRoute>
        }
      />

      {/* ============== ADMIN: GESTION DES FORMATIONS ============== */}
      <Route
        path="/admin/formations"
        element={
          <PrivateRoute requiredRole="admin">
            <FormationManagement />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/formations/add"
        element={
          <PrivateRoute requiredRole="admin">
            <AddFormation />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/formations/edit/:id"
        element={
          <PrivateRoute requiredRole="admin">
            <EditFormation />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/formations/details/:id"
        element={
          <PrivateRoute requiredRole="admin">
            <FormationDetails />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/formations/plan"
        element={
          <PrivateRoute requiredRole="admin">
            <PlanFormation />
          </PrivateRoute>
        }
      />

      {/* ============== ADMIN: GESTION DES FORMATEURS ============== */}
      <Route
        path="/admin/formateurs"
        element={
          <PrivateRoute requiredRole="admin">
            <FormatorManagement />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/formateurs/add"
        element={
          <PrivateRoute requiredRole="admin">
            <AddFormator />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/formateurs/edit/:id"
        element={
          <PrivateRoute requiredRole="admin">
            <EditFormator />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/formateurs/details/:id"
        element={
          <PrivateRoute requiredRole="admin">
            <FormatorDetails />
          </PrivateRoute>
        }
      />

      {/* ============== ADMIN: GESTION DES ENTREPRISES ============== */}
      <Route
        path="/admin/entreprises"
        element={
          <PrivateRoute requiredRole="admin">
            <EntrepriseManagement />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/entreprises/add"
        element={
          <PrivateRoute requiredRole="admin">
            <AddEntreprise />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/entreprises/edit/:id"
        element={
          <PrivateRoute requiredRole="admin">
            <EditEntreprise />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/entreprises/details/:id"
        element={
          <PrivateRoute requiredRole="admin">
            <EntrepriseDetails />
          </PrivateRoute>
        }
      />

      {/* ============== ADMIN: GESTION DES PARTICIPANTS ============== */}
      <Route
        path="/admin/participants"
        element={
          <PrivateRoute requiredRole="admin">
            <ParticipantManagement />
          </PrivateRoute>
        }
      />

      {/* ============== ADMIN: ÉVALUATIONS ============== */}
      <Route
        path="/admin/evaluations"
        element={
          <PrivateRoute requiredRole="admin">
            <Evaluations />
          </PrivateRoute>
        }
      />

      {/* ============== ASSISTANT: ROUTES (mêmes droits que ADMIN pour certaines) ============== */}
      <Route
        path="/assistant/formations/plan"
        element={
          <PrivateRoute requiredRole="assistant">
            <PlanFormation />
          </PrivateRoute>
        }
      />

      <Route
        path="/assistant/entreprises"
        element={
          <PrivateRoute requiredRole="assistant">
            <EntrepriseManagement />
          </PrivateRoute>
        }
      />

      <Route
        path="/assistant/participants"
        element={
          <PrivateRoute requiredRole="assistant">
            <ParticipantManagement />
          </PrivateRoute>
        }
      />

      {/* ============== FORMATEUR: ROUTES ============== */}
      <Route
        path="/formateur/evaluations"
        element={
          <PrivateRoute requiredRole="formateur">
            <Evaluations />
          </PrivateRoute>
        }
      />

      {/* ============== ADMIN: PARAMÈTRES ET CONFIGURATION ============== */}
      <Route
        path="/admin/settings"
        element={
          <PrivateRoute requiredRole="admin">
            <AdminSettings />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/statistiques"
        element={
          <PrivateRoute requiredRole="admin">
            <AdminStatistics />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/logs"
        element={
          <PrivateRoute requiredRole="admin">
            <AdminLogs />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/statistiques-formations"
        element={
          <PrivateRoute requiredRole="admin">
            <Statistics />
          </PrivateRoute>
        }
      />

      {/* ============== ADMIN: DEMANDES D'INSCRIPTION FORMATEURS ============== */}
      <Route
        path="/admin/formateurs-applications"
        element={
          <PrivateRoute requiredRole="admin">
            <FormatorApplicationsList />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/demandes-formateurs"
        element={
          <PrivateRoute requiredRole="admin">
            <FormatorApplicationsList />
          </PrivateRoute>
        }
      />

      {/* ============== ASSISTANT: STATISTIQUES ============== */}
      <Route
        path="/assistant/statistiques"
        element={
          <PrivateRoute requiredRole="assistant">
            <Statistics />
          </PrivateRoute>
        }
      />

      {/* ============== ROUTE PAR DÉFAUT ============== */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
