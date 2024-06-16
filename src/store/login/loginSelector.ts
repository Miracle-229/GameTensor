import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../store';

const selectLogin = (state: AppState) => state.login;

export const loginData = createSelector(selectLogin, (login) => login.data);

export const loginStatus = createSelector(selectLogin, (login) => login.status);

export const loginError = createSelector(selectLogin, (login) => login.error);
