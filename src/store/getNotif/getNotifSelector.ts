import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../store';

const selectNotif = (state: AppState) => state.getNotif;

export const notifData = createSelector(selectNotif, (notif) => notif.data);

export const notifStatus = createSelector(selectNotif, (notif) => notif.status);

export const notifError = createSelector(selectNotif, (notif) => notif.error);
