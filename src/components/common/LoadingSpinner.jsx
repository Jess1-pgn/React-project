import React from 'react';
import './LoadingSpinner.css';

/**
 * Composant LoadingSpinner
 * Affiche un spinner de chargement avec message optionnel
 */
const LoadingSpinner = ({
  size = 'md',
  message = 'Chargement...',
  fullScreen = false,
  color = 'primary',
}) => {
  return (
    <div className={`loading-spinner ${fullScreen ? 'fullscreen' : ''}`}>
      <div className={`spinner spinner-${size} spinner-${color}`}>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      {message && <p className="spinner-message">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
