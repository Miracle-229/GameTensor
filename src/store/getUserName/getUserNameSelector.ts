import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../store';

const selectUserName = (state: AppState) => state.getUserName;

export const userNameData = createSelector(
  selectUserName,
  (userName) => userName.data
);

export const userNameStatus = createSelector(
  selectUserName,
  (userName) => userName.status
);

export const userNameError = createSelector(
  selectUserName,
  (userName) => userName.error
);
