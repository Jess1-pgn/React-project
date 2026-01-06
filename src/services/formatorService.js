import api from '../config/api';

const formatorService = {
  // Récupérer tous les formateurs
  getAllFormators: async () => {
    try {
      const response = await api.get('/admin/formateurs');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Récupérer un formateur par ID
  getFormatorById: async (id) => {
    try {
      const response = await api.get(`/admin/formateurs/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Créer un nouveau formateur
  createFormator: async (formatorData) => {
    try {
      const response = await api.post('/admin/formateurs', formatorData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Mettre à jour un formateur
  updateFormator: async (id, formatorData) => {
    try {
      const response = await api.put(`/admin/formateurs/${id}`, formatorData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Supprimer un formateur
  deleteFormator: async (id) => {
    try {
      const response = await api.delete(`/admin/formateurs/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Obtenir les formateurs par compétence
  getFormatorsBySkill: async (skill) => {
    try {
      const response = await api.get(`/admin/formateurs/skill/${skill}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Obtenir toutes les compétences uniques
  getAllSkills: async () => {
    try {
      const response = await api.get('/admin/formateurs/skills/all');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Assigner un formateur à une formation
  assignToFormation: async (formatorId, formationId) => {
    try {
      const response = await api.post(
        `/admin/formateurs/${formatorId}/formations`,
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
        `/admin/formateurs/${formatorId}/formations/${formationId}`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Obtenir les formations d'un formateur
  getFormatorFormations: async (formatorId) => {
    try {
      const response = await api.get(`/admin/formateurs/${formatorId}/formations`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Enregistrer un formateur externe
  registerExternalFormator: async (firstName, lastName, email, phone, keywords, bio) => {
    try {
      const response = await api.post('/admin/formateurs/external-register', {
        firstName,
        lastName,
        email,
        phone,
        keywords,
        bio,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Récupérer les demandes en attente (admin)
  getPendingApplications: async () => {
    try {
      const response = await api.get('/admin/formateurs/applications/pending');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Approuver une demande (admin)
  approveApplication: async (applicationId) => {
    try {
      const response = await api.put(`/admin/formateurs/applications/${applicationId}/approve`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Rejeter une demande (admin)
  rejectApplication: async (applicationId, reason) => {
    try {
      const response = await api.put(`/admin/formateurs/applications/${applicationId}/reject`, { reason });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default formatorService;
