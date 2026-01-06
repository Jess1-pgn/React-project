import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook pour synchroniser l'état React avec le localStorage
 * Persiste les données automatiquement et gère la synchronisation
 * @param {string} key - Clé de stockage
 * @param {*} initialValue - Valeur initiale si la clé n'existe pas
 * @returns {Array} [value, setValue, removeValue]
 */
export const useLocalStorage = (key, initialValue) => {
  // État pour stocker la valeur en cours
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Obtenir la valeur du localStorage
      const item = window.localStorage.getItem(key);
      
      // Retourner la valeur analysée ou la valeur initiale
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Fonction pour mettre à jour la valeur
  const setValue = useCallback((value) => {
    try {
      // Permettre une fonction pour mettre à jour la valeur (comme setState)
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      
      // Sauvegarder dans l'état
      setStoredValue(valueToStore);
      
      // Sauvegarder dans le localStorage
      if (valueToStore === undefined) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Fonction pour supprimer la valeur
  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Gérer les changements du localStorage depuis d'autres onglets
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(`Error parsing localStorage change:`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue, removeValue];
};
