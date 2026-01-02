import api from '../config/api';

const formatorService = {
  // Récupérer tous les formateurs
  getAllFormators: async () => {
    try {
      const response = await api.get('/formateurs');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Récupérer un formateur par ID
  getFormatorById: async (id) => {
    try {
      const response = await api.get(`/formateurs/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Créer un nouveau formateur
  createFormator: async (formatorData) => {
    try {
      const response = await api.post('/formateurs', formatorData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Mettre à jour un formateur
  updateFormator: async (id, formatorData) => {
    try {
      const response = await api.put(`/formateurs/${id}`, formatorData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Supprimer un formateur
  deleteFormator: async (id) => {
    try {
      const response = await api.delete(`/formateurs/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Obtenir les formateurs par compétence
  getFormatorsBySkill: async (skill) => {
    try {
      const response = await api.get(`/formateurs/skill/${skill}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Obtenir toutes les compétences uniques
  getAllSkills: async () => {
    try {
      const response = await api.get('/formateurs/skills/all');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Assigner un formateur à une formation
  assignToFormation: async (formatorId, formationId) => {
    try {
      const response = await api.post(
        `/formateurs/${formatorId}/formations`,
        { formationId }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Retirer un formateur d'une formation
  removeFromFormation: async (formatorId, formationId) => {
    try {
      const response = await api.delete(
        `/formateurs/${formatorId}/formations/${formationId}`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Obtenir les formations d'un formateur
  getFormatorFormations: async (formatorId) => {
    try {
      const response = await api.get(`/formateurs/${formatorId}/formations`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default formatorService;
