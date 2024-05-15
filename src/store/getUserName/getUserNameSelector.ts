import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../store';

const selectUserName = (state: AppState) => state.getUserName;

export const currentUserNameData = createSelector(
  selectUserName,
  (userName) => userName.data
);

export const currentUserNameStatus = createSelector(
  selectUserName,
  (userName) => userName.status
);

export const currentUserNameError = createSelector(
  selectUserName,
  (userName) => userName.error
);
