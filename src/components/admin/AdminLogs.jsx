import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminManagement.css';

const AdminLogs = () => {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = () => {
    const mockLogs = [
      {
        id: '1',
        timestamp: '2024-01-20 14:30:25',
        type: 'user_login',
        user: 'admin',
        ip: '192.168.1.100',
        action: 'Connexion utilisateur',
        status: 'succès',
      },
      {
        id: '2',
        timestamp: '2024-01-20 14:25:10',
        type: 'formation_created',
        user: 'formateur',
        ip: '192.168.1.105',
        action: 'Création formation "Web Dev"',
        status: 'succès',
      },
      {
        id: '3',
        timestamp: '2024-01-20 14:20:45',
        type: 'user_deleted',
        user: 'admin',
        ip: '192.168.1.100',
        action: 'Suppression utilisateur ID:123',
        status: 'succès',
      },
      {
        id: '4',
        timestamp: '2024-01-20 14:15:30',
        type: 'formation_updated',
        user: 'formateur',
        ip: '192.168.1.105',
        action: 'Modification formation ID:45',
        status: 'succès',
      },
      {
        id: '5',
        timestamp: '2024-01-20 14:10:15',
        type: 'user_registered',
        user: 'alice.dupont',
        ip: '192.168.1.120',
        action: 'Inscription nouvel utilisateur',
        status: 'succès',
      },
      {
        id: '6',
        timestamp: '2024-01-20 14:05:00',
        type: 'error',
        user: 'system',
        ip: '127.0.0.1',
        action: 'Erreur base de données',
        status: 'erreur',
      },
      {
        id: '7',
        timestamp: '2024-01-20 13:50:30',
        type: 'participant_enrolled',
        user: 'bob.martin',
        ip: '192.168.1.115',
        action: 'Inscription formation "Data Science"',
        status: 'succès',
      },
      {
        id: '8',
        timestamp: '2024-01-20 13:45:00',
        type: 'user_login',
        user: 'marie.martin',
        ip: '192.168.1.110',
        action: 'Connexion utilisateur',
        status: 'succès',
      },
    ];
    setLogs(mockLogs);
  };

  const logTypes = [
    { id: 'user_login', label: '🔓 Connexion', icon: '🔓' },
    { id: 'user_registered', label: '📝 Inscription', icon: '📝' },
    { id: 'user_deleted', label: '🗑️ Suppression', icon: '🗑️' },
    { id: 'formation_created', label: '📚 Formation créée', icon: '📚' },
    { id: 'formation_updated', label: '✏️ Formation modifiée', icon: '✏️' },
    { id: 'participant_enrolled', label: '✅ Inscription participant', icon: '✅' },
    { id: 'error', label: '❌ Erreur', icon: '❌' },
  ];

  const getLogColor = (type) => {
    const colors = {
      user_login: '#3b82f6',
      user_registered: '#10b981',
      user_deleted: '#ef4444',
      formation_created: '#f59e0b',
      formation_updated: '#8b5cf6',
      participant_enrolled: '#06b6d4',
      error: '#dc2626',
    };
    return colors[type] || '#6b7280';
  };

  const getStatusColor = (status) => {
    return status === 'succès' ? '#10b981' : '#ef4444';
  };

  const filteredLogs = logs.filter(log => {
    const matchesType = !filterType || log.type === filterType;
    const matchesSearch =
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ip.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>📝 Journaux d'Activité</h1>
        <button onClick={() => navigate(-1)} className="back-btn">← Retour</button>
      </div>

      <div className="admin-controls">
        <input
          type="text"
          placeholder="Rechercher par utilisateur, action, IP..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="filter-select"
        >
          <option value="">Tous les types</option>
          {logTypes.map(type => (
            <option key={type.id} value={type.id}>{type.label}</option>
          ))}
        </select>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Horodatage</th>
              <th>Type</th>
              <th>Utilisateur</th>
              <th>Adresse IP</th>
              <th>Action</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map(log => (
              <tr key={log.id}>
                <td style={{ fontSize: '0.9rem', color: '#6b7280' }}>{log.timestamp}</td>
                <td>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '2rem',
                      background: getLogColor(log.type),
                      color: 'white',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                    }}
                  >
                    {logTypes.find(t => t.id === log.type)?.label || log.type}
                  </span>
                </td>
                <td><strong>{log.user}</strong></td>
                <td style={{ fontSize: '0.9rem', color: '#6b7280' }}>{log.ip}</td>
                <td>{log.action}</td>
                <td>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '2rem',
                      background: getStatusColor(log.status),
                      color: 'white',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      textTransform: 'capitalize',
                    }}
                  >
                    {log.status === 'succès' ? '✅ Succès' : '❌ Erreur'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f3f4f6', borderRadius: '0.5rem', textAlign: 'center', color: '#6b7280' }}>
        Total: {filteredLogs.length} entrée(s) | Page 1 sur 1
      </div>
    </div>
  );
};

export default AdminLogs;
