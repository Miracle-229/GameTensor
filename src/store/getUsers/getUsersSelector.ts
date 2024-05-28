import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../store';

const selectUsers = (state: AppState) => state.users;

export const usersData = createSelector(selectUsers, (users) => users.data);

export const usersStatus = createSelector(selectUsers, (users) => users.status);

export const usersError = createSelector(selectUsers, (users) => users.error);
