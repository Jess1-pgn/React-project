/**
 * Fonctions de formatage pour l'affichage des données
 */

/**
 * Formate une date en format lisible (DD/MM/YYYY)
 */
export const formatDate = (date, format = 'DD/MM/YYYY') => {
  if (!date) return '';

  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return '';

  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();

  if (format === 'DD/MM/YYYY') {
    return `${day}/${month}/${year}`;
  } else if (format === 'YYYY-MM-DD') {
    return `${year}-${month}-${day}`;
  } else if (format === 'DD MMM YYYY') {
    const months = [
      'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun',
      'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'
    ];
    return `${day} ${months[dateObj.getMonth()]} ${year}`;
  }

  return `${day}/${month}/${year}`;
};

/**
 * Formate une devise en EUR
 */
export const formatCurrency = (amount, currency = 'EUR') => {
  if (amount === null || amount === undefined) return '0,00 €';

  const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(amount);
};

/**
 * Formate un numéro de téléphone (33 1 23 45 67 89)
 */
export const formatPhone = (phone) => {
  if (!phone) return '';

  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8)}`;
  }
  if (cleaned.length === 12) {
    return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8, 10)} ${cleaned.slice(10)}`;
  }

  return phone;
};

/**
 * Tronque un texte et ajoute "..."
 */
export const truncateText = (text, maxLength = 100, suffix = '...') => {
  if (!text) return '';
  if (text.length <= maxLength) return text;

  return text.substring(0, maxLength - suffix.length) + suffix;
};

/**
 * Capitalise le premier caractère
 */
export const capitalize = (text) => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Formate un nombre avec séparateurs de milliers
 */
export const formatNumber = (number, decimals = 0) => {
  if (number === null || number === undefined) return '0';

  return new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(number);
};

/**
 * Formate une durée en heures et minutes
 */
export const formatDuration = (minutes) => {
  if (!minutes || minutes <= 0) return '0 min';

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) return `${mins} min`;
  if (mins === 0) return `${hours}h`;

  return `${hours}h ${mins}min`;
};

/**
 * Formate l'age à partir d'une date de naissance
 */
export const calculateAge = (birthDate) => {
  const today = new Date();
  const birth = new Date(birthDate);

  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
};

/**
 * Formate le type de rôle en français
 */
export const formatRoleName = (role) => {
  const roles = {
    admin: 'Administrateur',
    formateur: 'Formateur',
    assistant: 'Assistant',
    participant: 'Participant',
    entreprise: 'Entreprise',
  };

  return roles[role] || role;
};

/**
 * Formate un UUID court (premiers caractères)
 */
export const formatUUID = (uuid, length = 8) => {
  if (!uuid) return '';
  return uuid.substring(0, length);
};

/**
 * Formate un titre (slugify)
 */
export const slugify = (text) => {
  if (!text) return '';

  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};
