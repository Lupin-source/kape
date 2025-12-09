import React from 'react';
import './Modal.css';

const Modal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = "Confirm", 
  cancelText = "Cancel",
  type = "info" // info, warning, danger, success
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  const getModalClass = () => {
    return `modal-overlay ${type}`;
  };

  return (
    <div className={getModalClass()} onClick={handleBackdropClick}>
      <div className="modal-content">
        <div className="modal-header">
          <div className={`modal-icon ${type}`}>
            {type === 'warning' && '⚠️'}
            {type === 'danger' && '🗑️'}
            {type === 'success' && '✅'}
            {type === 'info' && 'ℹ️'}
          </div>
          <h3 className="modal-title">{title}</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <p>{message}</p>
        </div>
        
        <div className="modal-footer">
          <button className="modal-btn cancel" onClick={onClose}>
            {cancelText}
          </button>
          <button 
            className={`modal-btn confirm ${type}`} 
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;