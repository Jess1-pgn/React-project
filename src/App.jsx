import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/login';
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
          <Route path="/login" element={<Login />} />
          
          <Route
            path="/admin"
            element={
              <PrivateRoute allowedRoles={['ADMIN']}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route path="/admin/*" element={<PrivateRoute allowedRoles={['ADMIN']}><PageNotFound /></PrivateRoute>} />
          
          <Route
            path="/formateur"
            element={
              <PrivateRoute allowedRoles={['FORMATEUR']}>
                <FormateurDashboard />
              </PrivateRoute>
            }
          />
          <Route path="/formateur/*" element={<PrivateRoute allowedRoles={['FORMATEUR']}><PageNotFound /></PrivateRoute>} />
          
          <Route
            path="/assistant"
            element={
              <PrivateRoute allowedRoles={['ASSISTANT']}>
                <AssistantDashboard />
              </PrivateRoute>
            }
          />
          <Route path="/assistant/*" element={<PrivateRoute allowedRoles={['ASSISTANT']}><PageNotFound /></PrivateRoute>} />
          
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;