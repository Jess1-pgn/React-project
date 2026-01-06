import React, { useState, useEffect } from 'react';
import './Modal.css';

/**
 * Composant Modal réutilisable
 * Affiche une boîte de dialogue modale
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeButton = true,
  onConfirm,
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  isDangerous = false,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className={`modal modal-${size} animate-pop-in`}>
        {title && (
          <div className="modal-header">
            <h2 className="modal-title">{title}</h2>
            {closeButton && (
              <button
                type="button"
                className="modal-close"
                onClick={onClose}
                aria-label="Fermer"
              >
                ×
              </button>
            )}
          </div>
        )}

        {children && <div className="modal-body">{children}</div>}

        {footer || (onConfirm && onClose) ? (
          <div className="modal-footer">
            {footer ? (
              footer
            ) : (
              <>
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  {cancelText}
                </button>
                <button
                  type="button"
                  className={`btn ${isDangerous ? 'btn-error' : 'btn-primary'}`}
                  onClick={() => {
                    if (onConfirm) onConfirm();
                    onClose();
                  }}
                >
                  {confirmText}
                </button>
              </>
            )}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Modal;
