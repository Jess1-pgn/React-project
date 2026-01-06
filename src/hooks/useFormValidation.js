/**
 * Hook personnalisé pour la gestion des formulaires
 * Gère l'état, la validation et la soumission
 */

import { useState, useCallback } from 'react';
import validationService from '../services/validationService';

export const useFormValidation = (initialValues, onSubmit, validationSchema) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Effacer l'erreur quand on modifie le champ
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [errors]);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  }, []);

  const validateForm = useCallback(() => {
    if (!validationSchema) {
      return true;
    }

    const newErrors = {};
    
    if (typeof validationSchema === 'function') {
      const result = validationSchema(formData);
      if (!result.valid) {
        result.errors?.forEach(error => {
          newErrors[error.field || 'general'] = error.message || error;
        });
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, validationSchema]);

  const handleSubmit = useCallback(async (e) => {
    e?.preventDefault?.();

    if (!validateForm()) {
      return false;
    }

    setIsLoading(true);
    setSuccessMessage('');

    try {
      await onSubmit(formData);
      return true;
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [formData, validateForm, onSubmit]);

  const resetForm = useCallback(() => {
    setFormData(initialValues);
    setErrors({});
    setTouched({});
    setSuccessMessage('');
  }, [initialValues]);

  const setFieldError = useCallback((fieldName, message) => {
    setErrors(prev => ({
      ...prev,
      [fieldName]: message
    }));
  }, []);

  const setFieldValue = useCallback((fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  }, []);

  return {
    formData,
    errors,
    touched,
    isLoading,
    successMessage,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldError,
    setFieldValue,
    setSuccessMessage,
    validateForm
  };
};

export default useFormValidation;
