import api from '../config/api';

/**
 * Service pour gérer la planification des formations
 * (association formation + formateur + entreprise + dates)
 */

class SchedulingService {
  /**
   * Récupère tous les plannings
   */
  async getAll(filters = {}) {
    try {
      const response = await api.get('/formations-planifiees', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching plannings:', error);
      throw error;
    }
  }

  /**
   * Récupère un planning par ID
   */
  async getById(id) {
    try {
      const response = await api.get(`/formations-planifiees/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching planning ${id}:`, error);
      throw error;
    }
  }

  /**
   * Crée un nouveau planning
   */
  async create(planningData) {
    try {
      const response = await api.post('/formations-planifiees', planningData);
      return response.data;
    } catch (error) {
      console.error('Error creating planning:', error);
      throw error;
    }
  }

  /**
   * Met à jour un planning
   */
  async update(id, planningData) {
    try {
      const response = await api.put(`/formations-planifiees/${id}`, planningData);
      return response.data;
    } catch (error) {
      console.error(`Error updating planning ${id}:`, error);
      throw error;
    }
  }

  /**
   * Supprime un planning
   */
  async delete(id) {
    try {
      const response = await api.delete(`/formations-planifiees/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting planning ${id}:`, error);
      throw error;
    }
  }

  /**
   * Récupère les plannings par formation
   */
  async getByFormation(formationId) {
    try {
      const response = await api.get('/formations-planifiees', {
        params: { formationId },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching plannings for formation ${formationId}:`, error);
      throw error;
    }
  }

  /**
   * Récupère les plannings par formateur
   */
  async getByFormateur(formateurId) {
    try {
      const response = await api.get('/formations-planifiees', {
        params: { formateurId },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching plannings for formateur ${formateurId}:`, error);
      throw error;
    }
  }

  /**
   * Récupère les plannings par entreprise
   */
  async getByEntreprise(entrepriseId) {
    try {
      const response = await api.get('/formations-planifiees', {
        params: { entrepriseId },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching plannings for entreprise ${entrepriseId}:`, error);
      throw error;
    }
  }

  /**
   * Récupère les plannings dans une plage de dates
   */
  async getByDateRange(startDate, endDate) {
    try {
      const response = await api.get('/formations-planifiees', {
        params: {
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching plannings by date range:', error);
      throw error;
    }
  }

  /**
   * Récupère les plannings avec leur statut
   */
  async getByStatus(status) {
    try {
      const response = await api.get('/formations-planifiees', {
        params: { status },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching plannings with status ${status}:`, error);
      throw error;
    }
  }

  /**
   * Annule un planning
   */
  async cancel(id, reason = '') {
    try {
      const response = await api.patch(`/formations-planifiees/${id}/cancel`, {
        reason,
        cancelledAt: new Date().toISOString(),
      });
      return response.data;
    } catch (error) {
      console.error(`Error cancelling planning ${id}:`, error);
      throw error;
    }
  }

  /**
   * Marque un planning comme en cours
   */
  async markAsInProgress(id) {
    try {
      const response = await api.patch(`/formations-planifiees/${id}/start`, {
        startedAt: new Date().toISOString(),
      });
      return response.data;
    } catch (error) {
      console.error(`Error marking planning ${id} as in progress:`, error);
      throw error;
    }
  }

  /**
   * Marque un planning comme terminé
   */
  async markAsCompleted(id) {
    try {
      const response = await api.patch(`/formations-planifiees/${id}/complete`, {
        completedAt: new Date().toISOString(),
      });
      return response.data;
    } catch (error) {
      console.error(`Error marking planning ${id} as completed:`, error);
      throw error;
    }
  }

  /**
   * Obtient les statistiques des plannings
   */
  async getStatistics() {
    try {
      const response = await api.get('/formations-planifiees/statistics');
      return response.data;
    } catch (error) {
      console.error('Error fetching planning statistics:', error);
      throw error;
    }
  }

  /**
   * Vérifie la disponibilité d'un formateur
   */
  async checkFormatorAvailability(formateurId, startDate, endDate) {
    try {
      const response = await api.post('/formations-planifiees/check-availability', {
        formateurId,
        startDate,
        endDate,
      });
      return response.data;
    } catch (error) {
      console.error('Error checking formateur availability:', error);
      throw error;
    }
  }

  /**
   * Obtient les conflits de planning
   */
  async getConflicts(formateurId, startDate, endDate) {
    try {
      const response = await api.get('/formations-planifiees/conflicts', {
        params: { formateurId, startDate, endDate },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching conflicts:', error);
      throw error;
    }
  }

  /**
   * Export les plannings en CSV
   */
  async exportToCSV(filters = {}) {
    try {
      const response = await api.get('/formations-planifiees/export/csv', {
        params: filters,
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      console.error('Error exporting plannings to CSV:', error);
      throw error;
    }
  }
}

export default new SchedulingService();
