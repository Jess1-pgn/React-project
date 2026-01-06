import { useState, useEffect, useCallback } from 'react';
import api from '../config/api';
import { errorService } from '../services/errorService';

/**
 * Custom hook pour effectuer des requêtes API avec gestion d'état
 * Gère le chargement, les erreurs et la mise en cache basique
 * @param {string} url - L'URL à fetcher
 * @param {Object} options - Options de configuration (method, body, dependencies, etc)
 * @returns {Object} { data, loading, error, refetch }
 */
export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    method = 'GET',
    body = null,
    skip = false,
    dependencies = [],
  } = options;

  const fetchData = useCallback(async () => {
    if (skip || !url) return;

    setLoading(true);
    setError(null);

    try {
      const config = {
        method,
        url,
      };

      if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        config.data = body;
      }

      const response = await api(config);
      setData(response.data);
    } catch (err) {
      const errorMessage = errorService.getErrorMessage(err);
      setError({
        message: errorMessage,
        status: err.response?.status,
        details: err.response?.data,
      });
      errorService.logError(`useFetch(${url})`, err);
    } finally {
      setLoading(false);
    }
  }, [url, method, body, skip]);

  useEffect(() => {
    fetchData();
  }, [url, method, skip, ...dependencies]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};
