import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../store';

const selectNotif = (state: AppState) => state.getNotif;

export const notifCountData = createSelector(
  selectNotif,
  (notif) => notif.data
);

export const notifCountStatus = createSelector(
  selectNotif,
  (notif) => notif.status
);

export const notifCountError = createSelector(
  selectNotif,
  (notif) => notif.error
);
