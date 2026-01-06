/**
 * Constantes globales de l'application
 */

// Rôles utilisateur
export const USER_ROLES = {
  ADMIN: 'admin',
  FORMATEUR: 'formateur',
  ASSISTANT: 'assistant',
  PARTICIPANT: 'participant',
};

// Statuts de formation
export const FORMATION_STATUSES = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

// Catégories de formation
export const FORMATION_CATEGORIES = {
  MANAGEMENT: 'Management',
  TECHNICAL: 'Technique',
  SOFT_SKILLS: 'Soft Skills',
  LANGUAGE: 'Langues',
  OTHER: 'Autre',
};

// Villes françaises communes
export const FRENCH_CITIES = [
  'Paris',
  'Lyon',
  'Marseille',
  'Toulouse',
  'Nice',
  'Nantes',
  'Strasbourg',
  'Bordeaux',
  'Lille',
  'Rennes',
  'Reims',
  'Amiens',
  'Versailles',
  'Metz',
  'Nancy',
  'Caen',
  'Dijon',
  'Angers',
  'Tours',
  'Grenoble',
  'Montpellier',
  'Limoges',
  'Rouen',
  'Le Mans',
  'Brest',
];

// Niveaux d'évaluation
export const RATING_LEVELS = [
  { value: 1, label: 'Très mauvais', color: '#ff4444' },
  { value: 2, label: 'Mauvais', color: '#ff9800' },
  { value: 3, label: 'Acceptable', color: '#ffb74d' },
  { value: 4, label: 'Bon', color: '#8bc34a' },
  { value: 5, label: 'Très bon', color: '#4caf50' },
];

// Critères d'évaluation
export const EVALUATION_CRITERIA = [
  { key: 'pedagogical_quality', label: 'Qualité pédagogique' },
  { key: 'pace', label: 'Rythme/Cadence' },
  { key: 'course_support', label: 'Support de cours' },
  { key: 'subject_mastery', label: 'Maîtrise du sujet' },
];

// Statuts de participation
export const PARTICIPANT_STATUSES = {
  REGISTERED: 'registered',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  DROPPED: 'dropped',
};

// Statuts de planification de formation
export const PLANNING_STATUSES = {
  SCHEDULED: 'scheduled',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

// Limites de pagination
export const PAGINATION_LIMITS = {
  SMALL: 5,
  MEDIUM: 10,
  LARGE: 20,
  EXTRA_LARGE: 50,
};

// Messages de confirmation
export const CONFIRMATION_MESSAGES = {
  DELETE_FORMATION: 'Êtes-vous sûr de vouloir supprimer cette formation ?',
  DELETE_FORMATEUR: 'Êtes-vous sûr de vouloir supprimer ce formateur ?',
  DELETE_ENTREPRISE: 'Êtes-vous sûr de vouloir supprimer cette entreprise ?',
  DELETE_PARTICIPANT: 'Êtes-vous sûr de vouloir supprimer ce participant ?',
  CANCEL_PLANNING: 'Êtes-vous sûr de vouloir annuler cette planification ?',
};

// Délais d'expiration (en millisecondes)
export const EXPIRATION_TIMES = {
  SESSION: 30 * 60 * 1000, // 30 minutes
  TOKEN: 24 * 60 * 60 * 1000, // 24 heures
  CACHE: 5 * 60 * 1000, // 5 minutes
};

// Limites de fichiers
export const FILE_LIMITS = {
  MAX_SIZE: 10 * 1024 * 1024, // 10 MB
  ALLOWED_FORMATS: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'jpg', 'png', 'gif'],
};

// Configuration API
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  TIMEOUT: 30000, // 30 secondes
  RETRY_ATTEMPTS: 3,
};

// Couleurs thème
export const COLORS = {
  PRIMARY: '#1976d2',
  SECONDARY: '#dc004e',
  SUCCESS: '#4caf50',
  ERROR: '#f44336',
  WARNING: '#ff9800',
  INFO: '#2196f3',
  LIGHT: '#f5f5f5',
  DARK: '#333333',
  BORDER: '#e0e0e0',
};

// Longueurs minimales et maximales
export const STRING_LENGTHS = {
  EMAIL_MAX: 255,
  PASSWORD_MIN: 8,
  PASSWORD_MAX: 128,
  NAME_MIN: 2,
  NAME_MAX: 100,
  PHONE_MIN: 10,
  PHONE_MAX: 20,
  DESCRIPTION_MAX: 1000,
  TEXTAREA_MAX: 5000,
};

// Expressions régulières
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^(\+?33|0)[1-9](?:[0-9]{8})$/,
  URL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};

// Jour de la semaine
export const DAYS_OF_WEEK = [
  { value: 0, label: 'Dimanche' },
  { value: 1, label: 'Lundi' },
  { value: 2, label: 'Mardi' },
  { value: 3, label: 'Mercredi' },
  { value: 4, label: 'Jeudi' },
  { value: 5, label: 'Vendredi' },
  { value: 6, label: 'Samedi' },
];

// Mois
export const MONTHS = [
  { value: 0, label: 'Janvier' },
  { value: 1, label: 'Février' },
  { value: 2, label: 'Mars' },
  { value: 3, label: 'Avril' },
  { value: 4, label: 'Mai' },
  { value: 5, label: 'Juin' },
  { value: 6, label: 'Juillet' },
  { value: 7, label: 'Août' },
  { value: 8, label: 'Septembre' },
  { value: 9, label: 'Octobre' },
  { value: 10, label: 'Novembre' },
  { value: 11, label: 'Décembre' },
];
