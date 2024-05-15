// AlertHooks.js
import { useState } from 'react';

export const useAlert = () => {
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const [visibleError, setVisibleError] = useState(false);

  const showAlertSuccess = () => {
    setVisibleSuccess(true);
  };

  const hideAlertSuccess = () => {
    setVisibleSuccess(false);
  };

  const showAlertError = () => {
    setVisibleError(true);
  };

  const hideAlertError = () => {
    setVisibleError(false);
  };

  return {
    visibleSuccess,
    visibleError,
    showAlertSuccess,
    hideAlertSuccess,
    showAlertError,
    hideAlertError,
  };
};
