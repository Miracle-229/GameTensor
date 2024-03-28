import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../store';

const selectCurrentUser = (state: AppState) => state.currentUser;

export const currentUserData = createSelector(
  selectCurrentUser,
  (currentUser) => currentUser.data
);

export const currentUserStatus = createSelector(
  selectCurrentUser,
  (currentUser) => currentUser.status
);

export const currentUserError = createSelector(
  selectCurrentUser,
  (currentUser) => currentUser.error
);
