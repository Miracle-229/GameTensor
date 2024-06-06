// AlertHooks.js
import { useState } from 'react';

export const useAlert = () => {
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const [visibleError, setVisibleError] = useState(false);

  const hideAlertSuccess = () => {
    setVisibleSuccess(false);
    setTimeout(() => setVisibleSuccess(false), 3000);
  };

  const showAlertSuccess = () => {
    setVisibleSuccess(true);
    setTimeout(hideAlertSuccess, 3000);
  };
  const hideAlertError = () => {
    setTimeout(() => setVisibleError(false), 3000);
  };

  const showAlertError = () => {
    setVisibleError(true);
    setTimeout(hideAlertError, 3000);
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
