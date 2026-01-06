import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import participantService from '../../services/participantService';
import formationService from '../../services/formationService';
import formatorService from '../../services/formatorService';
import './ParticipantManagement.css';

const ParticipantManagement = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [groups, setGroups] = useState([]);
  const [formators, setFormators] = useState([]);
  const [selectedFormation, setSelectedFormation] = useState('');
  const [selectedFormator, setSelectedFormator] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [expandedFormation, setExpandedFormation] = useState(null);
  const [assigningFormator, setAssigningFormator] = useState(null);

  // Charger les groupes et formateurs
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [groupsResponse, formationsResponse, formatorsResponse] = await Promise.all([
        participantService.getGroups(),
        formationService.getAllFormations(),
        formatorService.getAllFormators()
      ]);

      // Normaliser les réponses (support {message, data} ou tableau direct)
      const normalizeArray = (res) => {
        if (!res) return [];
        if (Array.isArray(res)) return res;
        if (Array.isArray(res.data)) return res.data;
        return res.data?.data || [];
      };

      const groupsData = normalizeArray(groupsResponse);
      const formationsData = normalizeArray(formationsResponse);
      const formatorsData = normalizeArray(formatorsResponse);

      // Enrichir les groupes avec les infos de formation
      const enrichedGroups = await Promise.all(
        groupsData.map(async (group) => {
          const formation = formationsData.find(f => f.id === group.formationId);
          return {
            ...group,
            formation: formation
          };
        })
      );

      setGroups(enrichedGroups);
      setFormators(formatorsData);
      setError('');
    } catch (err) {
      console.error('Erreur lors du chargement:', err);
      setError('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchParticipants = (query) => {
    setSearchQuery(query);
  };

  const handleAssignFormator = async () => {
    if (!assigningFormator || !selectedFormator) {
      setError('Veuillez sélectionner un formateur');
      return;
    }

    try {
      setLoading(true);
      await participantService.assignFormatorToGroup({
        formationId: assigningFormator,
        formatorId: selectedFormator
      });

      setSuccess('✅ Formateur assigné avec succès!');
      setAssigningFormator(null);
      setSelectedFormator('');
      loadData();
    } catch (err) {
      console.error('Erreur lors de l\'assignation:', err);
      setError(err.response?.data?.message || 'Erreur lors de l\'assignation du formateur');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFormator = async (formationId) => {
    if (window.confirm('Êtes-vous sûr de vouloir retirer le formateur?')) {
      try {
        setLoading(true);
        await participantService.removeFormatorFromGroup(formationId);
        setSuccess('✅ Formateur retiré avec succès!');
        loadData();
      } catch (err) {
        console.error('Erreur lors du retrait:', err);
        setError('Erreur lors du retrait du formateur');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteParticipant = async (participantId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce participant?')) {
      try {
        await participantService.deleteParticipant(participantId);
        setSuccess('✅ Participant supprimé avec succès!');
        loadData();
      } catch (err) {
        console.error('Erreur lors de la suppression:', err);
        setError('Erreur lors de la suppression du participant');
      }
    }
  };

  const handleExportParticipants = async (formationId) => {
    try {
      setLoading(true);
      await participantService.exportParticipants(formationId, 'pdf');
      setSuccess('✅ Export PDF en cours...');
    } catch (err) {
      console.error('Erreur lors de l\'export:', err);
      setError('Erreur lors de l\'export');
    } finally {
      setLoading(false);
    }
  };

  const filterGroups = () => {
    let filtered = groups;

    // Filtre par recherche
    if (searchQuery.trim()) {
      filtered = filtered.map(group => ({
        ...group,
        participants: group.participants.filter(p =>
          p.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.city.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(group => group.participants.length > 0);
    }

    // Filtre par formation
    if (selectedFormation) {
      filtered = filtered.filter(group => group.formationId === selectedFormation);
    }

    return filtered;
  };

  const filteredGroups = filterGroups();
  const totalParticipants = groups.reduce((sum, group) => sum + (group.participants?.length || 0), 0);

  // Déterminer la route de retour selon le rôle
  const getDashboardRoute = () => {
    if (!user) return '/admin';
    switch (user.role) {
      case 'assistant':
        return '/assistant/dashboard';
      case 'formateur':
        return '/formateur/dashboard';
      case 'admin':
      default:
        return '/admin';
    }
  };

  if (loading && groups.length === 0) {
    return <div className="participants-container loading">Chargement des inscriptions...</div>;
  }

  return (
    <div className="participants-container">
      {/* En-tête */}
      <div className="participants-header">
        <div className="header-actions">
          <div className="header-text">
            <h1>Gestion des Inscriptions</h1>
            <p>Gérez les inscriptions aux formations et assignez les formateurs</p>
          </div>
          <button
            onClick={() => navigate(getDashboardRoute())}
            className="back-dashboard-btn"
            type="button"
          >
            ← Retour au tableau de bord
          </button>
        </div>
      </div>

      {/* Messages */}
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {/* Statistiques */}
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-number">{totalParticipants}</div>
          <div className="stat-label">Total d'inscrits</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{groups.length}</div>
          <div className="stat-label">Formations ouvertes</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{groups.filter(g => g.assignedFormator).length}</div>
          <div className="stat-label">Groupes avec formateur</div>
        </div>
      </div>

      {/* Outils de filtrage */}
      <div className="search-filter-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Rechercher un participant..."
            value={searchQuery}
            onChange={(e) => handleSearchParticipants(e.target.value)}
          />
        </div>

        <div className="formation-filter">
          <select 
            value={selectedFormation} 
            onChange={(e) => setSelectedFormation(e.target.value)}
          >
            <option value="">Toutes les formations</option>
            {groups.map(group => (
              <option key={group.formationId} value={group.formationId}>
                {group.formation?.title || `Formation ${group.formationId}`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Groupes */}
      {filteredGroups.length > 0 ? (
        <div className="groups-container">
          {filteredGroups.map(group => (
            <div key={group.formationId} className="group-card">
              {/* En-tête du groupe */}
              <div 
                className="group-header"
                onClick={() => setExpandedFormation(expandedFormation === group.formationId ? null : group.formationId)}
              >
                <div className="group-title">
                  <h2>{group.formation?.title || 'Formation'}</h2>
                  <span className="participant-count">
                    {group.participants?.length || 0} inscrit(s)
                  </span>
                </div>
                <div className="group-actions-header">
                  <span className={`expand-icon ${expandedFormation === group.formationId ? 'expanded' : ''}`}>
                    ▼
                  </span>
                </div>
              </div>

              {/* Détails du groupe */}
              {expandedFormation === group.formationId && (
                <div className="group-details">
                  {/* Infos formation */}
                  <div className="formation-info">
                    <div className="info-item">
                      <span className="label">Niveau:</span>
                      <span className="value">{group.formation?.level}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Durée:</span>
                      <span className="value">{group.formation?.hours}h</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Coût:</span>
                      <span className="value">{group.formation?.cost}€</span>
                    </div>
                  </div>

                  {/* Assignation formateur */}
                  <div className="formator-assignment">
                    <h3>Assignation du Formateur</h3>
                    {group.assignedFormator ? (
                      <div className="assigned-formator">
                        <p>
                          <strong>Formateur assigné:</strong> {group.assignedFormator.firstName} {group.assignedFormator.lastName}
                        </p>
                        <p><strong>Email:</strong> {group.assignedFormator.email}</p>
                        <p><strong>Expertise:</strong> {group.assignedFormator.expertise}</p>
                        <button
                          className="remove-formator-btn"
                          onClick={() => handleRemoveFormator(group.formationId)}
                        >
                          Retirer le formateur
                        </button>
                      </div>
                    ) : (
                      <div className="assign-formator">
                        {assigningFormator === group.formationId ? (
                          <div className="formator-select">
                            <select
                              value={selectedFormator}
                              onChange={(e) => setSelectedFormator(e.target.value)}
                            >
                              <option value="">Sélectionner un formateur</option>
                              {formators.map(f => (
                                <option key={f.id} value={f.id}>
                                  {f.firstName} {f.lastName} - {f.expertise}
                                </option>
                              ))}
                            </select>
                            <button
                              onClick={handleAssignFormator}
                              disabled={!selectedFormator || loading}
                            >
                              ✅ Assigner
                            </button>
                            <button
                              onClick={() => {
                                setAssigningFormator(null);
                                setSelectedFormator('');
                              }}
                              className="cancel-btn"
                            >
                              Annuler
                            </button>
                          </div>
                        ) : (
                          <button
                            className="assign-btn"
                            onClick={() => setAssigningFormator(group.formationId)}
                          >
                            👨‍🏫 Assigner un formateur
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Liste des participants */}
                  <div className="participants-list">
                    <div className="participants-header-row">
                      <h3>Participants ({group.participants?.length || 0})</h3>
                      <button
                        className="export-btn"
                        onClick={() => handleExportParticipants(group.formationId)}
                      >
                        📥 Exporter
                      </button>
                    </div>

                    <table className="participants-table">
                      <thead>
                        <tr>
                          <th>Prénom</th>
                          <th>Nom</th>
                          <th>Email</th>
                          <th>Téléphone</th>
                          <th>Ville</th>
                          <th>Date de naissance</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.participants && group.participants.map(participant => (
                          <tr key={participant.id}>
                            <td>{participant.firstName}</td>
                            <td>{participant.lastName}</td>
                            <td>
                              <a href={`mailto:${participant.email}`}>{participant.email}</a>
                            </td>
                            <td>
                              <a href={`tel:${participant.phone}`}>{participant.phone}</a>
                            </td>
                            <td>{participant.city}</td>
                            <td>{new Date(participant.birthDate).toLocaleDateString()}</td>
                            <td className="actions-cell">
                              <button
                                className="delete-btn"
                                onClick={() => handleDeleteParticipant(participant.id)}
                                title="Supprimer cet inscrit"
                              >
                                🗑️
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="no-participants">
          {groups.length === 0 ? (
            <>
              <p>Aucune inscription pour le moment.</p>
              <p>Les participants peuvent s'inscrire via la page d'accueil.</p>
            </>
          ) : (
            <>
              <p>Aucun participant ne correspond à votre recherche.</p>
              <button onClick={() => {
                setSearchQuery('');
                setSelectedFormation('');
              }}>
                Réinitialiser les filtres
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ParticipantManagement;
