import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../config/api';
import './AdminManagement.css';

const ParticipantManagement = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterFormation, setFilterFormation] = useState('');

  useEffect(() => {
    loadParticipants();
  }, []);

  const loadParticipants = async () => {
    try {
      setLoading(true);
      const mockParticipants = [
        {
          id: '1',
          firstName: 'Alice',
          lastName: 'Dupont',
          email: 'alice.dupont@test.com',
          formation: 'Web Development',
          formationId: '1',
          enrolledDate: '2024-01-15',
          status: 'en_cours',
          progress: 65,
          formator: 'Jean Durand',
        },
        {
          id: '2',
          firstName: 'Bob',
          lastName: 'Martin',
          email: 'bob.martin@test.com',
          formation: 'Data Science',
          formationId: '2',
          enrolledDate: '2024-01-20',
          status: 'en_cours',
          progress: 40,
          formator: 'Marie Martin',
        },
        {
          id: '3',
          firstName: 'Claire',
          lastName: 'Bernard',
          email: 'claire.bernard@test.com',
          formation: 'Web Development',
          formationId: '1',
          enrolledDate: '2024-01-10',
          status: 'complétée',
          progress: 100,
          formator: 'Jean Durand',
        },
      ];
      setParticipants(mockParticipants);
      setError('');
    } catch (err) {
      setError('Erreur lors du chargement des inscriptions');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = (id, newStatus) => {
    setParticipants(participants.map(p =>
      p.id === id ? { ...p, status: newStatus } : p
    ));
  };

  const handleDeleteParticipant = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette inscription ?')) {
      setParticipants(participants.filter(p => p.id !== id));
    }
  };

  const formations = [...new Set(participants.map(p => p.formation))];

  const filteredParticipants = participants.filter(p => {
    const matchesSearch =
      p.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || p.status === filterStatus;
    const matchesFormation = !filterFormation || p.formation === filterFormation;
    return matchesSearch && matchesStatus && matchesFormation;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'en_cours':
        return '#fbbf24';
      case 'complétée':
        return '#34d399';
      case 'suspendue':
        return '#f87171';
      default:
        return '#6b7280';
    }
  };

  const getStatusLabel = (status) => {
    const labels = {
      en_cours: '⏳ En cours',
      complétée: '✅ Complétée',
      suspendue: '⏸️ Suspendue',
    };
    return labels[status] || status;
  };

  if (loading) {
    return (
      <div className="admin-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Chargement des inscriptions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>👥 Gestion des Inscriptions</h1>
        <button onClick={() => navigate(-1)} className="back-btn">← Retour</button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="admin-controls">
        <input
          type="text"
          placeholder="Rechercher par nom, email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="filter-select"
        >
          <option value="">Tous les statuts</option>
          <option value="en_cours">En cours</option>
          <option value="complétée">Complétée</option>
          <option value="suspendue">Suspendue</option>
        </select>
        <select
          value={filterFormation}
          onChange={(e) => setFilterFormation(e.target.value)}
          className="filter-select"
        >
          <option value="">Toutes les formations</option>
          {formations.map(f => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>

      {filteredParticipants.length === 0 ? (
        <div className="empty-state">
          <h2>Aucune inscription trouvée</h2>
          <p>Les inscriptions apparaîtront ici</p>
        </div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Formation</th>
                <th>Formateur</th>
                <th>Progression</th>
                <th>Statut</th>
                <th>Changement de statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredParticipants.map(p => (
                <tr key={p.id}>
                  <td><strong>{p.firstName} {p.lastName}</strong></td>
                  <td>{p.email}</td>
                  <td>{p.formation}</td>
                  <td>{p.formator}</td>
                  <td>
                    <div style={{ width: '100%', background: '#e5e7eb', borderRadius: '0.25rem' }}>
                      <div
                        style={{
                          width: `${p.progress}%`,
                          background: p.progress < 50 ? '#ef4444' : p.progress < 80 ? '#f59e0b' : '#10b981',
                          height: '20px',
                          borderRadius: '0.25rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '0.7rem',
                          fontWeight: 'bold',
                        }}
                      >
                        {p.progress}%
                      </div>
                    </div>
                  </td>
                  <td>
                    <span
                      className="status-badge"
                      style={{
                        background: getStatusColor(p.status),
                        color: 'white',
                      }}
                    >
                      {getStatusLabel(p.status)}
                    </span>
                  </td>
                  <td>
                    <select
                      value={p.status}
                      onChange={(e) => handleUpdateStatus(p.id, e.target.value)}
                      style={{
                        padding: '0.35rem 0.5rem',
                        borderRadius: '0.25rem',
                        border: '1px solid #d1d5db',
                        fontSize: '0.9rem',
                      }}
                    >
                      <option value="en_cours">En cours</option>
                      <option value="complétée">Complétée</option>
                      <option value="suspendue">Suspendue</option>
                    </select>
                  </td>
                  <td className="actions">
                    <button
                      onClick={() => handleDeleteParticipant(p.id)}
                      className="btn-delete"
                      title="Supprimer"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ParticipantManagement;
