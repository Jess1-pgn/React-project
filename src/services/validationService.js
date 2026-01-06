/**
 * Service de validation centralisée
 * Fournit des fonctions réutilisables pour valider les formulaires
 */

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  // Accepte formats internationaux et locaux
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};

export const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

export const validateBirthDate = (birthDateString) => {
  const birthDate = new Date(birthDateString);
  const today = new Date();
  
  // Vérifier que la date est valide
  if (isNaN(birthDate.getTime())) {
    return { valid: false, message: 'Date invalide' };
  }
  
  // Vérifier que la personne est majeure (>= 18 ans) ou au moins 16 ans selon vos règles
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  if (age < 16) {
    return { valid: false, message: 'Vous devez avoir au moins 16 ans' };
  }
  
  return { valid: true, age };
};

export const validateFormation = (formData) => {
  const errors = [];
  
  if (!formData.title?.trim()) {
    errors.push('Le titre est requis');
  }
  
  if (!formData.description?.trim()) {
    errors.push('La description est requise');
  }
  
  if (!formData.hours || formData.hours <= 0) {
    errors.push('Le nombre d\'heures doit être supérieur à 0');
  }
  
  if (formData.cost === undefined || formData.cost < 0) {
    errors.push('Le coût doit être positif');
  }
  
  if (!formData.objectives || formData.objectives.length === 0) {
    errors.push('Au moins un objectif est requis');
  }
  
  if (!formData.program || formData.program.length === 0) {
    errors.push('Au moins un élément du programme est requis');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

export const validateFormator = (formData) => {
  const errors = [];
  
  if (!formData.firstName?.trim()) {
    errors.push('Le prénom est requis');
  }
  
  if (!formData.lastName?.trim()) {
    errors.push('Le nom est requis');
  }
  
  if (!validateEmail(formData.email)) {
    errors.push('Email invalide');
  }
  
  if (!formData.specializations || formData.specializations.length === 0) {
    errors.push('Au moins une compétence est requise');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

export const validateParticipant = (formData) => {
  const errors = [];
  
  if (!formData.firstName?.trim()) {
    errors.push('Le prénom est requis');
  }
  
  if (!formData.lastName?.trim()) {
    errors.push('Le nom est requis');
  }
  
  if (!formData.birthDate) {
    errors.push('La date de naissance est requise');
  } else {
    const birthValidation = validateBirthDate(formData.birthDate);
    if (!birthValidation.valid) {
      errors.push(birthValidation.message);
    }
  }
  
  if (!formData.city?.trim()) {
    errors.push('La ville est requise');
  }
  
  if (!validateEmail(formData.email)) {
    errors.push('Email invalide');
  }
  
  if (!validatePhone(formData.phone)) {
    errors.push('Numéro de téléphone invalide');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

export const validateEntreprise = (formData) => {
  const errors = [];
  
  if (!formData.name?.trim()) {
    errors.push('Le nom est requis');
  }
  
  if (!formData.address?.trim()) {
    errors.push('L\'adresse est requise');
  }
  
  if (!formData.city?.trim()) {
    errors.push('La ville est requise');
  }
  
  if (!validatePhone(formData.phone)) {
    errors.push('Numéro de téléphone invalide');
  }
  
  if (!validateEmail(formData.email)) {
    errors.push('Email invalide');
  }
  
  if (formData.website && !validateUrl(formData.website)) {
    errors.push('URL invalide');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

export default {
  validateEmail,
  validatePhone,
  validatePassword,
  validateUrl,
  validateBirthDate,
  validateFormation,
  validateFormator,
  validateParticipant,
  validateEntreprise
};
