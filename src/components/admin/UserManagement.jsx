import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../config/api';
import './AdminManagement.css';

const UserManagement = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'user',
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      // Mock data for users
      const mockUsers = [
        {
          id: '1',
          username: 'admin',
          email: 'admin@test.com',
          firstName: 'Admin',
          lastName: 'User',
          role: 'admin',
          createdAt: '2024-01-01',
          status: 'actif',
        },
        {
          id: '2',
          username: 'formateur',
          email: 'formateur@test.com',
          firstName: 'Formateur',
          lastName: 'User',
          role: 'formateur',
          createdAt: '2024-01-02',
          status: 'actif',
        },
        {
          id: '3',
          username: 'assistant',
          email: 'assistant@test.com',
          firstName: 'Assistant',
          lastName: 'User',
          role: 'assistant',
          createdAt: '2024-01-03',
          status: 'actif',
        },
      ];
      setUsers(mockUsers);
      setError('');
    } catch (err) {
      setError('Erreur lors du chargement des utilisateurs');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (editingUser) {
      // Edit existing user
      setUsers(users.map(u => u.id === editingUser.id ? { ...editingUser, ...newUser } : u));
    } else {
      // Add new user
      setUsers([
        ...users,
        {
          id: Date.now().toString(),
          ...newUser,
          createdAt: new Date().toISOString().split('T')[0],
          status: 'actif',
        },
      ]);
    }
    setNewUser({ username: '', email: '', password: '', firstName: '', lastName: '', role: 'user' });
    setShowForm(false);
    setEditingUser(null);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser({
      username: user.username,
      email: user.email,
      password: '',
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    });
    setShowForm(true);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const filteredUsers = users.filter(u =>
    u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const roleColors = {
    admin: '#dc2626',
    formateur: '#2563eb',
    assistant: '#f59e0b',
    user: '#6b7280',
  };

  if (loading) {
    return (
      <div className="admin-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Chargement des utilisateurs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>👥 Gestion des Utilisateurs</h1>
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Retour
        </button>
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
            setEditingUser(null);
            setNewUser({ username: '', email: '', password: '', firstName: '', lastName: '', role: 'user' });
          }}
          className="btn-add"
        >
          {showForm ? '❌ Annuler' : '➕ Ajouter un utilisateur'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddUser} className="admin-form">
          <div className="form-row">
            <div className="form-group">
              <label>Nom d'utilisateur</label>
              <input
                type="text"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                placeholder="username"
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                placeholder="email@test.com"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Prénom</label>
              <input
                type="text"
                value={newUser.firstName}
                onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                placeholder="Prénom"
              />
            </div>
            <div className="form-group">
              <label>Nom</label>
              <input
                type="text"
                value={newUser.lastName}
                onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                placeholder="Nom"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Mot de passe</label>
              <input
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                placeholder="Mot de passe"
                required={!editingUser}
              />
            </div>
            <div className="form-group">
              <label>Rôle</label>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              >
                <option value="user">Utilisateur</option>
                <option value="formateur">Formateur</option>
                <option value="assistant">Assistant</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn-submit">
            {editingUser ? '✏️ Modifier' : '✅ Ajouter'}
          </button>
        </form>
      )}

      {filteredUsers.length === 0 ? (
        <div className="empty-state">
          <h2>Aucun utilisateur trouvé</h2>
          <p>Créez un premier utilisateur</p>
        </div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nom d'utilisateur</th>
                <th>Email</th>
                <th>Prénom</th>
                <th>Nom</th>
                <th>Rôle</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(u => (
                <tr key={u.id}>
                  <td><strong>{u.username}</strong></td>
                  <td>{u.email}</td>
                  <td>{u.firstName}</td>
                  <td>{u.lastName}</td>
                  <td>
                    <span
                      className="role-badge"
                      style={{ background: roleColors[u.role] || '#6b7280' }}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td>
                    <span className="status-badge active">{u.status}</span>
                  </td>
                  <td className="actions">
                    <button
                      onClick={() => handleEditUser(u)}
                      className="btn-edit"
                      title="Modifier"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDeleteUser(u.id)}
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

export default UserManagement;
