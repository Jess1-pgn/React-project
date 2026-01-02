import api from '../config/api';

const ENDPOINT = '/participants';

const participantService = {
  // Inscription à une formation
  registerForFormation: (data) => 
    api.post(`${ENDPOINT}/register`, data),

  // Récupérer tous les participants
  getAllParticipants: () => 
    api.get(ENDPOINT),

  // Récupérer les participants par formation
  getParticipantsByFormation: (formationId) => 
    api.get(`${ENDPOINT}/formation/${formationId}`),

  // Récupérer un participant par ID
  getParticipantById: (id) => 
    api.get(`${ENDPOINT}/${id}`),

  // Mettre à jour les infos d'un participant
  updateParticipant: (id, data) => 
    api.put(`${ENDPOINT}/${id}`, data),

  // Supprimer un participant
  deleteParticipant: (id) => 
    api.delete(`${ENDPOINT}/${id}`),

  // Assigner un formateur à un groupe de participants
  assignFormatorToGroup: (groupData) => 
    api.post(`${ENDPOINT}/assign-formator`, groupData),

  // Récupérer les groupes (participants groupés par formation)
  getGroups: () => 
    api.get(`${ENDPOINT}/groups/all`),

  // Récupérer le formateur assigné à un groupe
  getGroupFormator: (formationId) => 
    api.get(`${ENDPOINT}/group/${formationId}/formator`),

  // Retirer un formateur d'un groupe
  removeFormatorFromGroup: (formationId) => 
    api.delete(`${ENDPOINT}/group/${formationId}/formator`),

  // Rechercher les participants
  searchParticipants: (query) => 
    api.get(`${ENDPOINT}/search`, { params: { q: query } }),

  // Exporter les participants en PDF/Excel
  exportParticipants: (formationId, format = 'pdf') => 
    api.get(`${ENDPOINT}/formation/${formationId}/export`, { 
      params: { format },
      responseType: 'blob'
    }),

  // Envoyer un email à tous les participants d'une formation
  sendEmailToGroup: (formationId, emailData) => 
    api.post(`${ENDPOINT}/group/${formationId}/send-email`, emailData),

  // Obtenir les statistiques des inscriptions
  getRegistrationStats: () => 
    api.get(`${ENDPOINT}/stats`),

  // Récupérer les participants par ville
  getParticipantsByCity: (city) => 
    api.get(`${ENDPOINT}/city/${city}`),

  // Marquer un participant comme présent
  markAsPresent: (participantId, sessionDate) => 
    api.post(`${ENDPOINT}/${participantId}/attendance`, { sessionDate }),

  // Obtenir l'historique d'assiduité
  getAttendanceHistory: (participantId) => 
    api.get(`${ENDPOINT}/${participantId}/attendance`)
};

export default participantService;
