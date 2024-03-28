import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../store';

const selectRegistration = (state: AppState) => state.registration;

export const registrationData = createSelector(
  selectRegistration,
  (registration) => registration.data
);

export const registrationStatus = createSelector(
  selectRegistration,
  (registration) => registration.status
);

export const registrationError = createSelector(
  selectRegistration,
  (registration) => registration.error
);
