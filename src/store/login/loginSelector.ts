import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../store';

const selectLogin = (state: AppState) => state.login;

export const loginData = createSelector(
  selectLogin,
  (registration) => registration.data
);

export const loginStatus = createSelector(
  selectLogin,
  (registration) => registration.status
);

export const loginError = createSelector(
  selectLogin,
  (registration) => registration.error
);
