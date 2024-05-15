import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../store';

const selectUsers = (state: AppState) => state.users;

export const bookmarkData = createSelector(selectUsers, (user) => user.data);

export const bookmarkStatus = createSelector(
  selectUsers,
  (user) => user.status
);

export const bookmarkError = createSelector(selectUsers, (user) => user.error);
