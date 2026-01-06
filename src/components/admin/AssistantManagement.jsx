import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../config/api';
import './AdminManagement.css';

const AssistantManagement = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [assistants, setAssistants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingAssistant, setEditingAssistant] = useState(null);
  const [newAssistant, setNewAssistant] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
  });

  useEffect(() => {
    loadAssistants();
  }, []);

  const loadAssistants = async () => {
    try {
      setLoading(true);
      const mockAssistants = [
        {
          id: '1',
          firstName: 'Assistant',
          lastName: 'User',
          email: 'assistant@test.com',
          phone: '+33612345678',
          department: 'Support',
          tasksCount: 5,
          status: 'actif',
          joinedDate: '2024-01-03',
        },
        {
          id: '2',
          firstName: 'Sophie',
          lastName: 'Bernard',
          email: 'sophie.bernard@test.com',
          phone: '+33698765432',
          department: 'Administration',
          tasksCount: 8,
          status: 'actif',
          joinedDate: '2024-01-10',
        },
      ];
      setAssistants(mockAssistants);
      setError('');
    } catch (err) {
      setError('Erreur lors du chargement des assistants');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAssistant = (e) => {
    e.preventDefault();
    if (editingAssistant) {
      setAssistants(assistants.map(a => a.id === editingAssistant.id ? { ...editingAssistant, ...newAssistant } : a));
    } else {
      setAssistants([
        ...assistants,
        {
          id: Date.now().toString(),
          ...newAssistant,
          tasksCount: 0,
          status: 'actif',
          joinedDate: new Date().toISOString().split('T')[0],
        },
      ]);
    }
    setNewAssistant({ firstName: '', lastName: '', email: '', phone: '', department: '' });
    setShowForm(false);
    setEditingAssistant(null);
  };

  const handleEditAssistant = (assistant) => {
    setEditingAssistant(assistant);
    setNewAssistant({
      firstName: assistant.firstName,
      lastName: assistant.lastName,
      email: assistant.email,
      phone: assistant.phone,
      department: assistant.department,
    });
    setShowForm(true);
  };

  const handleDeleteAssistant = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet assistant ?')) {
      setAssistants(assistants.filter(a => a.id !== id));
    }
  };

  const filteredAssistants = assistants.filter(a =>
    a.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="admin-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Chargement des assistants...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>👨‍💻 Gestion des Assistants</h1>
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
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingAssistant(null);
            setNewAssistant({ firstName: '', lastName: '', email: '', phone: '', department: '' });
          }}
          className="btn-add"
        >
          {showForm ? '❌ Annuler' : '➕ Ajouter un assistant'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddAssistant} className="admin-form">
          <div className="form-row">
            <div className="form-group">
              <label>Prénom</label>
              <input
                type="text"
                value={newAssistant.firstName}
                onChange={(e) => setNewAssistant({ ...newAssistant, firstName: e.target.value })}
                placeholder="Prénom"
                required
              />
            </div>
            <div className="form-group">
              <label>Nom</label>
              <input
                type="text"
                value={newAssistant.lastName}
                onChange={(e) => setNewAssistant({ ...newAssistant, lastName: e.target.value })}
                placeholder="Nom"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={newAssistant.email}
                onChange={(e) => setNewAssistant({ ...newAssistant, email: e.target.value })}
                placeholder="email@test.com"
                required
              />
            </div>
            <div className="form-group">
              <label>Département</label>
              <input
                type="text"
                value={newAssistant.department}
                onChange={(e) => setNewAssistant({ ...newAssistant, department: e.target.value })}
                placeholder="ex: Support"
              />
            </div>
          </div>

          <button type="submit" className="btn-submit">
            {editingAssistant ? '✏️ Modifier' : '✅ Ajouter'}
          </button>
        </form>
      )}

      {filteredAssistants.length === 0 ? (
        <div className="empty-state">
          <h2>Aucun assistant trouvé</h2>
          <p>Créez votre premier assistant</p>
        </div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nom complet</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Département</th>
                <th>Tâches</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssistants.map(a => (
                <tr key={a.id}>
                  <td><strong>{a.firstName} {a.lastName}</strong></td>
                  <td>{a.email}</td>
                  <td>{a.phone}</td>
                  <td>{a.department}</td>
                  <td className="center">{a.tasksCount}</td>
                  <td>
                    <span className="status-badge active">✅ Actif</span>
                  </td>
                  <td className="actions">
                    <button onClick={() => handleEditAssistant(a)} className="btn-edit">✏️</button>
                    <button onClick={() => handleDeleteAssistant(a.id)} className="btn-delete">🗑️</button>
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

export default AssistantManagement;
