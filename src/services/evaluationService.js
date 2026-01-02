import api from '../config/api';

const evaluationService = {
  // Soumettre une évaluation
  submitEvaluation: async (formationId, evaluation) => {
    const response = await api.post('/evaluations', {
      formationId,
      pedagogicalQuality: evaluation.pedagogicalQuality,
      pace: evaluation.pace,
      courseSupport: evaluation.courseSupport,
      subjectMastery: evaluation.subjectMastery,
      comment: evaluation.comment,
    });
    return response.data;
  },

  // Récupérer les évaluations d'une formation
  getFormationEvaluations: async (formationId) => {
    const response = await api.get(`/evaluations/formation/${formationId}`);
    return response.data;
  },

  // Récupérer la moyenne des évaluations
  getEvaluationStats: async (formationId) => {
    const response = await api.get(`/evaluations/formation/${formationId}/stats`);
    return response.data;
  },

  // Vérifier si l'utilisateur a déjà évalué
  hasUserEvaluated: async (formationId) => {
    const response = await api.get(`/evaluations/formation/${formationId}/user-evaluation`);
    return response.data;
  },
};

export default evaluationService;
