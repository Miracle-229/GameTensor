import React, { useState, useEffect } from 'react';
import style from '@/styles/Alerts.module.scss';

interface AlertProps {
  type: 'success' | 'error' | 'warning';
  message: string;
  visible: boolean;
  onClose: () => void;
}

export default function Alert({ type, message, visible, onClose }: AlertProps) {
  const [show, setShow] = useState(visible);

  useEffect(() => {
    setShow(visible);
  }, [visible]);

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  return (
    <div
      className={`${style.alert} ${style[type]} ${show ? style.show : ''}`}
      onAnimationEnd={handleClose}
    >
      <button type="button" className={style.closebtn} onClick={handleClose}>
        &times;
      </button>
      <strong>{type.charAt(0).toUpperCase() + type.slice(1)}:</strong> {message}
    </div>
  );
}
