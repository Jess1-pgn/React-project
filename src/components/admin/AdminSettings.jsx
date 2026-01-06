import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminManagement.css';

const AdminSettings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    siteName: 'LMS Platform',
    siteEmail: 'contact@lms.com',
    sitePhone: '+33612345678',
    maintenanceMode: false,
    allowRegistration: true,
    requireEmailVerification: false,
    maxFileSize: 10,
    sessionTimeout: 30,
  });

  const handleSettingChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleSaveSettings = () => {
    alert('Paramètres sauvegardés avec succès!');
    console.log('Paramètres:', settings);
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>⚙️ Configuration du Système</h1>
        <button onClick={() => navigate(-1)} className="back-btn">← Retour</button>
      </div>

      <div style={{ maxWidth: '600px' }}>
        <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h3>🌐 Informations du Site</h3>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label>Nom du Site</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => handleSettingChange('siteName', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label>Email du Site</label>
            <input
              type="email"
              value={settings.siteEmail}
              onChange={(e) => handleSettingChange('siteEmail', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label>Téléphone du Site</label>
            <input
              type="tel"
              value={settings.sitePhone}
              onChange={(e) => handleSettingChange('sitePhone', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

          <h3>🔧 Paramètres de Sécurité</h3>

          <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <input
              type="checkbox"
              checked={settings.maintenanceMode}
              onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
              id="maintenance"
              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            />
            <label htmlFor="maintenance" style={{ margin: 0, cursor: 'pointer', flex: 1 }}>
              Mode Maintenance
            </label>
          </div>

          <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <input
              type="checkbox"
              checked={settings.allowRegistration}
              onChange={(e) => handleSettingChange('allowRegistration', e.target.checked)}
              id="registration"
              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            />
            <label htmlFor="registration" style={{ margin: 0, cursor: 'pointer', flex: 1 }}>
              Autoriser les Inscriptions
            </label>
          </div>

          <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <input
              type="checkbox"
              checked={settings.requireEmailVerification}
              onChange={(e) => handleSettingChange('requireEmailVerification', e.target.checked)}
              id="verification"
              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            />
            <label htmlFor="verification" style={{ margin: 0, cursor: 'pointer', flex: 1 }}>
              Vérification Email Obligatoire
            </label>
          </div>

          <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

          <h3>📁 Limites de Fichier</h3>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label>Taille Maximale (MB)</label>
            <input
              type="number"
              value={settings.maxFileSize}
              onChange={(e) => handleSettingChange('maxFileSize', parseInt(e.target.value))}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label>Délai d'Inactivité (minutes)</label>
            <input
              type="number"
              value={settings.sessionTimeout}
              onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <button
            onClick={handleSaveSettings}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
            onMouseOver={(e) => e.target.style.background = '#059669'}
            onMouseOut={(e) => e.target.style.background = '#10b981'}
          >
            ✅ Sauvegarder les Paramètres
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
