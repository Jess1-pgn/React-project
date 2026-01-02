import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/login';
import HomePage from './components/HomePage';
import RegisterFormator from './components/RegisterFormator';
import AdminDashboard from './components/dashboard/AdminDashboard';
import FormateurDashboard from './components/dashboard/FormateurDashboard';
import AssistantDashboard from './components/dashboard/AssistantDashboard';
import PrivateRoute from './components/PrivateRoute';

// Pages placeholder pour les sous-routes
const PageNotFound = () => <div style={{textAlign: 'center', marginTop: '50px'}}><h1>📄 Page en développement</h1></div>;
const UnauthorizedPage = () => <div style={{textAlign: 'center', marginTop: '50px'}}><h1>❌ Accès non autorisé</h1></div>;

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register-formator" element={<RegisterFormator />} />
          
          {/* Routes privées - Admin */}
          <Route
            path="/admin"
            element={
              <PrivateRoute allowedRoles={['ADMIN']}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route path="/admin/*" element={<PrivateRoute allowedRoles={['ADMIN']}><PageNotFound /></PrivateRoute>} />
          
          {/* Routes privées - Formateur */}
          <Route
            path="/formateur"
            element={
              <PrivateRoute allowedRoles={['FORMATEUR']}>
                <FormateurDashboard />
              </PrivateRoute>
            }
          />
          <Route path="/formateur/*" element={<PrivateRoute allowedRoles={['FORMATEUR']}><PageNotFound /></PrivateRoute>} />
          
          {/* Routes privées - Assistant */}
          <Route
            path="/assistant"
            element={
              <PrivateRoute allowedRoles={['ASSISTANT']}>
                <AssistantDashboard />
              </PrivateRoute>
            }
          />
          <Route path="/assistant/*" element={<PrivateRoute allowedRoles={['ASSISTANT']}><PageNotFound /></PrivateRoute>} />
          
          {/* Routes d'erreur */}
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          
          {/* Redirection par défaut */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;