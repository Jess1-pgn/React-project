import api from '../config/api';

const formationService = {
  // Récupérer toutes les formations
  getAllFormations: async () => {
    try {
      const response = await api.get('/formations');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Récupérer une formation par ID
  getFormationById: async (id) => {
    try {
      const response = await api.get(`/formations/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Créer une nouvelle formation
  createFormation: async (formationData) => {
    try {
      const response = await api.post('/formations', formationData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Mettre à jour une formation
  updateFormation: async (id, formationData) => {
    try {
      const response = await api.put(`/formations/${id}`, formationData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Supprimer une formation
  deleteFormation: async (id) => {
    try {
      const response = await api.delete(`/formations/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Obtenir les formations par catégorie
  getFormationsByCategory: async (category) => {
    try {
      const response = await api.get(`/formations/category/${category}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Obtenir les formations par niveau
  getFormationsByLevel: async (level) => {
    try {
      const response = await api.get(`/formations/level/${level}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Ajouter un participant à une formation
  addParticipant: async (formationId, userId) => {
    try {
      const response = await api.post(
        `/formations/${formationId}/participants`,
        { userId }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Retirer un participant d'une formation
  removeParticipant: async (formationId, userId) => {
    try {
      const response = await api.delete(
        `/formations/${formationId}/participants/${userId}`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Obtenir les participants d'une formation
  getParticipants: async (formationId) => {
    try {
      const response = await api.get(`/formations/${formationId}/participants`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default formationService;
