import React, { useState, useEffect } from 'react';
import './Toast.css';

/**
 * Composant Toast pour les notifications
 */
const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`toast toast-${type} animate-toast`}>
      <div className="toast-content">
        <span className="toast-icon">
          {type === 'success' && '✓'}
          {type === 'error' && '✕'}
          {type === 'warning' && '⚠'}
          {type === 'info' && 'ℹ'}
        </span>
        <p className="toast-message">{message}</p>
      </div>
      <button
        type="button"
        className="toast-close"
        onClick={onClose}
        aria-label="Fermer"
      >
        ×
      </button>
    </div>
  );
};

/**
 * Container pour gérer plusieurs toasts
 */
export const ToastContainer = ({ toasts, onRemove }) => {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => onRemove(toast.id)}
        />
      ))}
    </div>
  );
};

export default Toast;
