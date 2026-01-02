import api from '../config/api';

const entrepriseService = {
  // Récupérer toutes les entreprises
  getAllEntreprises: async () => {
    try {
      const response = await api.get('/entreprises');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Récupérer une entreprise par ID
  getEntrepriseById: async (id) => {
    try {
      const response = await api.get(`/entreprises/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Créer une nouvelle entreprise
  createEntreprise: async (entrepriseData) => {
    try {
      const response = await api.post('/entreprises', entrepriseData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Mettre à jour une entreprise
  updateEntreprise: async (id, entrepriseData) => {
    try {
      const response = await api.put(`/entreprises/${id}`, entrepriseData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Supprimer une entreprise
  deleteEntreprise: async (id) => {
    try {
      const response = await api.delete(`/entreprises/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Obtenir les entreprises par secteur
  getEntreprisesBySector: async (sector) => {
    try {
      const response = await api.get(`/entreprises/sector/${sector}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Obtenir tous les secteurs uniques
  getAllSectors: async () => {
    try {
      const response = await api.get('/entreprises/sectors/all');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Obtenir les entreprises par ville
  getEntreprisesByCity: async (city) => {
    try {
      const response = await api.get(`/entreprises/city/${city}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Rechercher les entreprises
  searchEntreprises: async (query) => {
    try {
      const response = await api.get(`/entreprises/search?q=${query}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default entrepriseService;
