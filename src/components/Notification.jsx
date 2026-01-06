import React, { useEffect } from 'react';
import './Notification.css';

const Notification = ({
  type = 'info',
  message = '',
  onClose = () => {},
  autoClose = true,
  duration = 4000,
  className = ''
}) => {
  useEffect(() => {
    if (!autoClose || !message) return;

    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [message, autoClose, duration, onClose]);

  if (!message) return null;

  return (
    <div className={`notification notification-${type} ${className}`}>
      <div className="notification-content">
        <span className="notification-icon">
          {type === 'success' && '✓'}
          {type === 'error' && '✕'}
          {type === 'warning' && '⚠'}
          {type === 'info' && 'ℹ'}
        </span>
        <span className="notification-message">{message}</span>
      </div>
      <button
        className="notification-close"
        onClick={onClose}
        aria-label="Fermer la notification"
      >
        ×
      </button>
    </div>
  );
};

export default Notification;
