import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages d'authentification
import Login from '../components/login';
import PrivateRoute from '../components/PrivateRoute';

// Dashboards
import AdminDashboard from '../components/dashboard/AdminDashboard';
import FormateurDashboard from '../components/dashboard/FormateurDashboard';
import AssistantDashboard from '../components/dashboard/AssistantDashboard';

// Gestion des formations
import AddFormation from '../components/formation/AddFormation';
import FormationManagement from '../components/formation/FormationManagement';
import FormationDetails from '../components/formation/FormationDetails';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Route publique */}
      <Route path="/login" element={<Login />} />

      {/* Dashboards protégés */}
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

      {/* Routes de gestion des formations (Admin uniquement) */}
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
        path="/admin/formations/:id"
        element={
          <PrivateRoute requiredRole="admin">
            <FormationDetails />
          </PrivateRoute>
        }
      />

      {/* Route par défaut */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
