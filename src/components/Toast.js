import React, { useEffect, useState } from 'react';
import './Toast.css';

const Toast = ({ 
  message, 
  type = 'info', 
  duration = 3000, 
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for animation to complete
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const getToastClass = () => {
    return `toast ${type} ${isVisible ? 'show' : 'hide'}`;
  };

  return (
    <div className={getToastClass()}>
      <div className="toast-content">
        <div className="toast-icon">
          {type === 'success' && '✅'}
          {type === 'error' && '❌'}
          {type === 'warning' && '⚠️'}
          {type === 'info' && 'ℹ️'}
        </div>
        <span className="toast-message">{message}</span>
        <button className="toast-close" onClick={handleClose}>×</button>
      </div>
    </div>
  );
};

export default Toast;