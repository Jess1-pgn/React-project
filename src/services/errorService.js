/**
 * Service de gestion centralisée des erreurs API
 * Fournit des messages d'erreur cohérents et traite les réponses d'erreur
 */

const errorMessages = {
  NETWORK_ERROR: 'Erreur de connexion. Veuillez vérifier votre connexion Internet.',
  SERVER_ERROR: 'Erreur serveur. Veuillez réessayer plus tard.',
  UNAUTHORIZED: 'Vous n\'êtes pas autorisé à accéder à cette ressource.',
  FORBIDDEN: 'Accès refusé.',
  NOT_FOUND: 'La ressource demandée n\'a pas été trouvée.',
  CONFLICT: 'Conflit: cette ressource existe déjà.',
  VALIDATION_ERROR: 'Veuillez vérifier vos données.',
  TIMEOUT: 'La requête a expiré. Veuillez réessayer.',
  UNKNOWN_ERROR: 'Une erreur inattendue s\'est produite.'
};

/**
 * Parse l'erreur API et retourne un message utilisateur cohérent
 * @param {Error} error - L'erreur capturée
 * @returns {string} Message d'erreur formaté
 */
export const getErrorMessage = (error) => {
  // Erreur réseau
  if (!error.response) {
    if (error.message === 'Network Error') {
      return errorMessages.NETWORK_ERROR;
    }
    return errorMessages.NETWORK_ERROR;
  }

  const { status, data } = error.response;

  // Message personnalisé du serveur
  if (data?.message) {
    return data.message;
  }

  // Traiter par code de statut HTTP
  switch (status) {
    case 400:
      return data?.errors?.[0] || errorMessages.VALIDATION_ERROR;
    case 401:
      return errorMessages.UNAUTHORIZED;
    case 403:
      return errorMessages.FORBIDDEN;
    case 404:
      return errorMessages.NOT_FOUND;
    case 409:
      return errorMessages.CONFLICT;
    case 500:
    case 502:
    case 503:
    case 504:
      return errorMessages.SERVER_ERROR;
    default:
      return errorMessages.UNKNOWN_ERROR;
  }
};

/**
 * Enregistre une erreur dans la console pour le développement
 * @param {string} context - Contexte de l'erreur (ex: "LoginService")
 * @param {Error} error - L'erreur capturée
 */
export const logError = (context, error) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(`[${context}] Error:`, {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      stack: error.stack
    });
  }
};

/**
 * Traite les erreurs de validation du formulaire
 * @param {object} errors - Objet d'erreurs {field: message}
 * @returns {array} Array d'objets {field, message}
 */
export const formatValidationErrors = (errors) => {
  if (Array.isArray(errors)) {
    return errors;
  }
  
  if (typeof errors === 'object') {
    return Object.entries(errors).map(([field, message]) => ({
      field,
      message
    }));
  }
  
  return [];
};

/**
 * Vérifie si l'erreur est une erreur d'authentification
 * @param {Error} error - L'erreur capturée
 * @returns {boolean}
 */
export const isAuthError = (error) => {
  return error.response?.status === 401 || error.response?.status === 403;
};

/**
 * Vérifie si l'erreur est une erreur de validation
 * @param {Error} error - L'erreur capturée
 * @returns {boolean}
 */
export const isValidationError = (error) => {
  return error.response?.status === 400;
};

/**
 * Obtient le premier message d'erreur d'une réponse d'erreur
 * @param {Error} error - L'erreur capturée
 * @returns {string}
 */
export const getFirstErrorMessage = (error) => {
  if (error.response?.data?.errors?.length > 0) {
    return error.response.data.errors[0];
  }
  return getErrorMessage(error);
};

export default {
  getErrorMessage,
  logError,
  formatValidationErrors,
  isAuthError,
  isValidationError,
  getFirstErrorMessage,
  errorMessages
};
