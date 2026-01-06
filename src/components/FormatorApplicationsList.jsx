import React, { useState, useEffect } from 'react';
import formatorService from '../services/formatorService';
import './FormatorApplicationsList.css';

const FormatorApplicationsList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending');
  const [selectedApp, setSelectedApp] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    loadApplications();
  }, [filter]);

  const loadApplications = async () => {
    try {
      const response = await formatorService.getPendingApplications();
      
      // Normaliser la réponse (support {message, data} ou tableau direct)
      const data = Array.isArray(response) 
        ? response 
        : response?.data || [];
      
      setApplications(data);
    } catch (error) {
      console.error('Erreur:', error);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (applicationId) => {
    try {
      await formatorService.approveApplication(applicationId);
      alert('✅ Candidature approuvée!');
      loadApplications();
    } catch (error) {
      alert('❌ Erreur: ' + error?.message);
    }
  };

  const handleReject = async (applicationId) => {
    if (!rejectionReason.trim()) {
      alert('Veuillez entrer une raison de rejet');
      return;
    }
    try {
      await formatorService.rejectApplication(applicationId, rejectionReason);
      alert('✅ Candidature rejetée!');
      setSelectedApp(null);
      setRejectionReason('');
      loadApplications();
    } catch (error) {
      alert('❌ Erreur: ' + error?.message);
    }
  };

  if (loading) return <div className="loading">Chargement...</div>;

  // Vérifier que applications est un tableau avant d'utiliser .map
  const applicationsArray = Array.isArray(applications) ? applications : [];

  return (
    <div className="formator-applications-container">
      <h2>Demandes d'inscription - Formateurs externes</h2>
      
      {applicationsArray.length === 0 ? (
        <div className="no-applications">Aucune demande en attente</div>
      ) : (
        <div className="applications-list">
          {applicationsArray.map(app => (
            <div key={app.id} className="application-card">
              <div className="app-header">
                <h3>{app.firstName} {app.lastName}</h3>
                <span className="status-badge pending">En attente</span>
              </div>

              <div className="app-details">
                <p><strong>Email:</strong> {app.email}</p>
                <p><strong>Téléphone:</strong> {app.phone || '-'}</p>
                <p><strong>Mots clés:</strong> {app.keywords}</p>
                {app.bio && (
                  <p><strong>Biographie:</strong> {app.bio}</p>
                )}
              </div>

              <div className="app-actions">
                <button
                  className="approve-btn"
                  onClick={() => handleApprove(app.id)}
                >
                  ✅ Approuver
                </button>
                <button
                  className="reject-btn"
                  onClick={() => setSelectedApp(app.id)}
                >
                  ❌ Rejeter
                </button>
              </div>

              {selectedApp === app.id && (
                <div className="rejection-form">
                  <textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Raison du rejet..."
                    rows="3"
                  />
                  <div className="rejection-actions">
                    <button
                      onClick={() => handleReject(app.id)}
                      className="confirm-reject-btn"
                    >
                      Confirmer le rejet
                    </button>
                    <button
                      onClick={() => setSelectedApp(null)}
                      className="cancel-reject-btn"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormatorApplicationsList;
