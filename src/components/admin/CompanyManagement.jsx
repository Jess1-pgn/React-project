import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../config/api';
import './AdminManagement.css';

const CompanyManagement = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCompany, setEditingCompany] = useState(null);
  const [newCompany, setNewCompany] = useState({
    name: '',
    sector: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    website: '',
  });

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      setLoading(true);
      const mockCompanies = [
        {
          id: '1',
          name: 'TechCorp',
          sector: 'Informatique',
          email: 'contact@techcorp.fr',
          phone: '+33612345678',
          address: '123 Rue de la Tech',
          city: 'Paris',
          website: 'www.techcorp.fr',
          employees: 250,
          status: 'actif',
          joinedDate: '2024-01-01',
        },
        {
          id: '2',
          name: 'InnovateLabs',
          sector: 'Startup',
          email: 'hello@innovatelabs.fr',
          phone: '+33698765432',
          address: '456 Avenue Innovation',
          city: 'Lyon',
          website: 'www.innovatelabs.fr',
          employees: 45,
          status: 'actif',
          joinedDate: '2024-01-15',
        },
      ];
      setCompanies(mockCompanies);
      setError('');
    } catch (err) {
      setError('Erreur lors du chargement des entreprises');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCompany = (e) => {
    e.preventDefault();
    if (editingCompany) {
      setCompanies(companies.map(c => c.id === editingCompany.id ? { ...editingCompany, ...newCompany } : c));
    } else {
      setCompanies([
        ...companies,
        {
          id: Date.now().toString(),
          ...newCompany,
          employees: 0,
          status: 'actif',
          joinedDate: new Date().toISOString().split('T')[0],
        },
      ]);
    }
    setNewCompany({ name: '', sector: '', email: '', phone: '', address: '', city: '', website: '' });
    setShowForm(false);
    setEditingCompany(null);
  };

  const handleEditCompany = (company) => {
    setEditingCompany(company);
    setNewCompany({
      name: company.name,
      sector: company.sector,
      email: company.email,
      phone: company.phone,
      address: company.address,
      city: company.city,
      website: company.website,
    });
    setShowForm(true);
  };

  const handleDeleteCompany = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette entreprise ?')) {
      setCompanies(companies.filter(c => c.id !== id));
    }
  };

  const filteredCompanies = companies.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="admin-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Chargement des entreprises...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>🏢 Gestion des Entreprises</h1>
        <button onClick={() => navigate(-1)} className="back-btn">← Retour</button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="admin-controls">
        <input
          type="text"
          placeholder="Rechercher par nom, secteur, ville..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingCompany(null);
            setNewCompany({ name: '', sector: '', email: '', phone: '', address: '', city: '', website: '' });
          }}
          className="btn-add"
        >
          {showForm ? '❌ Annuler' : '➕ Ajouter une entreprise'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddCompany} className="admin-form">
          <div className="form-row">
            <div className="form-group">
              <label>Nom de l'entreprise</label>
              <input
                type="text"
                value={newCompany.name}
                onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                placeholder="Nom"
                required
              />
            </div>
            <div className="form-group">
              <label>Secteur</label>
              <input
                type="text"
                value={newCompany.sector}
                onChange={(e) => setNewCompany({ ...newCompany, sector: e.target.value })}
                placeholder="ex: Informatique"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={newCompany.email}
                onChange={(e) => setNewCompany({ ...newCompany, email: e.target.value })}
                placeholder="email@test.com"
                required
              />
            </div>
            <div className="form-group">
              <label>Téléphone</label>
              <input
                type="tel"
                value={newCompany.phone}
                onChange={(e) => setNewCompany({ ...newCompany, phone: e.target.value })}
                placeholder="+33612345678"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Adresse</label>
              <input
                type="text"
                value={newCompany.address}
                onChange={(e) => setNewCompany({ ...newCompany, address: e.target.value })}
                placeholder="Adresse"
              />
            </div>
            <div className="form-group">
              <label>Ville</label>
              <input
                type="text"
                value={newCompany.city}
                onChange={(e) => setNewCompany({ ...newCompany, city: e.target.value })}
                placeholder="Ville"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Site web</label>
            <input
              type="url"
              value={newCompany.website}
              onChange={(e) => setNewCompany({ ...newCompany, website: e.target.value })}
              placeholder="https://..."
            />
          </div>

          <button type="submit" className="btn-submit">
            {editingCompany ? '✏️ Modifier' : '✅ Ajouter'}
          </button>
        </form>
      )}

      {filteredCompanies.length === 0 ? (
        <div className="empty-state">
          <h2>Aucune entreprise trouvée</h2>
          <p>Créez votre première entreprise partenaire</p>
        </div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Secteur</th>
                <th>Email</th>
                <th>Ville</th>
                <th>Salariés</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCompanies.map(c => (
                <tr key={c.id}>
                  <td><strong>{c.name}</strong></td>
                  <td>{c.sector}</td>
                  <td>{c.email}</td>
                  <td>{c.city}</td>
                  <td className="center">{c.employees}</td>
                  <td>
                    <span className="status-badge active">✅ Actif</span>
                  </td>
                  <td className="actions">
                    <button onClick={() => handleEditCompany(c)} className="btn-edit">✏️</button>
                    <button onClick={() => handleDeleteCompany(c.id)} className="btn-delete">🗑️</button>
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

export default CompanyManagement;
