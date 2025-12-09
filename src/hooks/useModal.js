import { useState, useCallback } from 'react';

const useModal = () => {
  const [modal, setModal] = useState({
    isOpen: false,
    type: 'info',
    title: '',
    message: '',
    confirmText: 'OK',
    onConfirm: null
  });

  const showModal = useCallback((config) => {
    setModal({
      isOpen: true,
      type: 'info',
      title: '',
      message: '',
      confirmText: 'OK',
      onConfirm: null,
      ...config
    });
  }, []);

  const hideModal = useCallback(() => {
    setModal(prev => ({ ...prev, isOpen: false }));
  }, []);

  const showConfirm = useCallback((title, message, onConfirm, confirmText = 'Confirm') => {
    showModal({
      type: 'warning',
      title,
      message,
      confirmText,
      onConfirm
    });
  }, [showModal]);

  const showAlert = useCallback((title, message, type = 'info', confirmText = 'OK') => {
    showModal({
      type,
      title,
      message,
      confirmText
    });
  }, [showModal]);

  const showSuccess = useCallback((title, message, confirmText = 'OK') => {
    showAlert(title, message, 'success', confirmText);
  }, [showAlert]);

  const showError = useCallback((title, message, confirmText = 'OK') => {
    showAlert(title, message, 'danger', confirmText);
  }, [showAlert]);

  const showWarning = useCallback((title, message, confirmText = 'OK') => {
    showAlert(title, message, 'warning', confirmText);
  }, [showAlert]);

  const showInfo = useCallback((title, message, confirmText = 'OK') => {
    showAlert(title, message, 'info', confirmText);
  }, [showAlert]);

  return {
    modal,
    showModal,
    hideModal,
    showConfirm,
    showAlert,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
};

export default useModal;