/**
 * Validateurs réutilisables pour tous les formulaires
 * Retournent {valid: boolean, error?: string}
 */

// Expressions régulières
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^(\+?33|0)[1-9](?:[0-9]{8})$/;
const URL_REGEX = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

/**
 * Valide un format d'email
 */
export const validateEmail = (email) => {
  if (!email || !email.trim()) {
    return { valid: false, error: 'L\'email est requis' };
  }
  if (!EMAIL_REGEX.test(email)) {
    return { valid: false, error: 'Format d\'email invalide' };
  }
  return { valid: true };
};

/**
 * Valide un format de numéro de téléphone français
 */
export const validatePhone = (phone) => {
  if (!phone || !phone.trim()) {
    return { valid: false, error: 'Le téléphone est requis' };
  }
  if (!PHONE_REGEX.test(phone.replace(/\s/g, ''))) {
    return { valid: false, error: 'Numéro de téléphone invalide' };
  }
  return { valid: true };
};

/**
 * Valide une URL
 */
export const validateUrl = (url) => {
  if (!url || !url.trim()) {
    return { valid: false, error: 'L\'URL est requise' };
  }
  if (!URL_REGEX.test(url)) {
    return { valid: false, error: 'Format d\'URL invalide' };
  }
  return { valid: true };
};

/**
 * Valide un mot de passe (min 8 chars, uppercase, lowercase, number, special char)
 */
export const validatePassword = (password) => {
  if (!password || !password.trim()) {
    return { valid: false, error: 'Le mot de passe est requis' };
  }
  if (password.length < 8) {
    return { valid: false, error: 'Le mot de passe doit contenir au minimum 8 caractères' };
  }
  if (!PASSWORD_REGEX.test(password)) {
    return {
      valid: false,
      error: 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial (@$!%*?&)',
    };
  }
  return { valid: true };
};

/**
 * Valide une date de naissance (age >= 16 et <= 100)
 */
export const validateBirthDate = (birthDate) => {
  if (!birthDate) {
    return { valid: false, error: 'La date de naissance est requise' };
  }

  const date = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - date.getFullYear();
  const monthDiff = today.getMonth() - date.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
    age--;
  }

  if (age < 16) {
    return { valid: false, error: 'L\'âge minimum est 16 ans' };
  }
  if (age > 100) {
    return { valid: false, error: 'Veuillez vérifier votre date de naissance' };
  }

  return { valid: true };
};

/**
 * Valide une date (format YYYY-MM-DD)
 */
export const validateDate = (date) => {
  if (!date) {
    return { valid: false, error: 'La date est requise' };
  }
  
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    return { valid: false, error: 'Format de date invalide' };
  }

  return { valid: true };
};

/**
 * Valide une plage de dates (startDate < endDate)
 */
export const validateDateRange = (startDate, endDate) => {
  const startValidation = validateDate(startDate);
  if (!startValidation.valid) {
    return { valid: false, error: 'Date de début invalide' };
  }

  const endValidation = validateDate(endDate);
  if (!endValidation.valid) {
    return { valid: false, error: 'Date de fin invalide' };
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (start >= end) {
    return { valid: false, error: 'La date de fin doit être après la date de début' };
  }

  return { valid: true };
};

/**
 * Valide un nombre positif
 */
export const validatePositiveNumber = (value, fieldName = 'La valeur') => {
  if (!value && value !== 0) {
    return { valid: false, error: `${fieldName} est requise` };
  }

  const num = parseFloat(value);
  if (isNaN(num) || num <= 0) {
    return { valid: false, error: `${fieldName} doit être un nombre positif` };
  }

  return { valid: true };
};

/**
 * Valide qu'une chaîne n'est pas vide
 */
export const validateRequired = (value, fieldName = 'Ce champ') => {
  if (!value || !String(value).trim()) {
    return { valid: false, error: `${fieldName} est requis` };
  }
  return { valid: true };
};

/**
 * Valide la longueur d'une chaîne
 */
export const validateLength = (value, min, max, fieldName = 'Ce champ') => {
  const strValue = String(value);

  if (strValue.length < min) {
    return {
      valid: false,
      error: `${fieldName} doit contenir au minimum ${min} caractères`,
    };
  }

  if (strValue.length > max) {
    return {
      valid: false,
      error: `${fieldName} ne doit pas dépasser ${max} caractères`,
    };
  }

  return { valid: true };
};
