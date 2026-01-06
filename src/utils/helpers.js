/**
 * Fonctions utilitaires générales
 */

/**
 * Génère un UUID aléatoire simple
 */
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Vérifie si un objet est vide
 */
export const isEmpty = (obj) => {
  if (obj === null || obj === undefined) return true;
  if (typeof obj === 'string') return obj.trim() === '';
  if (Array.isArray(obj)) return obj.length === 0;
  if (typeof obj === 'object') return Object.keys(obj).length === 0;
  return false;
};

/**
 * Compare deux tableaux d'objets
 */
export const arraysEqual = (arr1, arr2, key = 'id') => {
  if (arr1.length !== arr2.length) return false;

  return arr1.every((item) =>
    arr2.some((otherItem) => otherItem[key] === item[key])
  );
};

/**
 * Clone profond d'un objet
 */
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map((item) => deepClone(item));

  const cloned = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
};

/**
 * Fusionne deux objets (shallow merge)
 */
export const mergeObjects = (obj1, obj2) => {
  return { ...obj1, ...obj2 };
};

/**
 * Supprime les doublons d'un tableau
 */
export const removeDuplicates = (arr, key = null) => {
  if (key) {
    const seen = new Set();
    return arr.filter((item) => {
      const value = item[key];
      if (seen.has(value)) return false;
      seen.add(value);
      return true;
    });
  }

  return [...new Set(arr)];
};

/**
 * Trie un tableau d'objets
 */
export const sortBy = (arr, key, order = 'asc') => {
  const sorted = [...arr].sort((a, b) => {
    if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
    return 0;
  });

  return sorted;
};

/**
 * Groupe un tableau par une propriété
 */
export const groupBy = (arr, key) => {
  return arr.reduce((result, item) => {
    const group = item[key];
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(item);
    return result;
  }, {});
};

/**
 * Filtre un tableau par plusieurs critères
 */
export const filterByMultipleCriteria = (arr, criteria) => {
  return arr.filter((item) => {
    return Object.keys(criteria).every((key) => {
      const value = criteria[key];
      if (Array.isArray(value)) {
        return value.includes(item[key]);
      }
      return item[key] === value;
    });
  });
};

/**
 * Cherche un élément dans un tableau imbriqué
 */
export const findInNested = (arr, key, value) => {
  for (const item of arr) {
    if (item[key] === value) return item;
    if (Array.isArray(item.children)) {
      const found = findInNested(item.children, key, value);
      if (found) return found;
    }
  }
  return null;
};

/**
 * Obtient les différences entre deux objets
 */
export const getDifferences = (obj1, obj2) => {
  const differences = {};

  for (const key in obj2) {
    if (obj1[key] !== obj2[key]) {
      differences[key] = {
        old: obj1[key],
        new: obj2[key],
      };
    }
  }

  return differences;
};

/**
 * Retarde une exécution (pour debounce/throttle)
 */
export const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Débounce une fonction
 */
export const debounce = (func, wait) => {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle une fonction
 */
export const throttle = (func, limit) => {
  let inThrottle;

  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Obtient la valeur imbriquée d'un objet avec chemin dot-notation
 */
export const getNestedValue = (obj, path, defaultValue = null) => {
  const keys = path.split('.');
  let value = obj;

  for (const key of keys) {
    value = value?.[key];
    if (value === undefined) return defaultValue;
  }

  return value;
};

/**
 * Définit une valeur imbriquée avec chemin dot-notation
 */
export const setNestedValue = (obj, path, value) => {
  const keys = path.split('.');
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current)) {
      current[key] = {};
    }
    current = current[key];
  }

  current[keys[keys.length - 1]] = value;
  return obj;
};

/**
 * Vérifie si un élément est dans un tableau
 */
export const includes = (arr, item, key = null) => {
  if (key) {
    return arr.some((el) => el[key] === item[key]);
  }
  return arr.includes(item);
};

/**
 * Pagine un tableau
 */
export const paginate = (arr, page, pageSize) => {
  const startIndex = (page - 1) * pageSize;
  return arr.slice(startIndex, startIndex + pageSize);
};

/**
 * Obtient le nombre total de pages
 */
export const getTotalPages = (totalItems, pageSize) => {
  return Math.ceil(totalItems / pageSize);
};

/**
 * Valide les permissions
 */
export const hasPermission = (userRole, requiredRoles) => {
  if (!Array.isArray(requiredRoles)) {
    requiredRoles = [requiredRoles];
  }
  return requiredRoles.includes(userRole);
};

/**
 * Aplatit un objet imbriqué
 */
export const flattenObject = (obj, prefix = '') => {
  const flattened = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
        Object.assign(flattened, flattenObject(value, newKey));
      } else {
        flattened[newKey] = value;
      }
    }
  }

  return flattened;
};
