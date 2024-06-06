import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../store';

const selectChangePasswordTag = (state: AppState) => state.changePassword;

export const changePasswordData = createSelector(
  selectChangePasswordTag,
  (changePassword) => changePassword.data
);

export const changePasswordStatus = createSelector(
  selectChangePasswordTag,
  (changePassword) => changePassword.status
);

export const changePasswordError = createSelector(
  selectChangePasswordTag,
  (changePassword) => changePassword.error
);
